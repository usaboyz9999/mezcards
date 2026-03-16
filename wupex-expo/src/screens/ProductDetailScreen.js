import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../data';
import { useApp } from '../context/AppContext';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart, t, isRTL, currentUser } = useApp();
  const [selectedPkg, setSelectedPkg] = useState(0);

  const handleAdd = () => {
    if (!currentUser) {
      Alert.alert(
        t('signInRequired'),
        t('signInToPurchase'),
        [
          { text: t('cancel'), style: 'cancel' },
          { text: t('signIn'), onPress: () => navigation.navigate('Account') },
        ]
      );
      return;
    }
    addToCart(product, selectedPkg);
    Alert.alert(
      t('addedToCart'),
      `${product.name} - ${product.pkgs[selectedPkg].a}`,
      [
        { text: t('continueShopping'), style: 'cancel' },
        { text: t('viewCart'), onPress: () => navigation.navigate('Cart') },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={product.colors} style={styles.heroImg}>
        <Text style={styles.heroText}>{product.short}</Text>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={[styles.name, isRTL && styles.rtlText]}>{product.name}</Text>
        <Text style={[styles.desc, isRTL && styles.rtlText]}>{product.desc}</Text>
        <Text style={[styles.pkgLabel, isRTL && styles.rtlText]}>{t('selectPackage')}</Text>
        <View style={styles.pkgGrid}>
          {product.pkgs.map((pkg, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.pkgCard, selectedPkg === i && styles.pkgCardSelected]}
              onPress={() => setSelectedPkg(i)}
            >
              <Text style={[styles.pkgAmount, selectedPkg === i && { color: COLORS.text }]}>{pkg.a}</Text>
              <Text style={styles.pkgPrice}>${pkg.p.toFixed(2)}</Text>
              <Text style={styles.pkgRegion}>🇸🇦 🇺🇸 🇦🇪</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity onPress={handleAdd} activeOpacity={0.85}>
        <LinearGradient
          colors={currentUser ? [COLORS.primary, COLORS.primary2] : ['#3a2f5a', '#4a3f6a']}
          style={styles.addBtn}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.addBtnText}>
            {currentUser
              ? `${t('addToCart')} — $${product.pkgs[selectedPkg].p.toFixed(2)}`
              : `🔒 ${t('signIn')}`
            }
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  rtlText: { textAlign: 'right' },
  heroImg: { height: 180, alignItems: 'center', justifyContent: 'center', margin: 14, borderRadius: 16 },
  heroText: { fontSize: 30, fontWeight: '900', color: '#fff', textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 8 },
  content: { paddingHorizontal: 14 },
  name: { fontSize: 20, fontWeight: '900', color: COLORS.text, marginBottom: 6 },
  desc: { fontSize: 13, color: COLORS.textMuted, lineHeight: 20, marginBottom: 18 },
  pkgLabel: { fontSize: 11, fontWeight: '700', color: COLORS.accent, marginBottom: 10, letterSpacing: 0.5 },
  pkgGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  pkgCard: { width: '47%', backgroundColor: COLORS.bg2, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  pkgCardSelected: { borderColor: COLORS.primary, backgroundColor: 'rgba(124,58,237,0.15)' },
  pkgAmount: { fontSize: 14, fontWeight: '900', color: COLORS.textMuted, marginBottom: 3 },
  pkgPrice: { fontSize: 14, color: COLORS.accent, fontWeight: '700' },
  pkgRegion: { fontSize: 12, marginTop: 3 },
  addBtn: { marginHorizontal: 14, borderRadius: 14, padding: 16, alignItems: 'center' },
  addBtnText: { fontSize: 15, fontWeight: '800', color: '#fff' },
});