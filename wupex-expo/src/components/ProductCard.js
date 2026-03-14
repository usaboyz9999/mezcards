import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../data';

const { width } = Dimensions.get('window');
const CARD_W = (width - 28 - 16) / 3;

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity style={[styles.card, { width: CARD_W }]} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.imgWrap}>
        <LinearGradient colors={product.colors} style={StyleSheet.absoluteFill} />
        <Text style={styles.productName}>{product.short}</Text>
        <View style={styles.wBadge}><Text style={styles.wBadgeText}>w</Text></View>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.price}>from ${product.pkgs[0].p}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.bg2, borderRadius: 12, overflow: 'hidden', marginBottom: 2 },
  imgWrap: { width: '100%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  productName: { fontSize: 10, fontWeight: '900', color: '#fff', textAlign: 'center', paddingHorizontal: 4, lineHeight: 14, textShadowColor: 'rgba(0,0,0,0.7)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  wBadge: { position: 'absolute', top: 6, right: 6, backgroundColor: '#7c3aed', borderRadius: 4, width: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  wBadgeText: { fontSize: 8, fontWeight: '900', color: '#fff', fontStyle: 'italic' },
  info: { padding: 6 },
  title: { fontSize: 10, fontWeight: '700', color: COLORS.textSub },
  price: { fontSize: 10, color: COLORS.accent, fontWeight: '700', marginTop: 1 },
});
