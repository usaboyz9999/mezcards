import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, PRODUCTS } from '../data';
import ProductCard from '../components/ProductCard';

const TEAM = [
  { initials: 'JM', name: 'John Moore',  role: 'Admin',      colors: ['#7c3aed', '#a855f7'], online: true },
  { initials: 'JD', name: 'Jennie Doe',  role: 'Support',    colors: ['#ec4899', '#f472b6'], online: false },
  { initials: 'JO', name: 'John Oprah',  role: 'Accountant', colors: ['#f97316', '#fbbf24'], online: null },
];

export default function HomeScreen({ navigation }) {
  const popular = PRODUCTS.slice(0, 9);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Banner */}
      <LinearGradient colors={['#4c1d95', '#7c3aed', '#a855f7', '#c026d3']} style={styles.hero} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View style={styles.heroContent}>
          <Text style={styles.heroFaster}>FASTER</Text>
          <View style={styles.heroIcons}>
            {['X', 'PS', 'ST'].map(ic => (
              <View key={ic} style={styles.heroIcon}><Text style={styles.heroIconText}>{ic}</Text></View>
            ))}
          </View>
          <Text style={styles.heroSeamless}>SEAMLESS</Text>
        </View>
        <View style={[styles.bubble, { width: 100, height: 100, top: -30, right: -30 }]} />
        <View style={[styles.bubble, { width: 60, height: 60, bottom: -15, left: 60 }]} />
      </LinearGradient>

      {/* Popular Products */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>🔥 Popular Products</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Products')}>
          <Text style={styles.seeAll}>See all ›</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.grid}>
        {popular.map(p => <ProductCard key={p.id} product={p} onPress={() => navigation.navigate('ProductDetail', { product: p })} />)}
      </View>

      {/* Create Order Button */}
      <LinearGradient colors={['#f97316', '#ef4444']} style={styles.createBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.createBtnInner}>
          <Text style={styles.createBtnText}>🛒  Create New Order</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Team */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>👥 Team Members</Text>
      </View>
      {TEAM.map((m, i) => (
        <View key={i} style={styles.teamItem}>
          <LinearGradient colors={m.colors} style={styles.teamAvatar}>
            <Text style={styles.teamAvatarText}>{m.initials}</Text>
          </LinearGradient>
          <View style={styles.teamInfo}>
            <Text style={styles.teamName}>{m.name}</Text>
            <Text style={styles.teamRole}>{m.role}</Text>
          </View>
          <View style={[styles.onlineDot, { backgroundColor: m.online === true ? '#34d399' : m.online === false ? '#f87171' : '#fbbf24' }]} />
        </View>
      ))}
      <View style={{ height: 16 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  hero: { margin: 14, marginTop: 12, borderRadius: 18, padding: 20, overflow: 'hidden' },
  heroContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heroFaster: { fontSize: 26, fontWeight: '900', fontStyle: 'italic', color: '#fff' },
  heroSeamless: { fontSize: 20, fontWeight: '900', fontStyle: 'italic', color: '#fde68a' },
  heroIcons: { flexDirection: 'row', gap: 6 },
  heroIcon: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center' },
  heroIconText: { fontSize: 9, fontWeight: '900', color: '#fff' },
  bubble: { position: 'absolute', borderRadius: 9999, backgroundColor: 'rgba(255,255,255,0.06)' },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingTop: 14, paddingBottom: 8 },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: COLORS.text },
  seeAll: { fontSize: 12, color: COLORS.accent, fontWeight: '700' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10, gap: 8 },
  createBtn: { margin: 14, borderRadius: 14, overflow: 'hidden' },
  createBtnInner: { padding: 15, alignItems: 'center' },
  createBtnText: { fontSize: 14, fontWeight: '900', color: '#fff' },
  teamItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.bg2, borderRadius: 12, padding: 12, marginHorizontal: 14, marginBottom: 8, borderWidth: 1, borderColor: COLORS.border },
  teamAvatar: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  teamAvatarText: { fontSize: 12, fontWeight: '800', color: '#fff' },
  teamInfo: { flex: 1, marginLeft: 10 },
  teamName: { fontSize: 13, fontWeight: '700', color: COLORS.textSub },
  teamRole: { fontSize: 10.5, color: COLORS.textMuted, marginTop: 1 },
  onlineDot: { width: 10, height: 10, borderRadius: 5 },
});
