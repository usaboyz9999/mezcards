import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Alert, Modal, FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext.js';

// ─── GUEST GATE ───────────────────────────────────────────────────────────────
function GuestGate({ navigation }) {
  const { t, isRTL, colors: C } = useApp();
  return (
    <View style={[s.centerWrap, { backgroundColor: C.bg }]}>
      <Text style={s.gateIcon}>🔒</Text>
      <Text style={[s.gateTitle, { color: C.text }, isRTL && s.rtlText]}>{t('signInToView')}</Text>
      <Text style={[s.gateSub, { color: C.textMuted }, isRTL && s.rtlText]}>{t('signInToViewSub')}</Text>
      <TouchableOpacity style={s.fullWidth} onPress={() => navigation.navigate('Account')}>
        <LinearGradient colors={['#7c3aed', '#a855f7']} style={s.actionBtn}>
          <Text style={s.actionBtnText}>{t('loginNow')}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

// ─── ORDERS ───────────────────────────────────────────────────────────────────
export function OrdersScreen({ navigation }) {
  const { orders, invoices, t, isRTL, currentUser, colors: C } = useApp();
  const [selectedOrder, setSelectedOrder] = useState(null);
  if (!currentUser) return <GuestGate navigation={navigation} />;

  const completed = orders.filter(o => o.status === 'completed').length;
  const getStatus = (st) => ({
    bg: st === 'completed' ? 'rgba(52,211,153,0.15)' : st === 'pending' ? 'rgba(251,191,36,0.15)' : 'rgba(248,113,113,0.15)',
    color: st === 'completed' ? '#34d399' : st === 'pending' ? '#fbbf24' : '#f87171',
    label: st === 'completed' ? t('completed') : st === 'pending' ? t('pending') : t('failed'),
  });

  if (selectedOrder) {
    const inv = invoices?.find(inv => inv.items?.some(item => item.name?.includes(selectedOrder.name?.split(' (')[0])));
    const st = getStatus(selectedOrder.status);
    return (
      <ScrollView style={[s.container, { backgroundColor: C.bg }]} contentContainerStyle={{ padding: 14 }}>
        <LinearGradient colors={['#4c1d95','#7c3aed','#a855f7']} style={{ borderRadius: 18, padding: 20, marginBottom: 14 }}>
          <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View>
              <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>{isRTL ? 'رقم الطلب' : 'Order ID'}</Text>
              <Text style={{ fontSize: 18, fontWeight: '900', color: '#fbbf24' }}>{selectedOrder.id}</Text>
            </View>
            <View style={[s.badge, { backgroundColor: st.bg }]}>
              <Text style={[s.badgeText, { color: st.color }]}>{st.label}</Text>
            </View>
          </View>
          <View style={{ marginTop: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.15)' }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#fff', marginBottom: 4 }}>{selectedOrder.name}</Text>
            <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{selectedOrder.customer} · {selectedOrder.date}</Text>
          </View>
        </LinearGradient>
        <View style={[s.settingGroup, { backgroundColor: C.bg2, borderColor: C.border, padding: 14, marginBottom: 12 }]}>
          <Text style={[{ fontSize: 14, fontWeight: '800', color: C.text, marginBottom: 12 }, isRTL && s.rtlText]}>{isRTL ? 'تفاصيل المبلغ' : 'Amount Details'}</Text>
          <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: C.border }}>
            <Text style={{ fontSize: 13, color: C.textMuted }}>{isRTL ? 'المنتج' : 'Product'}</Text>
            <Text style={{ fontSize: 13, fontWeight: '700', color: C.textSub }}>{selectedOrder.amount}</Text>
          </View>
          <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', paddingTop: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: '800', color: C.text }}>{t('total')}</Text>
            <Text style={{ fontSize: 17, fontWeight: '900', color: C.accent }}>{selectedOrder.amount}</Text>
          </View>
        </View>
        <View style={[s.settingGroup, { backgroundColor: C.bg2, borderColor: C.border, padding: 14, marginBottom: 12 }]}>
          <Text style={[{ fontSize: 14, fontWeight: '800', color: C.text, marginBottom: 12 }, isRTL && s.rtlText]}>{isRTL ? 'طريقة الدفع' : 'Payment Method'}</Text>
          <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(124,58,237,0.15)', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 22 }}>
                {selectedOrder.paymentLabel ? (selectedOrder.paymentLabel.en?.includes('Points') ? '⭐' : selectedOrder.paymentLabel.en?.includes('Visa') || selectedOrder.paymentLabel.en?.includes('Mastercard') ? '💳' : '💰') : '💰'}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[{ fontSize: 14, fontWeight: '700', color: C.text }, isRTL && s.rtlText]}>
                {selectedOrder.paymentLabel ? selectedOrder.paymentLabel[isRTL ? 'ar' : 'en'] : (isRTL ? 'المحفظة الإلكترونية' : 'Digital Wallet')}
              </Text>
              {selectedOrder.usedPoints > 0 && selectedOrder.pointsDiscount > 0 && (
                <Text style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>
                  {isRTL ? `خصم نقاطي: $${selectedOrder.pointsDiscount?.toFixed(2)}` : `Points discount: $${selectedOrder.pointsDiscount?.toFixed(2)}`}
                </Text>
              )}
            </View>
          </View>
        </View>
        {inv && (
          <View style={[s.settingGroup, { backgroundColor: C.bg2, borderColor: C.border, padding: 14, marginBottom: 12 }]}>
            <Text style={[{ fontSize: 14, fontWeight: '800', color: C.text, marginBottom: 8 }, isRTL && s.rtlText]}>
              {isRTL ? 'الفاتورة' : 'Invoice'}: <Text style={{ color: C.accent }}>{inv.id}</Text>
            </Text>
            {inv.items?.map((item, i) => (
              <View key={i} style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', paddingVertical: 6 }}>
                <Text style={[{ fontSize: 12, color: C.textMuted, flex: 1 }, isRTL && s.rtlText]}>{item.name}</Text>
                <Text style={{ fontSize: 12, fontWeight: '700', color: item.amount?.startsWith('-') ? '#34d399' : C.textSub }}>{item.amount}</Text>
              </View>
            ))}
          </View>
        )}
        <TouchableOpacity style={{ alignItems: 'center', padding: 14 }} onPress={() => setSelectedOrder(null)}>
          <Text style={{ color: C.textMuted, fontSize: 13 }}>← {isRTL ? 'العودة للطلبات' : 'Back to Orders'}</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={[s.centerWrap, { backgroundColor: C.bg }]}>
        <Text style={s.gateIcon}>📋</Text>
        <Text style={[s.gateTitle, { color: C.text }, isRTL && s.rtlText]}>{t('noOrdersYet')}</Text>
        <Text style={[s.gateSub, { color: C.textMuted }, isRTL && s.rtlText]}>{t('noOrdersSub')}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[s.container, { backgroundColor: C.bg }]} showsVerticalScrollIndicator={false}>
      <View style={s.statsGrid}>
        {[{ label: t('totalOrders'), value: orders.length }, { label: t('completed'), value: completed }].map((st, i) => (
          <View key={i} style={[s.statCard, { backgroundColor: C.bg2, borderColor: C.border }]}>
            <Text style={[s.statLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{st.label}</Text>
            <Text style={[s.statValue, { color: C.text }]}>{st.value}</Text>
          </View>
        ))}
      </View>
      <View style={[s.sectionRow, isRTL && s.rowRev]}>
        <Text style={[s.sectionTitle, { color: C.text }]}>{t('recentOrders')}</Text>
      </View>
      {orders.map((o, i) => {
        const st = getStatus(o.status);
        return (
          <TouchableOpacity key={i} style={[s.orderItem, { backgroundColor: C.bg2, borderColor: C.border }]}
            onPress={() => setSelectedOrder(o)} activeOpacity={0.8}>
            <View style={[s.orderTop, isRTL && s.rowRev]}>
              <Text style={[s.orderId, { color: C.accent }]}>{o.id}</Text>
              <View style={[s.badge, { backgroundColor: st.bg }]}>
                <Text style={[s.badgeText, { color: st.color }]}>{st.label}</Text>
              </View>
            </View>
            <Text style={[s.orderName, { color: C.textSub }, isRTL && s.rtlText]}>{o.name}</Text>
            <View style={[s.orderBottom, isRTL && s.rowRev]}>
              <Text style={[s.orderCustomer, { color: C.textMuted }]}>{o.customer} · {o.date}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={[s.orderAmount, { color: C.text }]}>{o.amount}</Text>
                <Ionicons name={isRTL ? 'chevron-back' : 'chevron-forward'} size={14} color={C.textMuted} />
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
      <View style={{ height: 16 }} />
    </ScrollView>
  );
}


// ─── WALLET ───────────────────────────────────────────────────────────────────
export function WalletScreen({ navigation }) {
  const { currentUser, addFunds, transactions, t, isRTL, colors: C, currency, transferFunds } = useApp();
  const [activeTab, setActiveTab] = useState('wallet'); // 'wallet' | 'topup' | 'transfer'
  const [amount, setAmount] = useState('');
  const [transferTarget, setTransferTarget] = useState('');
  const [transferAmt, setTransferAmt] = useState('');
  const sym = currency?.symbol || '$';

  if (!currentUser) return <GuestGate navigation={navigation} />;

  const handleTopup = () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) { showModal({ type:'error', title: t('invalidAmount'), message: t('enterValidAmount') }); return; }
    addFunds(amount);
    setAmount('');
    setActiveTab('wallet');
    showModal({ type:'success', icon:'points', title: t('successTopup'), message: isRTL ? `تم إضافة $${amt.toFixed(2)} لمحفظتك` : `$${amt.toFixed(2)} added to your wallet.` });
  };

  const handleTransfer = () => {
    if (!transferTarget.trim() || !transferAmt) {
      showModal({ type:'error', title: isRTL ? 'خطأ' : 'Error', message: isRTL ? 'يرجى ملء جميع الحقول' : 'Please fill all fields.' });
      return;
    }
    const result = transferFunds(transferTarget.trim(), transferAmt);
    if (result.success) {
      showModal({ type:'success', icon:'points', title: t('transferSuccess'), message: isRTL ? `تم تحويل $${result.amount.toFixed(2)} إلى ${result.targetName}` : `$${result.amount.toFixed(2)} transferred to ${result.targetName}.` });
      setTransferTarget('');
      setTransferAmt('');
      setActiveTab('wallet');
    } else {
      showModal({ type:'error', title: isRTL ? 'خطأ' : 'Error', message: result.error });
    }
  };

  const tabs = [
    { key: 'wallet', label: isRTL ? '💳 المحفظة' : '💳 Wallet' },
    { key: 'topup',  label: isRTL ? '➕ إضافة' : '➕ Add Funds' },
    { key: 'transfer', label: isRTL ? '↗️ تحويل' : '↗️ Transfer' },
  ];

  return (
    <ScrollView style={[s.container, { backgroundColor: C.bg }]} showsVerticalScrollIndicator={false}>
      {/* Wallet Card */}
      <LinearGradient colors={['#4c1d95', '#7c3aed', '#9333ea']} style={s.walletCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <Text style={[s.walLabel, isRTL && s.rtlText]}>{t('availableBalance')}</Text>
        <Text style={s.walBalance}>${currentUser.wallet.toFixed(2)}</Text>
        <Text style={[s.walUser, isRTL && s.rtlText]}>{t('accountLabel')}: {currentUser.name}</Text>
        <View style={[s.walBubble, { width: 130, height: 130, top: -40, right: -35 }]} />
        <View style={[s.walBubble, { width: 80, height: 80, bottom: -25, right: 100 }]} />
      </LinearGradient>

      {/* Tabs */}
      <View style={[s.tabsRow, { backgroundColor: C.bg2, borderColor: C.border }, isRTL && s.rowRev]}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[s.tabBtn, activeTab === tab.key && { backgroundColor: C.primary }]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={[s.tabBtnText, { color: activeTab === tab.key ? '#fff' : C.textMuted }]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Add Funds */}
      {activeTab === 'topup' && (
        <View style={[s.actionBox, { backgroundColor: C.bg2, borderColor: C.border }]}>
          <Text style={[s.actionBoxTitle, { color: C.text }, isRTL && s.rtlText]}>{t('addFundsTitle')}</Text>
          <Text style={[s.inputLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('amountUSD')}</Text>
          <TextInput
            style={[s.textInput, { backgroundColor: C.bg3, borderColor: C.border, color: C.text }, isRTL && { textAlign: 'right' }]}
            placeholder="50" placeholderTextColor={C.textMuted}
            value={amount} onChangeText={setAmount} keyboardType="numeric"
          />
          <View style={[s.quickAmounts, isRTL && s.rowRev]}>
            {['10', '25', '50', '100'].map(v => (
              <TouchableOpacity key={v} style={[s.quickAmt, { borderColor: C.border, backgroundColor: amount === v ? C.primary : C.bg3 }]} onPress={() => setAmount(v)}>
                <Text style={[s.quickAmtText, { color: amount === v ? '#fff' : C.textMuted }]}>${v}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={handleTopup}>
            <LinearGradient colors={[C.primary, C.primary2]} style={s.confirmBtn}>
              <Text style={s.confirmBtnText}>{t('confirmTopup')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      {/* Transfer */}
      {activeTab === 'transfer' && (
        <View style={[s.actionBox, { backgroundColor: C.bg2, borderColor: C.border }]}>
          <Text style={[s.actionBoxTitle, { color: C.text }, isRTL && s.rtlText]}>{t('transferFunds')}</Text>
          <Text style={[s.inputLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('transferTo')}</Text>
          <TextInput
            style={[s.textInput, { backgroundColor: C.bg3, borderColor: C.border, color: C.text }, isRTL && { textAlign: 'right' }]}
            placeholder={t('transferPlaceholder')} placeholderTextColor={C.textMuted}
            value={transferTarget} onChangeText={setTransferTarget} autoCapitalize="none"
          />
          <Text style={[s.inputLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('transferAmount')}</Text>
          <TextInput
            style={[s.textInput, { backgroundColor: C.bg3, borderColor: C.border, color: C.text }, isRTL && { textAlign: 'right' }]}
            placeholder="0.00" placeholderTextColor={C.textMuted}
            value={transferAmt} onChangeText={setTransferAmt} keyboardType="numeric"
          />
          <View style={[s.balanceHint, isRTL && s.rowRev]}>
            <Text style={[s.balanceHintText, { color: C.textMuted }]}>
              {isRTL ? `رصيدك: $${currentUser.wallet.toFixed(2)}` : `Balance: $${currentUser.wallet.toFixed(2)}`}
            </Text>
          </View>
          <TouchableOpacity onPress={handleTransfer}>
            <LinearGradient colors={['#10b981', '#059669']} style={s.confirmBtn}>
              <Text style={s.confirmBtnText}>{t('transferConfirm')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      {/* Stats */}
      {activeTab === 'wallet' && (
        <>
          <View style={s.statsGrid}>
            {[{ label: t('totalSpent'), value: `$${currentUser.spent.toFixed(0)}` }, { label: t('cashback'), value: '$0.00' }].map((st, i) => (
              <View key={i} style={[s.statCard, { backgroundColor: C.bg2, borderColor: C.border }]}>
                <Text style={[s.statLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{st.label}</Text>
                <Text style={[s.statValue, { color: C.text }]}>{st.value}</Text>
              </View>
            ))}
          </View>
          <View style={[s.sectionRow, isRTL && s.rowRev]}>
            <Text style={[s.sectionTitle, { color: C.text }]}>{t('recentTransactions')}</Text>
          </View>
          {transactions.length === 0 ? (
            <View style={[s.centerWrap, { paddingTop: 30 }]}>
              <Text style={s.gateIcon}>💳</Text>
              <Text style={[s.gateTitle, { color: C.text }]}>{t('noTransactionsYet')}</Text>
              <Text style={[s.gateSub, { color: C.textMuted }]}>{t('noTransactionsSub')}</Text>
            </View>
          ) : transactions.slice(0, 8).map((tr, i) => (
            <View key={i} style={[s.transItem, { backgroundColor: C.bg2, borderColor: C.border }, isRTL && s.rowRev]}>
              <View style={[s.transIcon, { backgroundColor: tr.bg }]}><Text style={{ fontSize: 17 }}>{tr.icon}</Text></View>
              <View style={s.transInfo}>
                <Text style={[s.transName, { color: C.textSub }, isRTL && s.rtlText]}>{tr.name}</Text>
                <Text style={[s.transDate, { color: C.textMuted }, isRTL && s.rtlText]}>{tr.date}</Text>
              </View>
              <Text style={[s.transAmount, { color: tr.color }]}>{tr.amount}</Text>
            </View>
          ))}
        </>
      )}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

// ─── ACCOUNT ──────────────────────────────────────────────────────────────────
export function AccountScreen({ navigation }) {
  const { currentUser, logout, t, isRTL, login, register, toggleLanguage, language, colors: C, requestPasswordReset, verifyOTPAndReset } = useApp();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [newPassValue, setNewPassValue] = useState('');
  const [confirmNewPassValue, setConfirmNewPassValue] = useState('');
  const [demoCode, setDemoCode] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [error, setError] = useState('');

  const reset = () => { setError(''); setEmail(''); setPassword(''); setName(''); setUsername(''); setConfirmPass(''); setResetEmail(''); setEnteredOtp(''); setNewPassValue(''); setConfirmNewPassValue(''); setDemoCode(''); };

  const handleLogin = () => {
    setError('');
    const result = login(email.trim(), password.trim());
    if (result.success) reset();
    else setError(result.error);
  };

  const handleRegister = () => {
    setError('');
    if (!name || !username || !email || password.length < 6) { setError(t('fillAllFields')); return; }
    if (password !== confirmPass) { setError(t('passwordsNotMatch')); return; }
    const result = register(name.trim(), username.trim(), email.trim(), password.trim());
    if (result.success) { showModal({ type:'success', emoji:'🎉', title: t('accountCreated'), message: t('canSignIn') }); reset(); setMode('login'); }
    else setError(result.error);
  };

  const menuItems = [
    { icon: '❤️', title: t('myWishlist'),       sub: t('viewWishlist'),       route: 'Wishlist',       bg: 'rgba(248,113,113,0.15)' },
    { icon: '⭐', title: t('loyaltyPoints'),      sub: t('viewPoints'),         route: 'Points',         bg: 'rgba(251,191,36,0.15)'  },
    { icon: '🔗', title: t('referral'),           sub: t('viewReferral'),       route: 'Referral',       bg: 'rgba(52,211,153,0.15)'  },
    { icon: '🎫', title: t('support'),            sub: t('viewSupport'),        route: 'Support',        bg: 'rgba(96,165,250,0.15)'  },
    { icon: '💳', title: t('paymentMethods'),     sub: t('viewPaymentMethods'), route: 'PaymentMethods', bg: 'rgba(124,58,237,0.15)'  },
    { icon: '⚡', title: t('transactions'),       sub: t('viewPayments'),       route: 'Transactions',   bg: 'rgba(124,58,237,0.2)'   },
    { icon: '📄', title: t('invoice'),            sub: t('viewInvoices'),       route: 'Invoice',        bg: 'rgba(251,191,36,0.15)'  },
    { icon: '⚙️', title: t('settings'),           sub: t('appPreferences'),     route: 'Settings',       bg: 'rgba(248,113,113,0.15)' },
  ];

  const LangToggle = () => (
    <TouchableOpacity style={[s.langToggleBtn, isRTL && s.rowRev]} onPress={toggleLanguage}>
      <Text style={{ fontSize: 16 }}>🌐</Text>
      <Text style={[{ flex: 1, fontSize: 12, fontWeight: '600', color: C.textMuted, marginLeft: isRTL ? 0 : 8, marginRight: isRTL ? 8 : 0 }, isRTL && s.rtlText]}>{t('switchLanguage')}</Text>
      <View style={[s.langBadge, { borderColor: 'rgba(124,58,237,0.3)', backgroundColor: 'rgba(124,58,237,0.1)' }]}>
        <Text style={[s.langBadgeText, { color: C.accent }]}>{language === 'ar' ? '🇸🇦 AR' : '🇺🇸 EN'}</Text>
      </View>
    </TouchableOpacity>
  );

  if (currentUser) {
    return (
      <ScrollView style={[s.container, { backgroundColor: C.bg }]} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#4c1d95', '#7c3aed', '#a855f7']} style={s.profileCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <View style={[s.profileCardRow, isRTL && s.rowRev]}>
            <View style={s.profileAvatarLg}><Text style={s.profileAvatarLgText}>{currentUser.avatar}</Text></View>
            <View style={[s.profileCardInfo, isRTL && { marginRight: 14, marginLeft: 0 }]}>
              <Text style={[s.profileCardName, isRTL && s.rtlText]}>{currentUser.name}</Text>
              <Text style={[s.profileCardEmail, isRTL && s.rtlText]}>{currentUser.email}</Text>
              <View style={[s.profileCardBal, isRTL && s.rowRev]}>
                <Text style={s.profileCardBalLabel}>{t('balance')}: </Text>
                <Text style={s.profileCardBalValue}>${currentUser.wallet.toFixed(2)}</Text>
              </View>
            </View>
          </View>
          <View style={[s.walBubble, { width: 110, height: 110, top: -28, right: -28 }]} />
        </LinearGradient>

        {menuItems.map((m, i) => (
          <TouchableOpacity key={i} style={[s.menuItem, { backgroundColor: C.bg2, borderColor: C.border }, isRTL && s.rowRev]} onPress={() => navigation.navigate(m.route)}>
            <View style={[s.menuIcon, { backgroundColor: m.bg }]}><Text style={{ fontSize: 18 }}>{m.icon}</Text></View>
            <View style={[s.menuText, isRTL && { marginRight: 12, marginLeft: 0 }]}>
              <Text style={[s.menuTitle, { color: C.textSub }, isRTL && s.rtlText]}>{m.title}</Text>
              <Text style={[s.menuSub, { color: C.textMuted }, isRTL && s.rtlText]}>{m.sub}</Text>
            </View>
            <Text style={[s.menuArrow, { color: C.border }]}>{isRTL ? '‹' : '›'}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={[s.logoutBtn, isRTL && s.rowRev]} onPress={() => { logout(); showModal({ type:'info', title: t('loggedOut'), message: isRTL ? 'تم تسجيل الخروج بنجاح' : 'You have been signed out.' }); }}>
          <Text style={{ fontSize: 18 }}>🚪</Text>
          <Text style={[s.logoutText, isRTL && s.rtlText]}>{t('logout')}</Text>
        </TouchableOpacity>
        <View style={{ height: 20 }} />
      </ScrollView>
    );
  }

  if (mode === 'forgot') {
    return (
      <ScrollView style={[s.container, { backgroundColor: C.bg }]} contentContainerStyle={s.authContainer}>
        <View style={[s.authCard, { backgroundColor: C.bg2, borderColor: C.border }]}>
          <Text style={s.authIcon}>🔐</Text>
          <Text style={[s.authTitle, { color: C.text }, isRTL && s.rtlText]}>{t('resetPassword')}</Text>
          <Text style={[s.authSub, { color: C.textMuted }, isRTL && s.rtlText]}>{t('forgotPasswordSub')}</Text>
          {!!error && <View style={s.errorBox}><Text style={[s.errorText, isRTL && s.rtlText]}>{error}</Text></View>}
          <Text style={[s.inputLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('emailOrUsername')}</Text>
          <TextInput style={[s.textInput, { backgroundColor: C.bg3, borderColor: C.border, color: C.text }, isRTL && { textAlign: 'right' }]} placeholder={t('emailOrUsername')} placeholderTextColor={C.textMuted} value={resetEmail} onChangeText={setResetEmail} autoCapitalize="none" />
          <TouchableOpacity onPress={() => {
            setError('');
            if (!resetEmail.trim()) { setError(isRTL ? 'أدخل بريدك أو اسم المستخدم' : 'Enter email or username'); return; }
            const result = requestPasswordReset(resetEmail.trim());
            if (!result.success) { setError(result.error); return; }
            setDemoCode(result.code); setOtpEmail(result.email);
            showModal({ type:'info', emoji:'📧', title: isRTL ? 'كود التحقق (تجريبي)' : 'Verification Code (Demo)', message: isRTL ? `كودك: ${result.code}` : `Your code: ${result.code}` });
            setMode('otp');
          }}>
            <LinearGradient colors={[C.primary, C.primary2]} style={s.authBtn}><Text style={s.authBtnText}>{t('sendResetLink')}</Text></LinearGradient>
          </TouchableOpacity>
          <LangToggle />
          <TouchableOpacity style={s.backLink} onPress={() => { setMode('login'); reset(); }}>
            <Text style={[s.backLinkText, { color: C.accent }]}>← {t('backToLogin')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  if (mode === 'otp') {
    return (
      <ScrollView style={[s.container, { backgroundColor: C.bg }]} contentContainerStyle={s.authContainer}>
        <View style={[s.authCard, { backgroundColor: C.bg2, borderColor: C.border }]}>
          <Text style={s.authIcon}>📩</Text>
          <Text style={[s.authTitle, { color: C.text }, isRTL && s.rtlText]}>{isRTL ? 'أدخل كود التحقق' : 'Enter Verification Code'}</Text>
          <Text style={[s.authSub, { color: C.textMuted }, isRTL && s.rtlText]}>{isRTL ? `أُرسل كود إلى: ${otpEmail}` : `Code sent to: ${otpEmail}`}</Text>
          {!!demoCode && (
            <TouchableOpacity style={[s.demoBox, { borderColor: 'rgba(251,191,36,0.3)' }]} onPress={() => setEnteredOtp(demoCode)}>
              <Text style={[s.demoText, { color: C.accent }, isRTL && s.rtlText]}>{isRTL ? `🔢 كودك: ${demoCode} (اضغط للنسخ)` : `🔢 Code: ${demoCode} (Tap to fill)`}</Text>
            </TouchableOpacity>
          )}
          {!!error && <View style={s.errorBox}><Text style={[s.errorText, isRTL && s.rtlText]}>{error}</Text></View>}
          <View style={[s.otpRow, isRTL && s.rowRev]}>
            {[0,1,2,3,4,5].map(i => (
              <TextInput
                key={i}
                style={[s.otpBox, { backgroundColor: C.bg3, borderColor: enteredOtp.length > i ? C.primary : C.border, color: C.text }]}
                value={enteredOtp[i] || ''} maxLength={1} keyboardType="numeric" textAlign="center"
                onChangeText={val => {
                  const arr = enteredOtp.split('');
                  arr[i] = val.replace(/[^0-9]/g, '');
                  setEnteredOtp(arr.join('').slice(0, 6));
                }}
              />
            ))}
          </View>
          <TouchableOpacity style={{ opacity: enteredOtp.length < 6 ? 0.5 : 1 }} disabled={enteredOtp.length < 6} onPress={() => { setError(''); setMode('newpass'); }}>
            <LinearGradient colors={enteredOtp.length === 6 ? [C.primary, C.primary2] : ['#3a2f5a', '#4a3f6a']} style={s.authBtn}>
              <Text style={s.authBtnText}>{isRTL ? 'تأكيد ←' : 'Verify →'}</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center', marginTop: 8, marginBottom: 8 }} onPress={() => {
            const result = requestPasswordReset(resetEmail.trim());
            if (result.success) { setDemoCode(result.code); showModal({ type:'success', title: isRTL ? 'كود جديد' : 'New Code', message: isRTL ? `كودك: ${result.code}` : `Code: ${result.code}` }); }
          }}>
            <Text style={{ fontSize: 12, color: C.accent, fontWeight: '600' }}>{isRTL ? '🔄 إعادة إرسال' : '🔄 Resend Code'}</Text>
          </TouchableOpacity>
          <LangToggle />
          <TouchableOpacity style={s.backLink} onPress={() => { setMode('forgot'); setEnteredOtp(''); setError(''); }}>
            <Text style={[s.backLinkText, { color: C.accent }]}>← {isRTL ? 'رجوع' : 'Back'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  if (mode === 'newpass') {
    return (
      <ScrollView style={[s.container, { backgroundColor: C.bg }]} contentContainerStyle={s.authContainer}>
        <View style={[s.authCard, { backgroundColor: C.bg2, borderColor: C.border }]}>
          <Text style={s.authIcon}>🔑</Text>
          <Text style={[s.authTitle, { color: C.text }, isRTL && s.rtlText]}>{isRTL ? 'كلمة مرور جديدة' : 'New Password'}</Text>
          {!!error && <View style={s.errorBox}><Text style={[s.errorText, isRTL && s.rtlText]}>{error}</Text></View>}
          <Text style={[s.inputLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{isRTL ? 'كلمة المرور الجديدة' : 'New Password'}</Text>
          <TextInput style={[s.textInput, { backgroundColor: C.bg3, borderColor: C.border, color: C.text }, isRTL && { textAlign: 'right' }]} placeholder={isRTL ? '6 أحرف على الأقل' : 'Min 6 characters'} placeholderTextColor={C.textMuted} value={newPassValue} onChangeText={setNewPassValue} secureTextEntry />
          <Text style={[s.inputLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('confirmPassword')}</Text>
          <TextInput style={[s.textInput, { backgroundColor: C.bg3, borderColor: C.border, color: C.text, marginBottom: 12 }, isRTL && { textAlign: 'right' }]} placeholder={t('confirmPassword')} placeholderTextColor={C.textMuted} value={confirmNewPassValue} onChangeText={setConfirmNewPassValue} secureTextEntry />
          <TouchableOpacity onPress={() => {
            setError('');
            if (newPassValue.length < 6) { setError(isRTL ? 'كلمة المرور 6 أحرف على الأقل' : 'Min 6 characters'); return; }
            if (newPassValue !== confirmNewPassValue) { setError(t('passwordsNotMatch')); return; }
            const result = verifyOTPAndReset(enteredOtp, newPassValue);
            if (result.success) {
              showModal({ type:'success', emoji:'✅', title: isRTL ? 'تم التغيير' : 'Password Changed', message: isRTL ? 'يمكنك تسجيل الدخول الآن' : 'You can now sign in.', buttons: [{ text: 'OK', onPress: () => { reset(); setMode('login'); } }] });
            } else { setError(result.error); setMode('otp'); }
          }}>
            <LinearGradient colors={[C.primary, C.primary2]} style={s.authBtn}><Text style={s.authBtnText}>{isRTL ? '✅ حفظ' : '✅ Save'}</Text></LinearGradient>
          </TouchableOpacity>
          <LangToggle />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={[s.container, { backgroundColor: C.bg }]} contentContainerStyle={s.authContainer}>
      <View style={[s.authCard, { backgroundColor: C.bg2, borderColor: C.border }]}>
        <Text style={s.authIcon}>{mode === 'login' ? '👋' : '🎉'}</Text>
        <Text style={[s.authTitle, { color: C.text }, isRTL && s.rtlText]}>{mode === 'login' ? t('welcomeBack') : t('createAccount')}</Text>
        {mode === 'login' && <Text style={[s.authSub, { color: C.textMuted }, isRTL && s.rtlText]}>{t('welcomeBackSub')}</Text>}
        {mode === 'login' && <View style={[s.demoBox, { borderColor: 'rgba(124,58,237,0.25)' }]}><Text style={[s.demoText, { color: C.accent }, isRTL && s.rtlText]}>{t('demoText')}</Text></View>}
        {!!error && <View style={s.errorBox}><Text style={[s.errorText, isRTL && s.rtlText]}>{error}</Text></View>}

        {mode === 'register' && (
          <>
            <Text style={[s.inputLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('fullName')}</Text>
            <TextInput style={[s.textInput, { backgroundColor: C.bg3, borderColor: C.border, color: C.text }, isRTL && { textAlign: 'right' }]} placeholder={t('fullName')} placeholderTextColor={C.textMuted} value={name} onChangeText={setName} />
            <Text style={[s.inputLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('username')}</Text>
            <TextInput style={[s.textInput, { backgroundColor: C.bg3, borderColor: C.border, color: C.text }, isRTL && { textAlign: 'right' }]} placeholder={t('username')} placeholderTextColor={C.textMuted} value={username} onChangeText={setUsername} autoCapitalize="none" />
          </>
        )}

        <Text style={[s.inputLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('emailOrUsername')}</Text>
        <TextInput style={[s.textInput, { backgroundColor: C.bg3, borderColor: C.border, color: C.text }, isRTL && { textAlign: 'right' }]} placeholder={t('emailOrUsername')} placeholderTextColor={C.textMuted} value={email} onChangeText={setEmail} autoCapitalize="none" />
        <Text style={[s.inputLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('password')}</Text>
        <TextInput style={[s.textInput, { backgroundColor: C.bg3, borderColor: C.border, color: C.text }, isRTL && { textAlign: 'right' }]} placeholder={t('password')} placeholderTextColor={C.textMuted} value={password} onChangeText={setPassword} secureTextEntry />

        {mode === 'register' && (
          <>
            <Text style={[s.inputLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('confirmPassword')}</Text>
            <TextInput style={[s.textInput, { backgroundColor: C.bg3, borderColor: C.border, color: C.text }, isRTL && { textAlign: 'right' }]} placeholder={t('confirmPassword')} placeholderTextColor={C.textMuted} value={confirmPass} onChangeText={setConfirmPass} secureTextEntry />
          </>
        )}

        {mode === 'login' && (
          <TouchableOpacity onPress={() => { setMode('forgot'); reset(); }} style={[s.forgotLink, isRTL && { alignSelf: 'flex-start' }]}>
            <Text style={[s.forgotLinkText, { color: C.accent }]}>{t('forgotPassword')}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={mode === 'login' ? handleLogin : handleRegister}>
          <LinearGradient colors={[C.primary, C.primary2]} style={s.authBtn}>
            <Text style={s.authBtnText}>{mode === 'login' ? t('signIn') : t('createAccount')}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <LangToggle />

        <TouchableOpacity style={s.switchLink} onPress={() => { setMode(mode === 'login' ? 'register' : 'login'); reset(); }}>
          <Text style={[s.switchText, { color: C.textMuted }]}>
            {mode === 'login' ? t('noAccount') : t('haveAccount')}
            <Text style={{ color: C.accent }}>{mode === 'login' ? t('signUpLink') : t('signInLink')}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ─── TRANSACTIONS ─────────────────────────────────────────────────────────────
export function TransactionsScreen({ navigation }) {
  const { transactions, isRTL, t, currentUser, colors: C } = useApp();
  if (!currentUser) return <GuestGate navigation={navigation} />;

  if (transactions.length === 0) {
    return (
      <View style={[s.centerWrap, { backgroundColor: C.bg }]}>
        <Text style={s.gateIcon}>💳</Text>
        <Text style={[s.gateTitle, { color: C.text }, isRTL && s.rtlText]}>{t('noTransactionsYet')}</Text>
        <Text style={[s.gateSub, { color: C.textMuted }, isRTL && s.rtlText]}>{t('noTransactionsSub')}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[s.container, { backgroundColor: C.bg }]} contentContainerStyle={{ padding: 14 }}>
      {transactions.map((tr, i) => (
        <View key={i} style={[s.transItem, { backgroundColor: C.bg2, borderColor: C.border }, isRTL && s.rowRev]}>
          <View style={[s.transIcon, { backgroundColor: tr.bg }]}><Text style={{ fontSize: 17 }}>{tr.icon}</Text></View>
          <View style={s.transInfo}>
            <Text style={[s.transName, { color: C.textSub }, isRTL && s.rtlText]}>{tr.name}</Text>
            <Text style={[s.transDate, { color: C.textMuted }, isRTL && s.rtlText]}>{tr.date}</Text>
          </View>
          <Text style={[s.transAmount, { color: tr.color }]}>{tr.amount}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

// ─── INVOICE ──────────────────────────────────────────────────────────────────
export function InvoiceScreen({ navigation }) {
  const { t, isRTL, currentUser, colors: C, invoices } = useApp();
  if (!currentUser) return <GuestGate navigation={navigation} />;

  if (!invoices || invoices.length === 0) {
    return (
      <View style={[s.centerWrap, { backgroundColor: C.bg }]}>
        <Text style={s.gateIcon}>📄</Text>
        <Text style={[s.gateTitle, { color: C.text }, isRTL && s.rtlText]}>{t('noInvoicesYet')}</Text>
        <Text style={[s.gateSub, { color: C.textMuted }, isRTL && s.rtlText]}>{t('noInvoicesSub')}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[s.container, { backgroundColor: C.bg }]} contentContainerStyle={{ padding: 14 }}>
      {invoices.map((inv, idx) => (
        <View key={idx} style={[s.invCard, { backgroundColor: C.bg2, borderColor: C.border, marginBottom: 14 }]}>
          <View style={[s.invTop, isRTL && s.rowRev]}>
            <View>
              <Text style={[s.invTitle, { color: C.text }, isRTL && s.rtlText]}>{inv.id}</Text>
              <Text style={[s.invSub, { color: C.textMuted }, isRTL && s.rtlText]}>{inv.date}</Text>
            </View>
            <View style={[s.badge, { backgroundColor: 'rgba(52,211,153,0.15)' }]}>
              <Text style={[s.badgeText, { color: '#34d399' }]}>{isRTL ? 'مدفوعة' : 'PAID'}</Text>
            </View>
          </View>
          <Text style={[s.invBillLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{isRTL ? 'فاتورة إلى:' : 'Bill To:'}</Text>
          <Text style={[s.invBillTo, { color: C.textSub }, isRTL && s.rtlText]}>{currentUser.name}</Text>
          {inv.items?.map((item, i) => (
            <View key={i} style={[s.invRow, { borderBottomColor: C.border }, isRTL && s.rowRev]}>
              <Text style={[s.invK, { color: C.textMuted }]}>{item.name}</Text>
              <Text style={[s.invV, { color: C.textSub }]}>{item.amount}</Text>
            </View>
          ))}
          <View style={[s.invTotalRow, isRTL && s.rowRev]}>
            <Text style={[s.invTotalLabel, { color: C.text }]}>{t('total')}</Text>
            <Text style={[s.invTotalValue, { color: C.accent }]}>{inv.amount}</Text>
          </View>
          <TouchableOpacity>
            <LinearGradient colors={[C.primary, C.primary2]} style={s.confirmBtn}>
              <Text style={s.confirmBtnText}>{isRTL ? '📥 تحميل PDF' : '📥 Download PDF'}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
export function SettingsScreen() {
  const { currentUser, logout, t, isRTL, toggleLanguage, language, colors: C, isDark, toggleDarkMode, currency, setCurrency, currencies, changePassword } = useApp();
  const [toggles, setToggles] = useState({ push: true, email: true, sms: false, twofa: false });
  const toggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [showChangePw, setShowChangePw] = useState(false);
  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwError, setPwError] = useState('');

  const handleChangePw = () => {
    setPwError('');
    if (!oldPw || !newPw || !confirmPw) { setPwError(t('fillAllFields')); return; }
    if (newPw.length < 6) { setPwError(isRTL ? 'كلمة المرور 6 أحرف على الأقل' : 'Min 6 characters'); return; }
    if (newPw !== confirmPw) { setPwError(t('passwordsNotMatch')); return; }
    const result = changePassword(oldPw, newPw);
    if (result.success) { showModal({ type:'success', title: t('passwordChanged'), message: isRTL ? 'تم تغيير كلمة المرور بنجاح' : 'Your password has been changed successfully.' }); setOldPw(''); setNewPw(''); setConfirmPw(''); setShowChangePw(false); }
    else setPwError(result.error);
  };

  const ToggleRow = ({ icon, label, value, onToggle, last }) => (
    <View style={[s.settingRow, { borderBottomColor: C.border, borderBottomWidth: last ? 0 : 1 }, isRTL && s.rowRev]}>
      <Text style={s.settingIcon}>{icon}</Text>
      <Text style={[s.settingLabel, { color: C.textSub }, isRTL && s.rtlText]}>{label}</Text>
      <TouchableOpacity style={[s.toggle, { backgroundColor: value ? C.primary : C.border }]} onPress={onToggle}>
        <View style={[s.toggleThumb, value && s.toggleThumbOn]} />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={[s.container, { backgroundColor: C.bg }]} contentContainerStyle={{ padding: 14 }}>

      {currentUser && (
        <>
          <Text style={[s.groupLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('accountSection')}</Text>
          <View style={[s.settingGroup, { backgroundColor: C.bg2, borderColor: C.border }]}>
            <View style={[s.settingRow, { borderBottomColor: C.border }, isRTL && s.rowRev]}>
              <Text style={s.settingIcon}>👤</Text>
              <Text style={[s.settingLabel, { color: C.textSub }, isRTL && s.rtlText]}>{t('profile')}: <Text style={{ color: C.accent }}>{currentUser.username}</Text></Text>
            </View>
            <View style={[s.settingRow, { borderBottomWidth: 0 }, isRTL && s.rowRev]}>
              <Text style={s.settingIcon}>💰</Text>
              <Text style={[s.settingLabel, { color: C.textSub }, isRTL && s.rtlText]}>{t('balance')}</Text>
              <Text style={[s.settingRight, { color: C.accent }]}>${currentUser.wallet.toFixed(2)}</Text>
            </View>
          </View>
        </>
      )}

      <Text style={[s.groupLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('language')}</Text>
      <View style={[s.settingGroup, { backgroundColor: C.bg2, borderColor: C.border }]}>
        <TouchableOpacity style={[s.settingRow, { borderBottomWidth: 0 }, isRTL && s.rowRev]} onPress={toggleLanguage}>
          <Text style={s.settingIcon}>🌐</Text>
          <View style={{ flex: 1, marginLeft: isRTL ? 0 : 8, marginRight: isRTL ? 8 : 0 }}>
            <Text style={[s.settingLabel, { color: C.textSub, marginLeft: 0 }, isRTL && s.rtlText]}>{t('language')}</Text>
            <Text style={[{ fontSize: 10, color: C.textMuted }, isRTL && s.rtlText]}>{t('switchLanguage')}</Text>
          </View>
          <View style={[s.langBadge, { borderColor: 'rgba(124,58,237,0.3)', backgroundColor: 'rgba(124,58,237,0.1)' }]}>
            <Text style={[s.langBadgeText, { color: C.accent }]}>{language === 'ar' ? '🇸🇦 AR' : '🇺🇸 EN'}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={[s.groupLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('appearance')}</Text>
      <View style={[s.settingGroup, { backgroundColor: C.bg2, borderColor: C.border }]}>
        <ToggleRow icon={isDark ? '🌙' : '☀️'} label={isDark ? t('darkMode') : t('lightMode')} value={isDark} onToggle={toggleDarkMode} />
        <TouchableOpacity style={[s.settingRow, { borderBottomWidth: 0 }, isRTL && s.rowRev]} onPress={() => setShowCurrencyModal(true)}>
          <Text style={s.settingIcon}>💱</Text>
          <Text style={[s.settingLabel, { color: C.textSub }, isRTL && s.rtlText]}>{t('currency')}</Text>
          <View style={[s.currencyPill, { backgroundColor: 'rgba(124,58,237,0.15)' }]}>
            <Text style={[s.currencyPillText, { color: C.accent }]}>{currency?.flag} {currency?.code}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={[s.groupLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('notifications')}</Text>
      <View style={[s.settingGroup, { backgroundColor: C.bg2, borderColor: C.border }]}>
        <ToggleRow icon="🔔" label={t('pushNotifications')} value={toggles.push} onToggle={() => toggle('push')} />
        <ToggleRow icon="📧" label={t('emailAlerts')} value={toggles.email} onToggle={() => toggle('email')} />
        <ToggleRow icon="📱" label={t('smsAlerts')} value={toggles.sms} onToggle={() => toggle('sms')} last />
      </View>

      <Text style={[s.groupLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('security')}</Text>
      <View style={[s.settingGroup, { backgroundColor: C.bg2, borderColor: C.border }]}>
        <ToggleRow icon="🔒" label={t('twoFactorAuth')} value={toggles.twofa} onToggle={() => toggle('twofa')} />
        {currentUser && (
          <TouchableOpacity style={[s.settingRow, { borderBottomWidth: 0 }, isRTL && s.rowRev]} onPress={() => setShowChangePw(!showChangePw)}>
            <Text style={s.settingIcon}>🔑</Text>
            <Text style={[s.settingLabel, { color: C.textSub }, isRTL && s.rtlText]}>{t('changePassword')}</Text>
            <Text style={[s.settingRight, { color: C.textMuted }]}>{showChangePw ? '▲' : (isRTL ? '‹' : '›')}</Text>
          </TouchableOpacity>
        )}
      </View>

      {showChangePw && currentUser && (
        <View style={[s.settingGroup, { backgroundColor: C.bg2, borderColor: C.border, padding: 14, marginBottom: 4 }]}>
          {!!pwError && <View style={s.errorBox}><Text style={[s.errorText, isRTL && s.rtlText]}>{pwError}</Text></View>}
          <Text style={[s.inputLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('oldPassword')}</Text>
          <TextInput style={[s.textInput, { backgroundColor: C.bg3, borderColor: C.border, color: C.text }, isRTL && { textAlign: 'right' }]} placeholder={t('oldPassword')} placeholderTextColor={C.textMuted} value={oldPw} onChangeText={setOldPw} secureTextEntry />
          <Text style={[s.inputLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('newPassword')}</Text>
          <TextInput style={[s.textInput, { backgroundColor: C.bg3, borderColor: C.border, color: C.text }, isRTL && { textAlign: 'right' }]} placeholder={t('newPassword')} placeholderTextColor={C.textMuted} value={newPw} onChangeText={setNewPw} secureTextEntry />
          <Text style={[s.inputLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('confirmNewPassword')}</Text>
          <TextInput style={[s.textInput, { backgroundColor: C.bg3, borderColor: C.border, color: C.text, marginBottom: 12 }, isRTL && { textAlign: 'right' }]} placeholder={t('confirmNewPassword')} placeholderTextColor={C.textMuted} value={confirmPw} onChangeText={setConfirmPw} secureTextEntry />
          <TouchableOpacity onPress={handleChangePw}>
            <LinearGradient colors={[C.primary, C.primary2]} style={s.confirmBtn}><Text style={s.confirmBtnText}>{t('save')}</Text></LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      {currentUser && (
        <TouchableOpacity onPress={() => { logout(); showModal({ type:'info', title: t('loggedOut'), message: isRTL ? 'تم تسجيل الخروج بنجاح' : 'You have been signed out.' }); }}>
          <View style={[s.settingGroup, { marginTop: 8, backgroundColor: 'rgba(248,113,113,0.08)', borderColor: 'rgba(248,113,113,0.2)' }]}>
            <View style={[s.settingRow, { borderBottomWidth: 0 }, isRTL && s.rowRev]}>
              <Text style={s.settingIcon}>🚪</Text>
              <Text style={[s.settingLabel, { color: '#f87171' }, isRTL && s.rtlText]}>{t('logout')}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      <View style={{ height: 16 }} />

      <Modal visible={showCurrencyModal} transparent animationType="slide" onRequestClose={() => setShowCurrencyModal(false)}>
        <TouchableOpacity style={s.modalOverlay} activeOpacity={1} onPress={() => setShowCurrencyModal(false)}>
          <TouchableOpacity activeOpacity={1} style={[s.modalBox, { backgroundColor: C.bg2 }]}>
            <View style={[s.modalHandle, { backgroundColor: C.border }]} />
            <Text style={[s.modalTitle, { color: C.text }, isRTL && s.rtlText]}>{t('selectCurrency')}</Text>
            <FlatList
              data={currencies}
              keyExtractor={item => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[s.currencyRow, { borderBottomColor: C.border }, currency?.code === item.code && { backgroundColor: 'rgba(124,58,237,0.08)' }, isRTL && s.rowRev]}
                  onPress={() => { setCurrency(item); setShowCurrencyModal(false); }}
                >
                  <Text style={s.currencyFlag}>{item.flag}</Text>
                  <View style={{ flex: 1, marginLeft: isRTL ? 0 : 10, marginRight: isRTL ? 10 : 0 }}>
                    <Text style={[s.currencyName, { color: C.text }, isRTL && s.rtlText]}>{isRTL ? item.nameAr : item.name}</Text>
                    <Text style={[s.currencyCode, { color: C.textMuted }]}>{item.code} · {item.symbol}</Text>
                  </View>
                  {currency?.code === item.code && <Text style={{ color: C.accent, fontSize: 18, fontWeight: '800' }}>✓</Text>}
                </TouchableOpacity>
              )}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}

// ─── WISHLIST SCREEN ──────────────────────────────────────────────────────────
export function WishlistScreen({ navigation }) {
  const { wishlist, toggleWishlist, t, isRTL, colors: C, currentUser } = useApp();
  const { PRODUCTS } = require('../data/index.js');
  if (!currentUser) return <GuestGate navigation={navigation} />;
  const items = PRODUCTS.filter(p => wishlist.includes(p.id));
  return (
    <ScrollView style={[s.container, { backgroundColor: C.bg }]}>
      {items.length === 0 ? (
        <View style={[s.centerWrap, { backgroundColor: C.bg }]}>
          <Text style={{ fontSize: 56, marginBottom: 16 }}>🤍</Text>
          <Text style={[s.gateTitle, { color: C.text }]}>{t('wishlistEmpty')}</Text>
          <Text style={[s.gateSub, { color: C.textMuted }]}>{t('wishlistEmptySub')}</Text>
          <TouchableOpacity style={s.fullWidth} onPress={() => navigation.navigate('Products')}>
            <LinearGradient colors={['#7c3aed','#a855f7']} style={s.actionBtn}>
              <Text style={s.actionBtnText}>{t('products')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ padding: 14, gap: 10 }}>
          {items.map(p => (
            <TouchableOpacity key={p.id} style={[s.menuItem, { backgroundColor: C.bg2, borderColor: C.border }]}
              onPress={() => navigation.navigate('Home', { screen: 'ProductDetail', params: { product: p } })}>
              <View style={[s.menuIcon, { backgroundColor: `${C.primary}22` }]}><Text style={{ fontSize: 20 }}>🎁</Text></View>
              <View style={[s.menuText, isRTL && { marginRight: 12, marginLeft: 0 }]}>
                <Text style={[s.menuTitle, { color: C.text }, isRTL && s.rtlText]}>{p.name}</Text>
                <Text style={[s.menuSub, { color: C.accent }]}>{t('from')} ${p.pkgs[0].p}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleWishlist(p.id)} style={{ padding: 8 }}>
                <Text style={{ fontSize: 22 }}>❤️</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

// ─── POINTS SCREEN ────────────────────────────────────────────────────────────
export function PointsScreen({ navigation }) {
  const { pointsData, t, isRTL, colors: C, currentUser } = useApp();
  if (!currentUser) return <GuestGate navigation={navigation} />;
  const { balance, history } = pointsData;
  return (
    <ScrollView style={[s.container, { backgroundColor: C.bg }]}>
      <LinearGradient colors={['#4c1d95','#7c3aed','#a855f7']} style={[s.walletCard, { margin: 14 }]}>
        <Text style={[s.walLabel, isRTL && s.rtlText]}>{t('pointsBalance')}</Text>
        <Text style={s.walBalance}>{balance.toLocaleString()}</Text>
        <Text style={[s.walUser, isRTL && s.rtlText]}>{t('pointsInfo')}</Text>
        <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>≈ ${(balance / 1000).toFixed(2)}</Text>
      </LinearGradient>
      <View style={{ paddingHorizontal: 14 }}>
        <Text style={[s.groupLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('pointsHistory')}</Text>
        {history.length === 0 ? (
          <View style={[s.settingGroup, { backgroundColor: C.bg2, borderColor: C.border, padding: 24, alignItems: 'center' }]}>
            <Text style={{ fontSize: 40, marginBottom: 8 }}>⭐</Text>
            <Text style={[{ fontSize: 13, color: C.textMuted }, isRTL && s.rtlText]}>{t('noPointsYet')}</Text>
          </View>
        ) : history.map((h, i) => (
          <View key={h.id || i} style={[s.transItem, { backgroundColor: C.bg2, borderColor: C.border }]}>
            <View style={[s.transIcon, { backgroundColor: h.type === 'earn' || h.type === 'bonus' ? 'rgba(52,211,153,0.15)' : 'rgba(248,113,113,0.15)' }]}>
              <Text style={{ fontSize: 18 }}>{h.type === 'earn' ? '⭐' : h.type === 'bonus' ? '🎁' : '🔄'}</Text>
            </View>
            <View style={[s.transInfo, isRTL && { marginRight: 10, marginLeft: 0 }]}>
              <Text style={[s.transName, { color: C.text }, isRTL && s.rtlText]}>{h.description?.[isRTL ? 'ar' : 'en'] || ''}</Text>
              <Text style={[s.transDate, { color: C.textMuted }]}>{h.date}</Text>
            </View>
            <Text style={[s.transAmount, { color: h.amount > 0 ? '#34d399' : '#f87171' }]}>{h.amount > 0 ? '+' : ''}{h.amount} pts</Text>
          </View>
        ))}
      </View>
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

// ─── REFERRAL SCREEN ─────────────────────────────────────────────────────────
export function ReferralScreen({ navigation }) {
  const { referralData, shareReferralCode, changeReferralCode, t, isRTL, colors: C, currentUser } = useApp();
  const [showChangeCode, setShowChangeCode] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [codeError, setCodeError] = useState('');
  if (!currentUser) return <GuestGate navigation={navigation} />;
  const { code, referred, totalEarnings, codeChanged } = referralData || {};

  const handleChangeCode = () => {
    setCodeError('');
    if (newCode.trim().length < 4) { setCodeError(isRTL ? 'الكود 4 أحرف على الأقل' : 'Min 4 characters'); return; }
    const result = changeReferralCode(newCode);
    if (result.success) { setShowChangeCode(false); setNewCode(''); }
    else if (result.error === 'exists') setCodeError(isRTL ? 'هذا الكود مستخدم' : 'Code already taken');
    else if (result.error === 'invalid_length') setCodeError(isRTL ? 'الكود بين 4-12 حرف' : '4-12 characters');
    else setCodeError(isRTL ? 'حدث خطأ' : 'Error occurred');
  };

  return (
    <ScrollView style={[s.container, { backgroundColor: C.bg }]}>
      <LinearGradient colors={['#92400e','#d97706','#fbbf24']} style={[s.walletCard, { margin: 14 }]}>
        <Text style={[s.walLabel, isRTL && s.rtlText]}>{t('referralCode')}</Text>
        <Text style={[s.walBalance, { letterSpacing: 4, fontSize: 28 }]}>{code}</Text>
        <Text style={[s.walUser, isRTL && s.rtlText]}>{t('referralInfo')}</Text>
      </LinearGradient>
      <View style={{ paddingHorizontal: 14, gap: 10 }}>
        <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', gap: 10 }}>
          <View style={[s.statCard, { backgroundColor: C.bg2, borderColor: C.border }]}>
            <Text style={[s.statLabel, { color: C.textMuted }]}>{t('referredUsers')}</Text>
            <Text style={[s.statValue, { color: C.accent }]}>{referred?.length || 0}</Text>
          </View>
          <View style={[s.statCard, { backgroundColor: C.bg2, borderColor: C.border }]}>
            <Text style={[s.statLabel, { color: C.textMuted }]}>{t('referralEarnings')}</Text>
            <Text style={[s.statValue, { color: '#34d399' }]}>{totalEarnings || 0} pts</Text>
          </View>
        </View>
        <TouchableOpacity onPress={shareReferralCode}>
          <LinearGradient colors={['#7c3aed','#a855f7']} style={s.actionBtn}>
            <Text style={s.actionBtnText}>🔗 {t('shareCode')}</Text>
          </LinearGradient>
        </TouchableOpacity>
        {!codeChanged ? (
          showChangeCode ? (
            <View style={[s.settingGroup, { backgroundColor: C.bg2, borderColor: C.border, padding: 14 }]}>
              <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', gap: 8, backgroundColor: 'rgba(251,191,36,0.1)', borderRadius: 10, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(251,191,36,0.3)' }}>
                <Text style={{ fontSize: 16 }}>⚠️</Text>
                <Text style={[{ fontSize: 12, color: C.accent, flex: 1, lineHeight: 18 }, isRTL && s.rtlText]}>
                  {isRTL ? 'تحذير: يمكنك تغيير الكود مرة واحدة فقط.' : 'Warning: You can only change your code once.'}
                </Text>
              </View>
              <Text style={[s.inputLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{isRTL ? 'الكود الجديد (4-12 حرف)' : 'New code (4-12 chars)'}</Text>
              <TextInput style={[s.textInput, { backgroundColor: C.bg3, borderColor: codeError ? '#f87171' : C.border, color: C.text }, isRTL && { textAlign: 'right' }]}
                placeholder={isRTL ? 'أدخل كودك المخصص' : 'Enter your custom code'} placeholderTextColor={C.textMuted}
                value={newCode} onChangeText={v => { setNewCode(v.toUpperCase().replace(/[^A-Z0-9]/g, '')); setCodeError(''); }}
                autoCapitalize="characters" maxLength={12} />
              {!!codeError && <Text style={[{ fontSize: 11, color: '#f87171', marginBottom: 8 }, isRTL && s.rtlText]}>{codeError}</Text>}
              <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', gap: 8 }}>
                <TouchableOpacity style={{ flex: 1 }} onPress={handleChangeCode}>
                  <LinearGradient colors={['#d97706','#f59e0b']} style={[s.actionBtn, { paddingVertical: 12 }]}>
                    <Text style={s.actionBtnText}>{isRTL ? 'تأكيد التغيير' : 'Confirm Change'}</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, borderWidth: 1, borderColor: C.border, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingVertical: 12 }}
                  onPress={() => { setShowChangeCode(false); setNewCode(''); setCodeError(''); }}>
                  <Text style={{ color: C.textMuted, fontWeight: '700', fontSize: 14 }}>{t('cancel')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity style={[s.settingGroup, { backgroundColor: C.bg2, borderColor: C.border }]} onPress={() => setShowChangeCode(true)}>
              <View style={[s.settingRow, { borderBottomWidth: 0 }, isRTL && s.rowRev]}>
                <Text style={s.settingIcon}>✏️</Text>
                <Text style={[s.settingLabel, { color: C.textSub }, isRTL && s.rtlText]}>{isRTL ? 'تغيير كود الإحالة (مرة واحدة)' : 'Change referral code (once only)'}</Text>
                <Text style={[s.settingRight, { color: C.textMuted }]}>{isRTL ? '‹' : '›'}</Text>
              </View>
            </TouchableOpacity>
          )
        ) : (
          <View style={[s.settingGroup, { backgroundColor: 'rgba(52,211,153,0.08)', borderColor: 'rgba(52,211,153,0.2)', padding: 12 }]}>
            <Text style={{ fontSize: 12, color: '#34d399', textAlign: 'center' }}>✓ {isRTL ? 'تم تغيير الكود — لا يمكن تغييره مرة أخرى' : 'Code changed — cannot be changed again'}</Text>
          </View>
        )}
        <Text style={[s.groupLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('referredUsers')}</Text>
        {(!referred || referred.length === 0) ? (
          <View style={[s.settingGroup, { backgroundColor: C.bg2, borderColor: C.border, padding: 24, alignItems: 'center' }]}>
            <Text style={{ fontSize: 40, marginBottom: 8 }}>👥</Text>
            <Text style={[{ fontSize: 13, color: C.textMuted }, isRTL && s.rtlText]}>{t('noReferrals')}</Text>
          </View>
        ) : referred.map((r, i) => (
          <View key={i} style={[s.menuItem, { backgroundColor: C.bg2, borderColor: C.border }]}>
            <View style={[s.menuIcon, { backgroundColor: 'rgba(52,211,153,0.15)' }]}><Text style={{ fontSize: 20 }}>👤</Text></View>
            <View style={[s.menuText, isRTL && { marginRight: 12, marginLeft: 0 }]}>
              <Text style={[s.menuTitle, { color: C.text }, isRTL && s.rtlText]}>{r.name}</Text>
              <Text style={[s.menuSub, { color: C.textMuted }]}>{r.date}</Text>
            </View>
            <Text style={{ color: '#34d399', fontWeight: '800' }}>+{r.earned} pts</Text>
          </View>
        ))}
      </View>
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

// ─── SUPPORT SCREEN ───────────────────────────────────────────────────────────

// شاشة التفاصيل — component منفصل لضمان تحديث الـ state
function TicketDetailView({ ticketId, onBack, isRTL, colors: C, t, tickets, addTicketReply, closeTicket, currentUser }) {
  const [replyText, setReplyText] = React.useState('');

  // قراءة التذكرة مباشرة من tickets في كل render
  const ticket = tickets.find(tk => tk.id === ticketId);

  if (!ticket) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: C.textMuted }}>{'...'}</Text>
      </View>
    );
  }

  const statusColor = st => st === 'open' ? '#fbbf24' : st === 'in-progress' ? '#60a5fa' : '#34d399';
  const statusLabel = st => st === 'open'
    ? (isRTL ? 'مفتوح' : 'Open')
    : st === 'in-progress'
      ? (isRTL ? 'جاري' : 'In Progress')
      : (isRTL ? 'مغلوق' : 'Closed');

  const isClosed = ticket.status === 'closed';

  const handleSend = () => {
    if (!replyText.trim()) return;
    addTicketReply(ticketId, replyText.trim());
    setReplyText('');
  };

  const handleClose = () => {
    showModal({
      type: 'confirm', icon: 'lock',
      title: isRTL ? 'إغلاق التذكرة' : 'Close Ticket',
      message: isRTL ? 'هل تريد إغلاق هذه التذكرة؟ لن تتمكن من إعادة فتحها.' : 'Close this ticket? You cannot reopen it.',
      buttons: [
        { text: isRTL ? 'إلغاء' : 'Cancel', style: 'cancel' },
        { text: isRTL ? 'إغلاق' : 'Close',  style: 'destructive', onPress: () => closeTicket(ticketId) },
      ],
    });
  };

  return (
    <ScrollView style={[s.container, { backgroundColor: C.bg }]} contentContainerStyle={{ padding: 14 }}>
      {/* رأس التذكرة */}
      <View style={[s.settingGroup, { backgroundColor: C.bg2, borderColor: C.border, padding: 14, marginBottom: 10 }]}>
        <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <Text style={[{ fontSize: 15, fontWeight: '800', color: C.text, flex: 1 }, isRTL && s.rtlText]}>{ticket.subject}</Text>
          <View style={{ paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20, backgroundColor: `${statusColor(ticket.status)}22`, marginLeft: 8 }}>
            <Text style={{ fontSize: 10, fontWeight: '800', color: statusColor(ticket.status) }}>{statusLabel(ticket.status)}</Text>
          </View>
        </View>
        <Text style={[{ fontSize: 11, color: C.textMuted }, isRTL && s.rtlText]}>{ticket.category} · {ticket.createdAt}</Text>
        <View style={{ marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: C.border }}>
          <Text style={[{ fontSize: 13, color: C.textSub, lineHeight: 20 }, isRTL && s.rtlText]}>{ticket.message}</Text>
        </View>
      </View>

      {/* الردود */}
      {ticket.replies.map((r, i) => (
        <View key={i} style={[s.settingGroup, {
          backgroundColor: r.from === 'Support' ? `${C.primary}11` : C.bg2,
          borderColor: r.from === 'Support' ? `${C.primary}44` : C.border,
          padding: 12, marginBottom: 8,
        }]}>
          <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <View style={{ width: 28, height: 28, borderRadius: 14,
              backgroundColor: r.from === 'Support' ? `${C.primary}33` : `${C.accent}22`,
              alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 14 }}>{r.from === 'Support' ? '🎯' : '👤'}</Text>
            </View>
            <Text style={[{ fontSize: 11, fontWeight: '800', color: r.from === 'Support' ? C.primary2 : C.textMuted }, isRTL && s.rtlText]}>
              {r.from === 'Support' ? (isRTL ? 'فريق الدعم' : 'Support Team') : r.from}
            </Text>
            <Text style={{ fontSize: 9, color: C.textMuted, marginLeft: 'auto' }}>{r.date}</Text>
          </View>
          <Text style={[{ fontSize: 13, color: C.text, lineHeight: 20 }, isRTL && s.rtlText]}>{r.message}</Text>
        </View>
      ))}

      {/* مربع الرد أو رسالة الإغلاق */}
      {isClosed ? (
        <View style={{ alignItems: 'center', padding: 16, borderRadius: 14, backgroundColor: 'rgba(52,211,153,0.08)', borderWidth: 1, borderColor: 'rgba(52,211,153,0.25)', marginTop: 4 }}>
          <Text style={{ fontSize: 22, marginBottom: 6 }}>🔒</Text>
          <Text style={{ fontSize: 15, color: '#34d399', fontWeight: '800' }}>
            {isRTL ? 'التذكرة مغلقة' : 'Ticket Closed'}
          </Text>
          <Text style={{ fontSize: 12, color: C.textMuted, marginTop: 4, textAlign: 'center' }}>
            {isRTL ? 'يمكنك فتح تذكرة جديدة إذا احتجت مساعدة' : 'You can open a new ticket if you need further help'}
          </Text>
        </View>
      ) : (
        <View style={{ marginTop: 4, gap: 10 }}>
          <TextInput
            style={[s.textInput, { backgroundColor: C.bg2, borderColor: C.border, color: C.text, height: 90, textAlignVertical: 'top' }, isRTL && { textAlign: 'right' }]}
            placeholder={t('replyPlaceholder')}
            placeholderTextColor={C.textMuted}
            value={replyText}
            onChangeText={setReplyText}
            multiline
          />
          <TouchableOpacity onPress={handleSend}>
            <LinearGradient colors={['#7c3aed', '#a855f7']} style={s.actionBtn}>
              <Text style={s.actionBtnText}>{t('addReply')}</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: 'center', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(248,113,113,0.4)', backgroundColor: 'rgba(248,113,113,0.08)' }}
            onPress={handleClose}>
            <Text style={{ fontSize: 13, color: '#f87171', fontWeight: '800' }}>
              🔒 {isRTL ? 'إغلاق التذكرة' : 'Close Ticket'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={{ alignItems: 'center', marginTop: 16, padding: 10 }} onPress={onBack}>
        <Text style={{ color: C.textMuted, fontSize: 13 }}>← {isRTL ? 'رجوع' : 'Back'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export function SupportScreen({ navigation }) {
  const { tickets, showModal, createTicket, addTicketReply, closeTicket, TICKET_CATEGORIES, t, isRTL, colors: C, currentUser } = useApp();
  const [view, setView] = useState('list');           // 'list' | 'new' | 'detail'
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState(TICKET_CATEGORIES[0]);
  const [activeTicketId, setActiveTicketId] = useState(null);

  if (!currentUser) return <GuestGate navigation={navigation} />;

  const statusColor = st => st === 'open' ? '#fbbf24' : st === 'in-progress' ? '#60a5fa' : '#34d399';
  const statusLabel = st => st === 'open'
    ? (isRTL ? 'مفتوح' : 'Open')
    : st === 'in-progress'
      ? (isRTL ? 'جاري' : 'In Progress')
      : (isRTL ? 'مغلوق' : 'Closed');

  // ─── شاشة تفاصيل التذكرة ─────────────────────────────────────────────────
  if (view === 'detail' && activeTicketId) {
    return (
      <TicketDetailView
        ticketId={activeTicketId}
        tickets={tickets}
        onBack={() => { setView('list'); setActiveTicketId(null); }}
        isRTL={isRTL}
        colors={C}
        t={t}
        addTicketReply={addTicketReply}
        closeTicket={closeTicket}
        currentUser={currentUser}
      />
    );
  }

  // ─── شاشة إنشاء تذكرة ────────────────────────────────────────────────────
  if (view === 'new') return (
    <ScrollView style={[s.container, { backgroundColor: C.bg }]} contentContainerStyle={{ padding: 14 }}>
      <Text style={[s.groupLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('ticketCategory')}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {TICKET_CATEGORIES.map(c => (
            <TouchableOpacity key={c} onPress={() => setCategory(c)}
              style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1,
                backgroundColor: category === c ? C.primary : C.bg2,
                borderColor: category === c ? C.primary : C.border }}>
              <Text style={{ fontSize: 12, fontWeight: '700', color: category === c ? '#fff' : C.textMuted }}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Text style={[s.inputLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('ticketSubject')}</Text>
      <TextInput
        style={[s.textInput, { backgroundColor: C.bg2, borderColor: C.border, color: C.text }, isRTL && { textAlign: 'right' }]}
        placeholder={t('ticketSubject')} placeholderTextColor={C.textMuted} value={subject} onChangeText={setSubject} />
      <Text style={[s.inputLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('ticketMessage')}</Text>
      <TextInput
        style={[s.textInput, { backgroundColor: C.bg2, borderColor: C.border, color: C.text, height: 120, textAlignVertical: 'top' }, isRTL && { textAlign: 'right' }]}
        placeholder={t('ticketMessage')} placeholderTextColor={C.textMuted} value={message} onChangeText={setMessage} multiline />
      <TouchableOpacity onPress={() => {
        if (!subject.trim() || !message.trim()) return;
        const r = createTicket(subject.trim(), category, message.trim());
        if (r.success) {
          setSubject(''); setMessage('');
          setView('list');
          showModal({ type:'success', icon:'ticket', title: isRTL ? '✓ تم إرسال تذكرتك' : '✓ Ticket Submitted', message: isRTL ? 'سيتواصل معك فريق الدعم قريباً' : 'Our support team will contact you soon.' });
        }
      }}>
        <LinearGradient colors={['#7c3aed', '#a855f7']} style={s.actionBtn}>
          <Text style={s.actionBtnText}>{t('submitTicket')}</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity style={{ alignItems: 'center', marginTop: 12 }} onPress={() => setView('list')}>
        <Text style={{ color: C.textMuted, fontSize: 13 }}>← {isRTL ? 'رجوع' : 'Back'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  // ─── قائمة التذاكر ────────────────────────────────────────────────────────
  return (
    <ScrollView style={[s.container, { backgroundColor: C.bg }]}>
      <TouchableOpacity style={{ margin: 14 }} onPress={() => setView('new')}>
        <LinearGradient colors={['#7c3aed', '#a855f7']} style={s.actionBtn}>
          <Text style={s.actionBtnText}>+ {t('createTicket')}</Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={{ paddingHorizontal: 14 }}>
        <Text style={[s.groupLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('myTickets')}</Text>
        {tickets.length === 0 ? (
          <View style={[s.settingGroup, { backgroundColor: C.bg2, borderColor: C.border, padding: 24, alignItems: 'center' }]}>
            <Text style={{ fontSize: 40, marginBottom: 8 }}>🎫</Text>
            <Text style={[{ fontSize: 13, color: C.textMuted }, isRTL && s.rtlText]}>{t('noTickets')}</Text>
          </View>
        ) : tickets.map(tk => (
          <TouchableOpacity
            key={tk.id}
            style={[s.menuItem, { backgroundColor: C.bg2, borderColor: C.border }]}
            onPress={() => { setActiveTicketId(tk.id); setView('detail'); }}>
            <View style={[s.menuIcon, { backgroundColor: `${statusColor(tk.status)}22` }]}>
              <Text style={{ fontSize: 18 }}>🎫</Text>
            </View>
            <View style={[s.menuText, isRTL && { marginRight: 12, marginLeft: 0 }]}>
              <Text style={[s.menuTitle, { color: C.text }, isRTL && s.rtlText]} numberOfLines={1}>{tk.subject}</Text>
              <Text style={[s.menuSub, { color: C.textMuted }]}>{tk.category} · {tk.createdAt}</Text>
            </View>
            <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20, backgroundColor: `${statusColor(tk.status)}22` }}>
              <Text style={{ fontSize: 9, fontWeight: '800', color: statusColor(tk.status) }}>{statusLabel(tk.status)}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}


// ─── PAYMENT METHODS SCREEN ───────────────────────────────────────────────────
export function PaymentMethodsScreen({ navigation }) {
  const { paymentMethods, addPaymentMethod, removePaymentMethod, setDefaultPaymentMethod, t, isRTL, colors: C, currentUser } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [cardNum, setCardNum] = useState('');
  const [holder, setHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  if (!currentUser) return <GuestGate navigation={navigation} />;

  const luhnCheck = num => {
    const digits = num.replace(/\D/g, '').split('').reverse().map(Number);
    const sum = digits.reduce((acc, d, i) => { if (i % 2 !== 0) { d *= 2; if (d > 9) d -= 9; } return acc + d; }, 0);
    return sum % 10 === 0;
  };
  const validateExpiry = exp => {
    const [m, y] = exp.split('/');
    if (!m || !y || y.length < 2) return false;
    const month = parseInt(m), year = parseInt('20' + y);
    if (month < 1 || month > 12) return false;
    const now = new Date();
    return new Date(year, month - 1) >= new Date(now.getFullYear(), now.getMonth());
  };
  const getCardBrand = num => {
    if (num.startsWith('4')) return { label: 'Visa', color: '#1a1f71' };
    if (num.startsWith('5')) return { label: 'Mastercard', color: '#eb001b' };
    if (num.startsWith('6')) return { label: 'Mada', color: '#00723f' };
    return null;
  };
  const cardBrand = getCardBrand(cardNum);

  return (
    <ScrollView style={[s.container, { backgroundColor: C.bg }]}>
      <View style={{ padding: 14 }}>
        {paymentMethods.length === 0 && !showAdd && (
          <View style={[s.settingGroup, { backgroundColor: C.bg2, borderColor: C.border, padding: 24, alignItems: 'center', marginBottom: 14 }]}>
            <Text style={{ fontSize: 40, marginBottom: 8 }}>💳</Text>
            <Text style={[s.gateTitle, { color: C.text, fontSize: 15 }]}>{t('noPaymentMethods')}</Text>
            <Text style={[s.gateSub, { color: C.textMuted, fontSize: 12 }]}>{t('noPaymentMethodsSub')}</Text>
          </View>
        )}
        {paymentMethods.map(m => (
          <View key={m.id} style={[s.menuItem, { backgroundColor: C.bg2, borderColor: m.isDefault ? C.primary : C.border }]}>
            <View style={[s.menuIcon, { backgroundColor: 'rgba(124,58,237,0.15)' }]}><Text style={{ fontSize: 20 }}>💳</Text></View>
            <View style={[s.menuText, isRTL && { marginRight: 12, marginLeft: 0 }]}>
              <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', gap: 6 }}>
                <Text style={[s.menuTitle, { color: C.text }, isRTL && s.rtlText]}>{m.last4?.startsWith('4') ? 'Visa' : 'Mastercard'} •••• {m.last4}</Text>
                {m.isDefault && <View style={{ backgroundColor: `${C.primary}22`, paddingHorizontal: 6, paddingVertical: 1, borderRadius: 8 }}><Text style={{ fontSize: 9, color: C.primary2, fontWeight: '800' }}>{t('isDefault')}</Text></View>}
              </View>
              <Text style={[s.menuSub, { color: C.textMuted }]}>{m.holder} · {m.expiry}</Text>
            </View>
            <View style={{ gap: 6, alignItems: 'flex-end' }}>
              {!m.isDefault && <TouchableOpacity onPress={() => setDefaultPaymentMethod(m.id)}><Text style={{ fontSize: 10, color: C.accent, fontWeight: '700' }}>✓ {t('makeDefault')}</Text></TouchableOpacity>}
              <TouchableOpacity onPress={() => removePaymentMethod(m.id)}><Text style={{ fontSize: 10, color: '#f87171', fontWeight: '700' }}>✕</Text></TouchableOpacity>
            </View>
          </View>
        ))}
        {showAdd ? (
          <View style={[s.settingGroup, { backgroundColor: C.bg2, borderColor: C.border, padding: 14 }]}>
            <Text style={[s.inputLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('cardNumber')}</Text>
            <View style={{ position: 'relative' }}>
              <TextInput style={[s.textInput, { backgroundColor: C.bg3, borderColor: C.border, color: C.text, paddingRight: cardBrand ? 80 : 14 }, isRTL && { textAlign: 'right' }]}
                placeholder="1234 5678 9012 3456" placeholderTextColor={C.textMuted}
                value={cardNum.replace(/(.{4})/g, '$1 ').trim()}
                onChangeText={v => setCardNum(v.replace(/\s/g, '').slice(0, 16))}
                keyboardType="numeric" maxLength={19} />
              {cardBrand && (
                <View style={{ position: 'absolute', right: 10, top: 12, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Text style={{ fontSize: 11, fontWeight: '800', color: cardBrand.color }}>{cardBrand.label}</Text>
                </View>
              )}
            </View>
            <Text style={[s.inputLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('cardHolder')}</Text>
            <TextInput style={[s.textInput, { backgroundColor: C.bg3, borderColor: C.border, color: C.text }, isRTL && { textAlign: 'right' }]}
              placeholder={t('cardHolder')} placeholderTextColor={C.textMuted} value={holder} onChangeText={setHolder} />
            <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={[s.inputLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('expiryDate')}</Text>
                <TextInput style={[s.textInput, { backgroundColor: C.bg3, borderColor: C.border, color: C.text }, isRTL && { textAlign: 'right' }]}
                  placeholder="MM/YY" placeholderTextColor={C.textMuted} value={expiry} onChangeText={setExpiry} maxLength={5} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[s.inputLabel, { color: C.textMuted }, isRTL && s.rtlText]}>{t('cvv')}</Text>
                <TextInput style={[s.textInput, { backgroundColor: C.bg3, borderColor: C.border, color: C.text }, isRTL && { textAlign: 'right' }]}
                  placeholder="CVV" placeholderTextColor={C.textMuted} value={cvv} onChangeText={setCvv} keyboardType="numeric" maxLength={4} secureTextEntry />
              </View>
            </View>
            <TouchableOpacity onPress={() => {
              const cleanNum = cardNum.replace(/\s/g, '');
              if (cleanNum.length < 16) { showModal({ type:'error', title: isRTL ? 'خطأ' : 'Error', message: isRTL ? 'رقم البطاقة يجب أن يكون 16 رقماً' : 'Card number must be 16 digits.' }); return; return; }
              if (!luhnCheck(cleanNum)) { showModal({ type:'error', title: isRTL ? 'بطاقة غير صالحة' : 'Invalid Card', message: isRTL ? 'تحقق من رقم البطاقة وأعد المحاولة' : 'Please verify the card number and try again.' }); return; return; }
              if (!holder.trim()) { showModal({ type:'error', title: isRTL ? 'خطأ' : 'Error', message: isRTL ? 'أدخل اسم حامل البطاقة' : 'Please enter the card holder name.' }); return; return; }
              if (!validateExpiry(expiry)) { showModal({ type:'error', title: isRTL ? 'تاريخ غير صالح' : 'Invalid Date', message: isRTL ? 'تاريخ الانتهاء غير صحيح أو منتهي' : 'Expiry date is invalid or has expired.' }); return; return; }
              if (cvv.length < 3) { showModal({ type:'error', title: isRTL ? 'خطأ' : 'Error', message: isRTL ? 'رمز CVV يجب أن يكون 3 أو 4 أرقام' : 'CVV must be 3 or 4 digits.' }); return; return; }
              addPaymentMethod({ type: 'card', last4: cleanNum.slice(-4), holder: holder.trim(), expiry, brand: cleanNum.startsWith('4') ? 'visa' : cleanNum.startsWith('5') ? 'mc' : 'mada' });
              setCardNum(''); setHolder(''); setExpiry(''); setCvv(''); setShowAdd(false);
              showModal({ type:'success', icon:'card', title: isRTL ? '✓ تمت إضافة البطاقة' : '✓ Card Added', message: isRTL ? 'يمكنك الآن استخدام البطاقة في الدفع' : 'You can now use this card for payments.' });
            }}>
              <LinearGradient colors={['#7c3aed','#a855f7']} style={[s.actionBtn, { marginTop: 4 }]}><Text style={s.actionBtnText}>{t('addCard')}</Text></LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center', marginTop: 10 }} onPress={() => setShowAdd(false)}>
              <Text style={{ color: C.textMuted, fontSize: 13 }}>{t('cancel')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setShowAdd(true)}>
            <LinearGradient colors={['#7c3aed','#a855f7']} style={s.actionBtn}><Text style={s.actionBtnText}>+ {t('addCard')}</Text></LinearGradient>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  container: { flex: 1 },
  rtlText: { textAlign: 'right' },
  rowRev: { flexDirection: 'row-reverse' },
  centerWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  gateIcon: { fontSize: 62, marginBottom: 16 },
  gateTitle: { fontSize: 18, fontWeight: '800', marginBottom: 8, textAlign: 'center' },
  gateSub: { fontSize: 13, textAlign: 'center', lineHeight: 20, marginBottom: 28 },
  fullWidth: { width: '100%' },
  actionBtn: { borderRadius: 14, padding: 15, alignItems: 'center' },
  actionBtnText: { fontSize: 15, fontWeight: '800', color: '#fff' },
  authContainer: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  authCard: { borderRadius: 22, padding: 22, borderWidth: 1 },
  authIcon: { fontSize: 48, textAlign: 'center', marginBottom: 8 },
  authTitle: { fontSize: 22, fontWeight: '900', textAlign: 'center', marginBottom: 4 },
  authSub: { fontSize: 13, textAlign: 'center', marginBottom: 16, lineHeight: 18 },
  authBtn: { borderRadius: 13, padding: 15, alignItems: 'center', marginTop: 4, marginBottom: 12 },
  authBtnText: { fontSize: 15, fontWeight: '800', color: '#fff' },
  forgotLink: { alignSelf: 'flex-end', marginBottom: 10 },
  forgotLinkText: { fontSize: 12, fontWeight: '600' },
  backLink: { alignItems: 'center', marginTop: 12 },
  backLinkText: { fontSize: 13, fontWeight: '700' },
  switchLink: { alignItems: 'center' },
  switchText: { fontSize: 12 },
  demoBox: { borderWidth: 1, borderRadius: 10, padding: 11, marginBottom: 14, backgroundColor: 'rgba(124,58,237,0.08)' },
  demoText: { fontSize: 11, lineHeight: 18 },
  errorBox: { backgroundColor: 'rgba(248,113,113,0.15)', borderWidth: 1, borderColor: 'rgba(248,113,113,0.3)', borderRadius: 8, padding: 9, marginBottom: 12 },
  errorText: { fontSize: 11, color: '#f87171' },
  inputLabel: { fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 5 },
  textInput: { borderWidth: 1, borderRadius: 11, padding: 13, fontSize: 14, marginBottom: 12 },
  confirmBtn: { borderRadius: 13, padding: 14, alignItems: 'center', marginTop: 4 },
  confirmBtnText: { fontSize: 14, fontWeight: '800', color: '#fff' },
  langToggleBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(124,58,237,0.08)', borderRadius: 11, padding: 11, marginBottom: 12, marginTop: 4, borderWidth: 1, borderColor: 'rgba(124,58,237,0.2)' },
  langBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderWidth: 1 },
  langBadgeText: { fontSize: 11, fontWeight: '800' },
  otpRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 20, marginTop: 8 },
  otpBox: { width: 46, height: 56, borderRadius: 13, borderWidth: 2, fontSize: 22, fontWeight: '900', textAlign: 'center' },
  profileCard: { margin: 14, borderRadius: 20, padding: 20, overflow: 'hidden' },
  profileCardRow: { flexDirection: 'row', alignItems: 'center' },
  profileAvatarLg: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)' },
  profileAvatarLgText: { fontSize: 22, fontWeight: '800', color: '#fff' },
  profileCardInfo: { flex: 1, marginLeft: 14 },
  profileCardName: { fontSize: 18, fontWeight: '900', color: '#fff', marginBottom: 2 },
  profileCardEmail: { fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 8 },
  profileCardBal: { flexDirection: 'row', alignItems: 'center' },
  profileCardBalLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  profileCardBalValue: { fontSize: 17, fontWeight: '900', color: '#fbbf24' },
  walBubble: { position: 'absolute', borderRadius: 9999, backgroundColor: 'rgba(255,255,255,0.06)' },
  menuItem: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 14, marginHorizontal: 14, marginBottom: 8, borderWidth: 1, gap: 12 },
  menuIcon: { width: 46, height: 46, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  menuText: { flex: 1 },
  menuTitle: { fontSize: 14, fontWeight: '700' },
  menuSub: { fontSize: 11, marginTop: 1 },
  menuArrow: { fontSize: 22 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(248,113,113,0.08)', borderRadius: 14, padding: 14, marginHorizontal: 14, marginTop: 4, borderWidth: 1, borderColor: 'rgba(248,113,113,0.2)', gap: 10 },
  logoutText: { fontSize: 14, fontWeight: '700', color: '#f87171' },
  sectionRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingTop: 12, paddingBottom: 8 },
  sectionTitle: { fontSize: 14, fontWeight: '800' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 10, gap: 8 },
  statCard: { borderRadius: 14, padding: 14, borderWidth: 1, flex: 1, minWidth: '45%' },
  statLabel: { fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  statValue: { fontSize: 22, fontWeight: '900' },
  orderItem: { borderRadius: 14, padding: 13, marginHorizontal: 14, marginBottom: 8, borderWidth: 1 },
  orderTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  orderId: { fontSize: 11, fontWeight: '700' },
  orderName: { fontSize: 13, fontWeight: '700', marginBottom: 4 },
  orderBottom: { flexDirection: 'row', justifyContent: 'space-between' },
  orderCustomer: { fontSize: 10.5 },
  orderAmount: { fontSize: 13, fontWeight: '900' },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 },
  badgeText: { fontSize: 9.5, fontWeight: '700' },
  walletCard: { margin: 14, borderRadius: 22, padding: 24, overflow: 'hidden' },
  walLabel: { fontSize: 9, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 },
  walBalance: { fontSize: 38, fontWeight: '900', color: '#fff', letterSpacing: -1 },
  walUser: { fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2, marginBottom: 8 },
  tabsRow: { flexDirection: 'row', marginHorizontal: 14, marginBottom: 14, borderRadius: 14, borderWidth: 1, overflow: 'hidden', padding: 4, gap: 4 },
  tabBtn: { flex: 1, paddingVertical: 9, borderRadius: 10, alignItems: 'center' },
  tabBtnText: { fontSize: 11, fontWeight: '700' },
  actionBox: { margin: 14, marginTop: 0, borderRadius: 14, padding: 16, borderWidth: 1 },
  actionBoxTitle: { fontSize: 15, fontWeight: '800', marginBottom: 14 },
  quickAmounts: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  quickAmt: { flex: 1, paddingVertical: 9, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  quickAmtText: { fontSize: 12, fontWeight: '700' },
  balanceHint: { flexDirection: 'row', marginBottom: 12 },
  balanceHintText: { fontSize: 11 },
  transItem: { flexDirection: 'row', alignItems: 'center', borderRadius: 13, padding: 12, marginBottom: 8, borderWidth: 1, gap: 10 },
  transIcon: { width: 42, height: 42, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  transInfo: { flex: 1 },
  transName: { fontSize: 13, fontWeight: '600' },
  transDate: { fontSize: 10, marginTop: 1 },
  transAmount: { fontSize: 13.5, fontWeight: '800' },
  invCard: { borderRadius: 15, padding: 17, borderWidth: 1 },
  invTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  invTitle: { fontSize: 14, fontWeight: '800' },
  invSub: { fontSize: 10, marginTop: 2 },
  invBillLabel: { fontSize: 10, marginTop: 10 },
  invBillTo: { fontSize: 13, fontWeight: '700', marginBottom: 10 },
  invRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 7, borderBottomWidth: 1 },
  invK: { fontSize: 12 },
  invV: { fontSize: 12, fontWeight: '700' },
  invTotalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, marginBottom: 12 },
  invTotalLabel: { fontSize: 14, fontWeight: '800' },
  invTotalValue: { fontSize: 16, fontWeight: '900' },
  groupLabel: { fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.8, paddingLeft: 4, paddingTop: 10, paddingBottom: 6 },
  settingGroup: { borderRadius: 14, overflow: 'hidden', borderWidth: 1, marginBottom: 4 },
  settingRow: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1 },
  settingIcon: { fontSize: 16, width: 26 },
  settingLabel: { flex: 1, fontSize: 13, marginLeft: 8 },
  settingRight: { fontSize: 12 },
  toggle: { width: 44, height: 25, borderRadius: 13 },
  toggleThumb: { width: 19, height: 19, borderRadius: 10, backgroundColor: '#fff', position: 'absolute', top: 3, left: 3 },
  toggleThumbOn: { transform: [{ translateX: 19 }] },
  currencyPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  currencyPillText: { fontSize: 12, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modalBox: { borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: 20, paddingBottom: 36, maxHeight: '75%' },
  modalHandle: { width: 40, height: 4, borderRadius: 2, alignSelf: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 17, fontWeight: '800', marginBottom: 16 },
  currencyRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1 },
  currencyFlag: { fontSize: 26 },
  currencyName: { fontSize: 14, fontWeight: '600' },
  currencyCode: { fontSize: 11, marginTop: 1 },
});