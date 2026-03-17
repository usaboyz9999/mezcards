import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext'

export default function CartScreen({ navigation }) {
  const {
    cart, removeFromCart, checkout, currentUser, t, isRTL, colors: C,
    validateCoupon, pointsData, COUPONS, paymentMethods,
  } = useApp();

  const [ordered, setOrdered]             = useState(false);
  const [orderedInfo, setOrderedInfo]     = useState(null);
  const [couponInput, setCouponInput]     = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError]     = useState('');
  const [showCoupons, setShowCoupons]     = useState(false);
  // الطريقة الأساسية: 'points' | 'wallet' | 'saved-{id}' | 'card'
  const [primaryMode, setPrimaryMode]     = useState('wallet');
  // الطريقة الإضافية لإكمال المتبقي (تظهر فقط إذا النقاط لا تكفي)
  const [secondaryMode, setSecondaryMode] = useState('wallet');

  const ptsBalance = pointsData?.balance || 0;
  const subtotal   = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const savedCards = (paymentMethods || []).filter(m => m.type === 'card');

  const couponDiscount = appliedCoupon
    ? appliedCoupon.type === 'percent' ? (subtotal * appliedCoupon.value) / 100 : appliedCoupon.value
    : 0;

  const baseAmount     = subtotal - couponDiscount;
  const maxPtsDollar   = ptsBalance / 1000;
  const usingPoints    = primaryMode === 'points';
  // النقاط تغطي ما تستطيع — بدون حد
  const pointsCoverAmt = Math.min(baseAmount, maxPtsDollar);
  const pointsDiscount = usingPoints ? pointsCoverAmt : 0;
  const pointsUsed     = usingPoints ? Math.round(pointsCoverAmt * 1000) : 0;
  const afterDiscount  = baseAmount - pointsDiscount;
  const vat            = afterDiscount * 0.1;
  const total          = Math.max(0, afterDiscount + vat);
  const pointsCoverAll = usingPoints && total <= 0.001;
  // يحتاج طريقة إضافية إذا النقاط مختارة ولا تكفي
  const needSecondary  = usingPoints && !pointsCoverAll;

  const handleApplyCoupon = () => {
    setCouponError('');
    if (!couponInput.trim()) return;
    const result = validateCoupon(couponInput, subtotal);
    if (result.valid) { setAppliedCoupon(result.coupon); Alert.alert(t('couponApplied'), result.description); }
    else setCouponError(result.error);
  };

  const handleCheckout = () => {
    if (!currentUser) {
      Alert.alert(t('signInRequired'), t('signInToPurchase'), [
        { text: t('cancel'), style: 'cancel' },
        { text: t('signIn'), onPress: () => navigation.getParent()?.navigate('Account') },
      ]);
      return;
    }
    // إذا النقاط لا تكفي ولم يختر طريقة إضافية صالحة
    if (needSecondary && currentUser.wallet < total) {
      Alert.alert(
        t('insufficientBalance'),
        `${t('walletBalance')}: $${currentUser.wallet.toFixed(2)}`,
        [
          { text: t('cancel'), style: 'cancel' },
          { text: t('addFunds'), onPress: () => navigation.getParent()?.navigate('Wallet') },
        ]
      );
      return;
    }
    if (!usingPoints && !pointsCoverAll && currentUser.wallet < total) {
      Alert.alert(t('insufficientBalance'), `${t('walletBalance')}: $${currentUser.wallet.toFixed(2)}`, [
        { text: t('cancel'), style: 'cancel' },
        { text: t('addFunds'), onPress: () => navigation.getParent()?.navigate('Wallet') },
      ]);
      return;
    }
    const effectiveMode = needSecondary ? secondaryMode : primaryMode;
    const result = checkout({
      couponCode: appliedCoupon?.code,
      usePointsAmount: usingPoints ? ptsBalance : 0,
      paymentMode: effectiveMode,
    });
    if (result.success) { setOrderedInfo(result); setOrdered(true); }
  };

  // ─── شاشة النجاح ────────────────────────────────────────────────────────
  if (ordered) return (
    <View style={[st.centerWrap, { backgroundColor: C.bg }]}>
      <LinearGradient colors={['#4c1d95','#7c3aed']} style={st.successCircle}>
        <Ionicons name="checkmark" size={48} color="#fff" />
      </LinearGradient>
      <Text style={[st.successTitle, { color: C.green }]}>{t('orderPlaced')}</Text>
      <Text style={[st.successSub, { color: C.textMuted }]}>{t('orderConfirmed')}</Text>
      {orderedInfo?.earned > 0 && (
        <View style={[st.ptsBanner, { backgroundColor: `${C.accent}22`, borderColor: `${C.accent}44` }]}>
          <Ionicons name="star" size={16} color={C.accent} />
          <Text style={[st.ptsBannerTxt, { color: C.accent }]}>
            {t('youEarned')} {orderedInfo.earned} {t('pointsFromOrder')}!
          </Text>
        </View>
      )}
      <Text style={[st.walletAfter, { color: C.textMuted }]}>
        {t('walletBalance')}: <Text style={{ color: C.green }}>${currentUser?.wallet.toFixed(2)}</Text>
      </Text>
      <TouchableOpacity onPress={() => { setOrdered(false); navigation.getParent()?.navigate('Home'); }} activeOpacity={0.85}>
        <LinearGradient colors={[C.primary,C.primary2]} style={st.actionBtn}>
          <Text style={st.actionBtnTxt}>{t('backToHome')}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  // ─── سلة فارغة ──────────────────────────────────────────────────────────
  if (cart.length === 0) return (
    <View style={[st.centerWrap, { backgroundColor: C.bg }]}>
      <Ionicons name="cart-outline" size={70} color={C.textMuted} />
      <Text style={[st.emptyTitle, { color: C.text }]}>{t('cartEmpty')}</Text>
      <Text style={[st.emptySub, { color: C.textMuted }]}>{t('cartEmptySub')}</Text>
      <TouchableOpacity onPress={() => navigation.getParent()?.navigate('Products')} activeOpacity={0.85}>
        <LinearGradient colors={[C.primary,C.primary2]} style={st.actionBtn}>
          <Text style={st.actionBtnTxt}>{t('browseProducts')}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  // مكوّن زر طريقة الدفع
  const PayOpt = ({ modeKey, icon, title, sub, isDefaultBadge, isActive, onSelect }) => (
    <TouchableOpacity
      style={[st.payOpt, { borderColor: isActive ? C.primary : C.border, backgroundColor: isActive ? `${C.primary}18` : C.bg3 }]}
      onPress={onSelect}>
      {typeof icon === 'string' && icon.length <= 2
        ? <Text style={{ fontSize: 20 }}>{icon}</Text>
        : <Ionicons name={icon} size={20} color={isActive ? C.primary2 : C.textMuted} />}
      <View style={{ flex: 1, marginLeft: 8 }}>
        <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', gap: 6 }}>
          <Text style={[st.payOptTitle, { color: isActive ? C.text : C.textMuted }]}>{title}</Text>
          {isDefaultBadge && (
            <View style={{ backgroundColor: `${C.primary}22`, paddingHorizontal: 6, paddingVertical: 1, borderRadius: 8 }}>
              <Text style={{ fontSize: 9, color: C.primary2, fontWeight: '800' }}>{t('isDefault')}</Text>
            </View>
          )}
        </View>
        <Text style={[st.payOptSub, { color: isActive && (modeKey === 'wallet' || modeKey === secondaryMode) ? C.green : C.textMuted }]}>{sub}</Text>
      </View>
      {isActive && <Ionicons name="checkmark-circle" size={20} color={C.primary2} />}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[st.container, { backgroundColor: C.bg }]} showsVerticalScrollIndicator={false}>

      {/* منتجات السلة */}
      {cart.map((item, i) => (
        <View key={i} style={[st.cartItem, { backgroundColor: C.bg2, borderColor: C.border }, isRTL && { flexDirection: 'row-reverse' }]}>
          <LinearGradient colors={item.colors || ['#4c1d95','#7c3aed']} style={st.itemIcon}>
            <Text style={st.itemIconTxt}>{(item.short||'').substring(0,4)}</Text>
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={[st.itemName, { color: C.textSub }, isRTL && { textAlign: 'right' }]}>{item.name}</Text>
            <Text style={[st.itemPkg, { color: C.textMuted }, isRTL && { textAlign: 'right' }]}>{item.pkg} × {item.qty}</Text>
          </View>
          <View style={{ alignItems: 'flex-end', gap: 6 }}>
            <Text style={[st.itemPrice, { color: C.accent }]}>${(item.price*item.qty).toFixed(2)}</Text>
            <TouchableOpacity onPress={() => removeFromCart(item.productId, item.pkgIndex)}>
              <Ionicons name="trash-outline" size={17} color={C.red} />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* كوبون */}
      <View style={[st.section, { backgroundColor: C.bg2, borderColor: C.border }]}>
        <View style={[st.secHeader, isRTL && { flexDirection: 'row-reverse' }]}>
          <Ionicons name="pricetag" size={16} color={C.primary2} />
          <Text style={[st.secTitle, { color: C.text }]}>{t('coupon')}</Text>
          <TouchableOpacity onPress={() => setShowCoupons(!showCoupons)} style={[st.showCpnBtn, { borderColor: C.border }]}>
            <Text style={[st.showCpnTxt, { color: C.accent }]}>{showCoupons ? (isRTL ? 'إخفاء' : 'Hide') : t('availableCoupons')}</Text>
          </TouchableOpacity>
        </View>
        {showCoupons && (
          <View style={st.cpnGrid}>
            {COUPONS.map(c => (
              <TouchableOpacity key={c.code}
                style={[st.cpnChip, { borderColor: appliedCoupon?.code === c.code ? C.primary : C.border, backgroundColor: appliedCoupon?.code === c.code ? `${C.primary}22` : C.bg3 }]}
                onPress={() => { setCouponInput(c.code); setCouponError(''); }}>
                <Text style={[st.cpnCode, { color: C.primary2 }]}>{c.code}</Text>
                <Text style={[st.cpnDesc, { color: C.textMuted }]}>{c.desc[isRTL ? 'ar' : 'en']}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {appliedCoupon ? (
          <View style={[st.appliedCpn, { backgroundColor: `${C.green}18`, borderColor: `${C.green}44` }]}>
            <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', gap: 6 }}>
              <Ionicons name="checkmark-circle" size={16} color={C.green} />
              <Text style={[st.appliedCpnTxt, { color: C.green }]}>
                {appliedCoupon.code} — {appliedCoupon.type === 'percent' ? `${appliedCoupon.value}%` : `$${appliedCoupon.value}`} {isRTL ? 'خصم' : 'off'}
              </Text>
            </View>
            <TouchableOpacity onPress={() => { setAppliedCoupon(null); setCouponInput(''); }}>
              <Text style={{ fontSize: 11, color: C.red, fontWeight: '700' }}>{t('removeCoupon')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[st.cpnRow, isRTL && { flexDirection: 'row-reverse' }]}>
            <TextInput
              style={[st.cpnInput, { backgroundColor: C.bg3, borderColor: couponError ? C.red : C.border, color: C.text }, isRTL && { textAlign: 'right' }]}
              placeholder={t('enterCoupon')} placeholderTextColor={C.textMuted}
              value={couponInput} onChangeText={v => { setCouponInput(v); setCouponError(''); }}
              autoCapitalize="characters" />
            <TouchableOpacity onPress={handleApplyCoupon}>
              <LinearGradient colors={[C.primary,C.primary2]} style={st.applyBtn}>
                <Text style={st.applyBtnTxt}>{t('applyCoupon')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
        {!!couponError && (
          <View style={[st.cpnErr, isRTL && { flexDirection: 'row-reverse' }]}>
            <Ionicons name="alert-circle-outline" size={13} color={C.red} />
            <Text style={[st.cpnErrTxt, { color: C.red }]}>{couponError}</Text>
          </View>
        )}
      </View>

      {/* ─ طريقة الدفع الأساسية ─ */}
      <View style={[st.section, { backgroundColor: C.bg2, borderColor: C.border }]}>
        <View style={[st.secHeader, isRTL && { flexDirection: 'row-reverse' }]}>
          <Ionicons name="card" size={16} color={C.primary2} />
          <Text style={[st.secTitle, { color: C.text }]}>{t('selectPaymentMethod')}</Text>
        </View>
        <View style={{ gap: 8 }}>
          {/* نقاطي */}
          {ptsBalance > 0 && (
            <PayOpt
              modeKey="points" icon="star"
              title={isRTL ? `نقاطي — ${ptsBalance} نقطة` : `My Points — ${ptsBalance} pts`}
              sub={isRTL
                ? `تغطي $${pointsCoverAmt.toFixed(2)} من المبلغ`
                : `Covers $${pointsCoverAmt.toFixed(2)} of your order`}
              isActive={primaryMode === 'points'}
              onSelect={() => setPrimaryMode('points')}
            />
          )}
          {/* محفظة */}
          <PayOpt
            modeKey="wallet" icon="wallet"
            title={t('payByWallet')}
            sub={`$${currentUser?.wallet.toFixed(2) || '0.00'}`}
            isActive={primaryMode === 'wallet'}
            onSelect={() => setPrimaryMode('wallet')}
          />
          {/* البطاقات المحفوظة */}
          {savedCards.map(card => (
            <PayOpt
              key={card.id}
              modeKey={`saved-${card.id}`} icon="💳"
              title={`${card.last4?.startsWith('4') ? 'Visa' : 'Mastercard'} •••• ${card.last4}`}
              sub={`${card.holder} · ${card.expiry}`}
              isDefaultBadge={card.isDefault}
              isActive={primaryMode === `saved-${card.id}`}
              onSelect={() => setPrimaryMode(`saved-${card.id}`)}
            />
          ))}
          {/* بطاقة جديدة */}
          <PayOpt
            modeKey="card" icon="add-circle-outline"
            title={isRTL ? 'بطاقة جديدة' : 'New Card'}
            sub="Visa / Mastercard / Mada"
            isActive={primaryMode === 'card'}
            onSelect={() => setPrimaryMode('card')}
          />
        </View>

        {/* ملاحظة إذا النقاط تكفي */}
        {primaryMode === 'points' && pointsCoverAll && (
          <View style={{ marginTop: 10, padding: 10, borderRadius: 10, backgroundColor: `${C.green}11`, borderWidth: 1, borderColor: `${C.green}33` }}>
            <Text style={[{ fontSize: 12, color: C.green, fontWeight: '700' }, isRTL && { textAlign: 'right' }]}>
              ✓ {isRTL ? `النقاط تكفي — ستُخصم ${pointsUsed} نقطة` : `Points cover full amount — ${pointsUsed} pts will be used`}
            </Text>
          </View>
        )}
      </View>

      {/* ─ طريقة الدفع الإضافية — تظهر فقط إذا النقاط لا تكفي ─ */}
      {needSecondary && (
        <View style={[st.section, { backgroundColor: C.bg2, borderColor: `${C.accent}55`, borderWidth: 1.5 }]}>
          <View style={[st.secHeader, isRTL && { flexDirection: 'row-reverse' }]}>
            <Ionicons name="add-circle" size={16} color={C.accent} />
            <Text style={[st.secTitle, { color: C.text }]}>
              {isRTL ? 'طريقة دفع إضافية للمتبقي' : 'Additional payment for remaining'}
            </Text>
            <View style={{ backgroundColor: `${C.accent}22`, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 }}>
              <Text style={{ fontSize: 11, fontWeight: '800', color: C.accent }}>${total.toFixed(2)}</Text>
            </View>
          </View>
          {/* توضيح */}
          <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', gap: 6, marginBottom: 10, padding: 8, backgroundColor: `${C.accent}0d`, borderRadius: 8 }}>
            <Ionicons name="information-circle-outline" size={14} color={C.accent} />
            <Text style={[{ fontSize: 11, color: C.accent, flex: 1 }, isRTL && { textAlign: 'right' }]}>
              {isRTL
                ? `النقاط (${pointsUsed} نقطة) ستُغطي $${pointsCoverAmt.toFixed(2)} — المتبقي $${total.toFixed(2)} يُكمَل من الطريقة أدناه`
                : `Points (${pointsUsed} pts) cover $${pointsCoverAmt.toFixed(2)} — remaining $${total.toFixed(2)} charged below`}
            </Text>
          </View>
          <View style={{ gap: 8 }}>
            {/* محفظة */}
            <PayOpt
              modeKey="wallet" icon="wallet"
              title={t('payByWallet')}
              sub={`$${currentUser?.wallet.toFixed(2) || '0.00'}`}
              isActive={secondaryMode === 'wallet'}
              onSelect={() => setSecondaryMode('wallet')}
            />
            {/* البطاقات المحفوظة */}
            {savedCards.map(card => (
              <PayOpt
                key={card.id}
                modeKey={`saved-${card.id}`} icon="💳"
                title={`${card.last4?.startsWith('4') ? 'Visa' : 'Mastercard'} •••• ${card.last4}`}
                sub={`${card.holder} · ${card.expiry}`}
                isDefaultBadge={card.isDefault}
                isActive={secondaryMode === `saved-${card.id}`}
                onSelect={() => setSecondaryMode(`saved-${card.id}`)}
              />
            ))}
            {/* بطاقة جديدة */}
            <PayOpt
              modeKey="card" icon="add-circle-outline"
              title={isRTL ? 'بطاقة جديدة' : 'New Card'}
              sub="Visa / Mastercard / Mada"
              isActive={secondaryMode === 'card'}
              onSelect={() => setSecondaryMode('card')}
            />
          </View>
        </View>
      )}

      {/* ملخص الطلب */}
      <View style={[st.summary, { backgroundColor: C.bg2, borderColor: C.border }]}>
        <Text style={[st.sumTitle, { color: C.text }, isRTL && { textAlign: 'right' }]}>
          {isRTL ? 'ملخص الطلب' : 'Order Summary'}
        </Text>
        {[
          [t('subtotal'), `$${subtotal.toFixed(2)}`, null],
          ...(couponDiscount > 0 ? [[`${t('couponDiscount')} (${appliedCoupon.code})`, `-$${couponDiscount.toFixed(2)}`, C.green]] : []),
          ...(pointsDiscount > 0 ? [[isRTL ? `خصم نقاطي (${pointsUsed} نقطة)` : `Points (${pointsUsed} pts)`, `-$${pointsDiscount.toFixed(2)}`, C.accent]] : []),
          [t('vat'), `$${vat.toFixed(2)}`, null],
        ].map(([k, v, vc], idx) => (
          <View key={idx} style={[st.sumRow, { borderBottomColor: C.border }, isRTL && { flexDirection: 'row-reverse' }]}>
            <Text style={[st.sumK, { color: C.textMuted }]}>{k}</Text>
            <Text style={[st.sumV, { color: vc || C.textSub }]}>{v}</Text>
          </View>
        ))}
        <View style={[st.sumRow, st.totalRow, isRTL && { flexDirection: 'row-reverse' }]}>
          <Text style={[st.totalLbl, { color: C.text }]}>{t('total')}</Text>
          <Text style={[st.totalVal, { color: pointsCoverAll ? C.green : C.accent }]}>
            {pointsCoverAll ? (isRTL ? '✓ مجاني بالنقاط' : '✓ Free with points!') : `$${total.toFixed(2)}`}
          </Text>
        </View>
        {/* تفصيل طرق الدفع إذا كان مختلطاً */}
        {needSecondary && (
          <View style={{ marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: C.border, gap: 4 }}>
            <View style={[{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between' }]}>
              <Text style={{ fontSize: 11, color: C.textMuted }}>⭐ {isRTL ? 'نقاطي' : 'My Points'}</Text>
              <Text style={{ fontSize: 11, fontWeight: '700', color: C.accent }}>-${pointsCoverAmt.toFixed(2)}</Text>
            </View>
            <View style={[{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between' }]}>
              <Text style={{ fontSize: 11, color: C.textMuted }}>💳 {isRTL ? 'طريقة إضافية' : 'Additional'}</Text>
              <Text style={{ fontSize: 11, fontWeight: '700', color: C.text }}>${total.toFixed(2)}</Text>
            </View>
          </View>
        )}
      </View>

      {/* رصيد المحفظة */}
      {currentUser && !pointsCoverAll && (
        <View style={[st.walHint, { backgroundColor: `${C.primary}11`, borderColor: `${C.primary}22` }]}>
          <Ionicons name="wallet-outline" size={14} color={C.textMuted} />
          <Text style={[st.walHintTxt, { color: C.textMuted }]}>
            {t('walletBalance')}: <Text style={{ color: currentUser.wallet >= total ? C.green : C.red }}>${currentUser.wallet.toFixed(2)}</Text>
          </Text>
        </View>
      )}

      <TouchableOpacity onPress={handleCheckout} activeOpacity={0.88}>
        <LinearGradient colors={['#f97316','#ef4444']} style={st.checkoutBtn}>
          <Ionicons name="checkmark-circle" size={18} color="#fff" />
          <Text style={st.checkoutBtnTxt}>
            {t('checkout')} {pointsCoverAll ? (isRTL ? '— بالنقاط' : '— with points') : `— $${total.toFixed(2)}`}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={{ height: 28 }} />
    </ScrollView>
  );
}

const st = StyleSheet.create({
  container: { flex: 1, padding: 14 },
  centerWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30, gap: 12 },
  emptyTitle: { fontSize: 20, fontWeight: '800' },
  emptySub: { fontSize: 13, textAlign: 'center', lineHeight: 20 },
  successCircle: { width: 90, height: 90, borderRadius: 45, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  successTitle: { fontSize: 24, fontWeight: '900' },
  successSub: { fontSize: 13, textAlign: 'center', lineHeight: 20 },
  ptsBanner: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, borderWidth: 1 },
  ptsBannerTxt: { fontSize: 13, fontWeight: '700' },
  walletAfter: { fontSize: 13 },
  actionBtn: { paddingHorizontal: 36, paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  actionBtnTxt: { fontSize: 15, fontWeight: '800', color: '#fff' },
  cartItem: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 13, marginBottom: 10, borderWidth: 1, gap: 11 },
  itemIcon: { width: 46, height: 46, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  itemIconTxt: { fontSize: 9, fontWeight: '900', color: '#fff', textAlign: 'center' },
  itemName: { fontSize: 13, fontWeight: '700' },
  itemPkg: { fontSize: 11, marginTop: 2 },
  itemPrice: { fontSize: 14, fontWeight: '800' },
  section: { borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 1 },
  secHeader: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 12 },
  secTitle: { fontSize: 14, fontWeight: '800', flex: 1 },
  showCpnBtn: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, borderWidth: 1 },
  showCpnTxt: { fontSize: 11, fontWeight: '600' },
  cpnGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  cpnChip: { borderRadius: 10, borderWidth: 1, padding: 8, minWidth: '47%' },
  cpnCode: { fontSize: 12, fontWeight: '900', marginBottom: 2 },
  cpnDesc: { fontSize: 10, fontWeight: '500' },
  cpnRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  cpnInput: { flex: 1, borderRadius: 10, borderWidth: 1, padding: 11, fontSize: 14 },
  applyBtn: { borderRadius: 10, paddingHorizontal: 16, paddingVertical: 12 },
  applyBtnTxt: { fontSize: 13, fontWeight: '800', color: '#fff' },
  appliedCpn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 10, borderWidth: 1, padding: 10 },
  appliedCpnTxt: { fontSize: 13, fontWeight: '700' },
  cpnErr: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  cpnErrTxt: { fontSize: 11, fontWeight: '600' },
  payOpt: { flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 11, borderWidth: 1, padding: 12 },
  payOptTitle: { fontSize: 13, fontWeight: '700' },
  payOptSub: { fontSize: 11, marginTop: 1 },
  summary: { borderRadius: 14, padding: 15, marginBottom: 12, borderWidth: 1 },
  sumTitle: { fontSize: 14, fontWeight: '800', marginBottom: 12 },
  sumRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1 },
  sumK: { fontSize: 12 },
  sumV: { fontSize: 12, fontWeight: '700' },
  totalRow: { borderBottomWidth: 0, paddingTop: 12, marginTop: 2 },
  totalLbl: { fontSize: 15, fontWeight: '800' },
  totalVal: { fontSize: 18, fontWeight: '900' },
  walHint: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 10, padding: 10, marginBottom: 12, borderWidth: 1 },
  walHintTxt: { fontSize: 12 },
  checkoutBtn: { borderRadius: 15, padding: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  checkoutBtnTxt: { fontSize: 15, fontWeight: '800', color: '#fff' },
});