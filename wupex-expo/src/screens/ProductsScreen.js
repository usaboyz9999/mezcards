import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, PRODUCTS, CATEGORIES } from '../data';
import ProductCard from '../components/ProductCard';

export default function ProductsScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCat = activeCategory === 'All' || p.cat === activeCategory;
      const matchQ   = p.name.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    });
  }, [query, activeCategory]);

  const renderRow = ({ item, index }) => {
    const row = [];
    for (let i = 0; i < 3; i++) {
      const p = filtered[index * 3 + i];
      row.push(p
        ? <ProductCard key={p.id} product={p} onPress={() => navigation.navigate('ProductDetail', { product: p })} />
        : <View key={`empty-${i}`} style={{ width: (require('react-native').Dimensions.get('window').width - 28 - 16) / 3 }} />
      );
    }
    return <View style={styles.row}>{row}</View>;
  };

  const rows = [];
  for (let i = 0; i < Math.ceil(filtered.length / 3); i++) rows.push(i);

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchWrap}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput style={styles.searchInput} placeholder="Search products..." placeholderTextColor={COLORS.textMuted} value={query} onChangeText={setQuery} />
        </View>
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cats} contentContainerStyle={{ paddingHorizontal: 14, gap: 8 }}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity key={cat} style={[styles.catBtn, activeCategory === cat && styles.catBtnActive]} onPress={() => setActiveCategory(cat)}>
            <Text style={[styles.catText, activeCategory === cat && styles.catTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Grid */}
      <FlatList
        data={rows}
        keyExtractor={i => String(i)}
        renderItem={renderRow}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  searchWrap: { padding: 12, paddingBottom: 6 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.bg2, borderRadius: 12, padding: 11, borderWidth: 1, borderColor: '#3a2f5a', gap: 8 },
  searchIcon: { fontSize: 15 },
  searchInput: { flex: 1, color: COLORS.text, fontSize: 14 },
  cats: { marginBottom: 8 },
  catBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: COLORS.bg2, borderWidth: 1, borderColor: COLORS.border },
  catBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  catText: { fontSize: 12, fontWeight: '700', color: COLORS.textMuted },
  catTextActive: { color: '#fff' },
  grid: { paddingHorizontal: 14, paddingTop: 4 },
  row: { flexDirection: 'row', gap: 8, marginBottom: 8 },
});
