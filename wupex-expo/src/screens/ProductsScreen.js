import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, FlatList, TextInput,
  ScrollView, TouchableOpacity, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, PRODUCTS, CATEGORIES } from '../data';
import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';

const { width } = Dimensions.get('window');
const CARD_W = (width - 28 - 16) / 3;

const CATEGORY_ICONS = {
  'All': '🛍️', 'Gift Cards': '🎁', 'Gaming': '🎮',
  'Streaming': '🎬', 'Mobile': '📱', 'Subscriptions': '⭐',
};

const CATS_AR = {
  'All': 'الكل', 'Gift Cards': 'بطاقات هدايا', 'Gaming': 'ألعاب',
  'Streaming': 'بث مباشر', 'Mobile': 'جوال', 'Subscriptions': 'اشتراكات',
};

export default function ProductsScreen({ navigation, route }) {
  const { t, isRTL, language } = useApp();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (route?.params?.filterCategory) {
      setActiveCategory(route.params.filterCategory);
    } else {
      setActiveCategory('All');
    }
  }, [route?.params?.filterCategory]);

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCat = activeCategory === 'All' || p.cat === activeCategory;
      const matchQ   = p.name.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    });
  }, [query, activeCategory]);

  const rows = [];
  for (let i = 0; i < Math.ceil(filtered.length / 3); i++) rows.push(i);

  const renderRow = ({ item: rowIndex }) => {
    const row = [];
    for (let i = 0; i < 3; i++) {
      const p = filtered[rowIndex * 3 + i];
      row.push(
        p ? (
          <ProductCard key={p.id} product={p} onPress={() => navigation.navigate('ProductDetail', { product: p })} />
        ) : (
          <View key={`empty-${i}`} style={{ width: CARD_W }} />
        )
      );
    }
    return <View style={styles.row}>{row}</View>;
  };

  const getCatLabel = (cat) => language === 'ar' ? (CATS_AR[cat] || cat) : cat;

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchWrap}>
        <View style={[styles.searchBox, isRTL && { flexDirection: 'row-reverse' }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder={t('searchPlaceholder')}
            placeholderTextColor={COLORS.textMuted}
            value={query}
            onChangeText={setQuery}
            textAlign={isRTL ? 'right' : 'left'}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')} style={styles.clearBtnWrap}>
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories */}
      <View style={styles.catsWrap}>
        <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catsContent}>
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            const count = cat === 'All' ? PRODUCTS.length : PRODUCTS.filter(p => p.cat === cat).length;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.catBtn, isActive && styles.catBtnActive]}
                onPress={() => setActiveCategory(cat)}
                activeOpacity={0.8}
              >
                {isActive && (
                  <LinearGradient colors={[COLORS.primary, COLORS.primary2]} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
                )}
                <Text style={styles.catIcon}>{CATEGORY_ICONS[cat] || '📦'}</Text>
                <Text style={[styles.catText, isActive && styles.catTextActive]}>{getCatLabel(cat)}</Text>
                <View style={[styles.catBadge, isActive && styles.catBadgeActive]}>
                  <Text style={[styles.catBadgeText, isActive && styles.catBadgeTextActive]}>{count}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Results Row */}
      <View style={[styles.resultsRow, isRTL && { flexDirection: 'row-reverse' }]}>
        <Text style={styles.resultsText}>
          <Text style={{ color: COLORS.accent, fontWeight: '800' }}>{filtered.length}</Text>
          {' '}{language === 'ar' ? 'منتج' : `product${filtered.length !== 1 ? 's' : ''}`}
          {activeCategory !== 'All' ? ` · ${getCatLabel(activeCategory)}` : ''}
        </Text>
        {activeCategory !== 'All' && (
          <TouchableOpacity style={styles.clearFilterBtn} onPress={() => setActiveCategory('All')}>
            <Text style={styles.clearFilterText}>{t('clearFilter')}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Grid */}
      {filtered.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyTitle}>{t('noProducts')}</Text>
          <Text style={styles.emptySub}>{t('noProductsSub')}</Text>
        </View>
      ) : (
        <FlatList
          data={rows}
          keyExtractor={i => String(i)}
          renderItem={renderRow}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  searchWrap: { padding: 12, paddingBottom: 8 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.bg2, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 11, borderWidth: 1, borderColor: '#3a2f5a', gap: 8 },
  searchIcon: { fontSize: 15 },
  searchInput: { flex: 1, color: COLORS.text, fontSize: 14 },
  clearBtnWrap: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#3a2f5a', alignItems: 'center', justifyContent: 'center' },
  clearBtn: { fontSize: 10, color: COLORS.textMuted, fontWeight: '700' },
  catsWrap: { paddingBottom: 4 },
  catsContent: { paddingHorizontal: 14, gap: 8, paddingVertical: 4 },
  catBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 12, backgroundColor: COLORS.bg2, borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden', minWidth: 80 },
  catBtnActive: { borderColor: COLORS.primary },
  catIcon: { fontSize: 14 },
  catText: { fontSize: 12, fontWeight: '700', color: COLORS.textMuted },
  catTextActive: { color: '#fff' },
  catBadge: { backgroundColor: '#2a1f4a', borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2, minWidth: 22, alignItems: 'center' },
  catBadgeActive: { backgroundColor: 'rgba(255,255,255,0.2)' },
  catBadgeText: { fontSize: 9, fontWeight: '800', color: COLORS.textMuted },
  catBadgeTextActive: { color: '#fff' },
  resultsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingTop: 8, paddingBottom: 8 },
  resultsText: { fontSize: 12, color: COLORS.textMuted },
  clearFilterBtn: { backgroundColor: 'rgba(251,191,36,0.12)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(251,191,36,0.25)' },
  clearFilterText: { fontSize: 11, color: COLORS.accent, fontWeight: '700' },
  grid: { paddingHorizontal: 14, paddingTop: 2, paddingBottom: 20 },
  row: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginBottom: 6 },
  emptySub: { fontSize: 13, color: COLORS.textMuted },
});