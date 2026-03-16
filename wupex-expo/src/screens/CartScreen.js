import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';

export default function CartScreen({ navigation }) {
  const { cart, removeFromCart, checkout, currentUser, t, isRTL, colors: C, currency } = useApp();
  const [ordered, setOrdered] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const vat = subtotal * 0.1;
  const total = subtotal + vat;

  const handleCheckout = () => {
    if (!currentUser) {
      Alert.alert(t('signInRequired'), t('signInToPurchase'), [
        { text: t('cancel'), style: 'cancel' },
        { text: t('signIn'), onPress: () => navigation.getParent()?.navigate('Account') },
      ]);
      return;
    }
    if (currentUser.wallet < total) {
      Alert.alert(t('insufficientBalance'), `${t('walletBalance')}: $${currentUser.wallet.toFixed(2)}`, [
        { text: t('cancel'), style: 'cancel' },
        { text: t('addFunds'), onPress: () => navigation.getParent()?.navigate('Wallet') },
      ]);
      return;
    }
    const result = checkout();
    if (result.success) setOrdered(true);
  };

  const sym = currency?.symbol || '$';

  if (ordered) {
    return (
      <View style={[styles.centerWrap, { backgroundColor: C.bg }]}>
        <Text style={styles.successIcon}>✅</Text>
        <Text style={[styles.successTitle, { color: C.green }]}>{t('orderPlaced')}</Text>
        <Text style={[styles.successSub, { color: C.textMuted }]}>
          {t('orderConfirmed')}{'\n\n'}{t('walletBalance')}: ${currentUser?.wallet.toFixed(2)}
        </Text>
        <TouchableOpacity onPress={() => { setOrdered(false); navigation.getParent()?.navigate('Home'); }} activeOpacity={0.85}>
          <LinearGradient colors={[C.primary, C.primary2]} style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>{t('backToHome')}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  if (cart.length === 0) {
    return (
      <View style={[styles.centerWrap, { backgroundColor: C.bg }]}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={[styles.emptyTitle, { color: C.text }]}>{t('cartEmpty')}</Text>
        <Text style={[styles.emptySub, { color: C.textMuted }]}>{t('cartEmptySub')}</Text>
        <TouchableOpacity
          onPress={() => navigation.getParent()?.navigate('Products')}
          activeOpacity={0.85}
        >
          <LinearGradient colors={[C.primary, C.primary2]} style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>{t('browseProducts')}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: C.bg }]} showsVerticalScrollIndicator={false}>
      {cart.map((item, i) => (
        <View key={i} style={[styles.cartItem, { backgroundColor: C.bg2, borderColor: C.border }, isRTL && { flexDirection: 'row-reverse' }]}>
          <LinearGradient colors={item.colors} style={styles.itemIcon}>
            <Text style={styles.itemIconText}>{item.short}</Text>
          </LinearGradient>
          <View style={styles.itemInfo}>
            <Text style={[styles.itemName, { color: C.textSub }, isRTL && { textAlign: 'right' }]}>{item.name}</Text>
            <Text style={[styles.itemPkg, { color: C.textMuted }, isRTL && { textAlign: 'right' }]}>{item.pkg} × {item.qty}</Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={[styles.itemPrice, { color: C.accent }]}>{sym}{(item.price * item.qty).toFixed(2)}</Text>
            <TouchableOpacity onPress={() => removeFromCart(item.productId, item.pkgIndex)} style={styles.removeBtn}>
              <Text style={styles.removeBtnText}>🗑</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View style={[styles.summary, { backgroundColor: C.bg2, borderColor: C.border }]}>
        {[[t('subtotal'), `${sym}${subtotal.toFixed(2)}`], [t('vat'), `${sym}${vat.toFixed(2)}`]].map(([k, v], i) => (
          <View key={i} style={[styles.sumRow, { borderBottomColor: C.border }, isRTL && { flexDirection: 'row-reverse' }]}>
            <Text style={[styles.sumK, { color: C.textMuted }]}>{k}</Text>
            <Text style={[styles.sumV, { color: C.textSub }]}>{v}</Text>
          </View>
        ))}
        <View style={[styles.sumRow, styles.totalRow, isRTL && { flexDirection: 'row-reverse' }]}>
          <Text style={[styles.totalLabel, { color: C.text }]}>{t('total')}</Text>
          <Text style={[styles.totalValue, { color: C.accent }]}>{sym}{total.toFixed(2)}</Text>
        </View>
      </View>

      {currentUser && (
        <View style={[styles.walletInfo, { borderColor: 'rgba(124,58,237,0.2)' }]}>
          <Text style={[styles.walletInfoText, { color: C.textMuted }]}>
            {t('walletBalance')}: <Text style={{ color: currentUser.wallet >= total ? C.green : C.red }}>${currentUser.wallet.toFixed(2)}</Text>
          </Text>
        </View>
      )}

      <TouchableOpacity onPress={handleCheckout} activeOpacity={0.85}>
        <LinearGradient colors={['#f97316', '#ef4444']} style={styles.checkoutBtn}>
          <Text style={styles.checkoutBtnText}>{t('checkout')} — {sym}{total.toFixed(2)}</Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 14 },
  centerWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  emptyIcon: { fontSize: 60, marginBottom: 14 },
  emptyTitle: { fontSize: 20, fontWeight: '800', marginBottom: 8 },
  emptySub: { fontSize: 13, textAlign: 'center', marginBottom: 28, lineHeight: 20 },
  successIcon: { fontSize: 72, marginBottom: 20 },
  successTitle: { fontSize: 26, fontWeight: '900', marginBottom: 10 },
  successSub: { fontSize: 13, textAlign: 'center', lineHeight: 22, marginBottom: 28 },
  actionBtn: { paddingHorizontal: 36, paddingVertical: 15, borderRadius: 14 },
  actionBtnText: { fontSize: 15, fontWeight: '800', color: '#fff' },
  cartItem: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 13, marginBottom: 10, borderWidth: 1, gap: 11 },
  itemIcon: { width: 46, height: 46, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  itemIconText: { fontSize: 16, fontWeight: '900', color: '#fff' },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 13, fontWeight: '700' },
  itemPkg: { fontSize: 11, marginTop: 2 },
  itemRight: { alignItems: 'flex-end' },
  itemPrice: { fontSize: 14, fontWeight: '800' },
  removeBtn: { marginTop: 5 },
  removeBtnText: { fontSize: 17 },
  summary: { borderRadius: 14, padding: 15, marginBottom: 12, borderWidth: 1 },
  sumRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1 },
  sumK: { fontSize: 12 },
  sumV: { fontSize: 12, fontWeight: '700' },
  totalRow: { borderBottomWidth: 0, paddingTop: 12, marginTop: 2 },
  totalLabel: { fontSize: 15, fontWeight: '800' },
  totalValue: { fontSize: 18, fontWeight: '900' },
  walletInfo: { backgroundColor: 'rgba(124,58,237,0.08)', borderRadius: 11, padding: 11, marginBottom: 13, borderWidth: 1 },
  walletInfoText: { fontSize: 12, textAlign: 'center' },
  checkoutBtn: { borderRadius: 15, padding: 17, alignItems: 'center' },
  checkoutBtnText: { fontSize: 15, fontWeight: '800', color: '#fff' },
});