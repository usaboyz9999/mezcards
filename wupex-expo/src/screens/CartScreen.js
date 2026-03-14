import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../data';
import { useApp } from '../context/AppContext';

export default function CartScreen({ navigation }) {
  const { cart, cartTotal, removeFromCart, checkout, currentUser } = useApp();
  const [ordered, setOrdered] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const vat = subtotal * 0.1;
  const total = subtotal + vat;

  const handleCheckout = () => {
    if (!currentUser) {
      Alert.alert('Sign In Required', 'Please sign in to complete your purchase.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign In', onPress: () => navigation.navigate('More') },
      ]);
      return;
    }
    if (currentUser.wallet < total) {
      Alert.alert('Insufficient Balance', `Your wallet balance is $${currentUser.wallet.toFixed(2)}. You need $${total.toFixed(2)}.`, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Add Funds', onPress: () => navigation.navigate('Wallet') },
      ]);
      return;
    }
    const result = checkout();
    if (result.success) setOrdered(true);
  };

  if (ordered) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successIcon}>✅</Text>
        <Text style={styles.successTitle}>Order Placed!</Text>
        <Text style={styles.successSub}>Your order has been confirmed.{'\n'}Codes will be delivered shortly.{'\n\n'}Wallet Balance: ${currentUser?.wallet.toFixed(2)}</Text>
        <TouchableOpacity onPress={() => { setOrdered(false); navigation.navigate('Home'); }}>
          <LinearGradient colors={[COLORS.primary, COLORS.primary2]} style={styles.successBtn}>
            <Text style={styles.successBtnText}>Back to Home</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyTitle}>Cart is Empty</Text>
        <Text style={styles.emptySub}>Browse products and add items to your cart.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Products')}>
          <LinearGradient colors={[COLORS.primary, COLORS.primary2]} style={styles.browsebtn}>
            <Text style={styles.browseBtnText}>Browse Products</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {cart.map((item, i) => (
        <View key={i} style={styles.cartItem}>
          <LinearGradient colors={item.colors} style={styles.itemIcon}>
            <Text style={styles.itemIconText}>{item.short.substring(0, 4)}</Text>
          </LinearGradient>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPkg}>{item.pkg} × {item.qty}</Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.itemPrice}>${(item.price * item.qty).toFixed(2)}</Text>
            <TouchableOpacity onPress={() => removeFromCart(item.productId, item.pkgIndex)} style={styles.removeBtn}>
              <Text style={styles.removeBtnText}>🗑</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View style={styles.summary}>
        <View style={styles.sumRow}><Text style={styles.sumK}>Subtotal</Text><Text style={styles.sumV}>${subtotal.toFixed(2)}</Text></View>
        <View style={styles.sumRow}><Text style={styles.sumK}>VAT (10%)</Text><Text style={styles.sumV}>${vat.toFixed(2)}</Text></View>
        <View style={[styles.sumRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
      </View>

      {currentUser && <View style={styles.walletInfo}><Text style={styles.walletInfoText}>Wallet Balance: <Text style={{ color: currentUser.wallet >= total ? COLORS.green : COLORS.red }}>${currentUser.wallet.toFixed(2)}</Text></Text></View>}

      <TouchableOpacity onPress={handleCheckout} activeOpacity={0.85}>
        <LinearGradient colors={['#f97316', '#ef4444']} style={styles.checkoutBtn}>
          <Text style={styles.checkoutBtnText}>✅  Checkout — ${total.toFixed(2)}</Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, padding: 14 },
  emptyContainer: { flex: 1, backgroundColor: COLORS.bg, alignItems: 'center', justifyContent: 'center', padding: 30 },
  emptyIcon: { fontSize: 52, marginBottom: 14 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text, marginBottom: 8 },
  emptySub: { fontSize: 13, color: COLORS.textMuted, textAlign: 'center', marginBottom: 24, lineHeight: 20 },
  browsebtn: { paddingHorizontal: 30, paddingVertical: 13, borderRadius: 12 },
  browseBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  cartItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.bg2, borderRadius: 12, padding: 12, marginBottom: 9, borderWidth: 1, borderColor: COLORS.border, gap: 10 },
  itemIcon: { width: 44, height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  itemIconText: { fontSize: 9, fontWeight: '900', color: '#fff', textAlign: 'center' },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 13, fontWeight: '700', color: COLORS.textSub },
  itemPkg: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  itemRight: { alignItems: 'flex-end' },
  itemPrice: { fontSize: 14, fontWeight: '800', color: COLORS.accent },
  removeBtn: { marginTop: 4 },
  removeBtnText: { fontSize: 16 },
  summary: { backgroundColor: COLORS.bg2, borderRadius: 12, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border },
  sumRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  sumK: { fontSize: 12, color: COLORS.textMuted },
  sumV: { fontSize: 12, color: COLORS.textSub, fontWeight: '700' },
  totalRow: { borderBottomWidth: 0, paddingTop: 10, marginTop: 2 },
  totalLabel: { fontSize: 15, fontWeight: '800', color: COLORS.text },
  totalValue: { fontSize: 17, fontWeight: '900', color: COLORS.accent },
  walletInfo: { backgroundColor: 'rgba(124,58,237,0.1)', borderRadius: 10, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(124,58,237,0.2)' },
  walletInfoText: { fontSize: 12, color: COLORS.textMuted, textAlign: 'center' },
  checkoutBtn: { borderRadius: 14, padding: 16, alignItems: 'center', marginBottom: 0 },
  checkoutBtnText: { fontSize: 15, fontWeight: '800', color: '#fff' },
  successContainer: { flex: 1, backgroundColor: COLORS.bg, alignItems: 'center', justifyContent: 'center', padding: 30 },
  successIcon: { fontSize: 64, marginBottom: 20 },
  successTitle: { fontSize: 26, fontWeight: '900', color: COLORS.green, marginBottom: 10 },
  successSub: { fontSize: 13, color: COLORS.textMuted, textAlign: 'center', lineHeight: 22, marginBottom: 28 },
  successBtn: { paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12 },
  successBtnText: { fontSize: 15, fontWeight: '700', color: '#fff' },
});
