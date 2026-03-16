import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../data';

const { width } = Dimensions.get('window');
const CARD_W = (width - 28 - 16) / 3;

export default function ProductCard({ product, onPress }) {
  const [imgError, setImgError] = useState(false);
  const hasImage = product.image && product.image.length > 0 && !imgError;

  return (
    <TouchableOpacity style={[styles.card, { width: CARD_W }]} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.imgWrap}>
        {hasImage ? (
          <Image
            source={{ uri: product.image }}
            style={styles.fullImage}
            resizeMode="cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <>
            <LinearGradient colors={product.colors} style={StyleSheet.absoluteFill} />
            <Text style={styles.shortText}>{product.short}</Text>
          </>
        )}
        <View style={styles.wBadge}>
          <Text style={styles.wBadgeText}>M</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.price}>from ${product.pkgs[0].p}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.bg2,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 2,
  },
  imgWrap: {
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  fullImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  shortText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 4,
    lineHeight: 14,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    zIndex: 2,
  },
  wBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#7c3aed',
    borderRadius: 4,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  wBadgeText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#fff',
  },
  info: { padding: 6 },
  title: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textSub,
  },
  price: {
    fontSize: 10,
    color: COLORS.accent,
    fontWeight: '700',
    marginTop: 1,
  },
});