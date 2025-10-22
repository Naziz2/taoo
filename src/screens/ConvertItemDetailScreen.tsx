import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// placeholder items for demonstration
const sampleItems: { [key: string]: Array<{ id: string; title: string; points: number }> } = {
  gift_cards: [
    { id: 'g1', title: 'Gift Card 50TND', points: 490 },
    { id: 'g2', title: 'Gift Card 100TND', points: 990 },
  ],
  free_products: [
    { id: 'f1', title: 'Free Phone Case', points: 120 },
    { id: 'f2', title: 'Free Coffee Mug', points: 60 },
  ],
  charity: [
    { id: 'c1', title: 'Donate 50TND', points: 500 },
    { id: 'c2', title: 'Donate 100TND', points: 1000 },
  ],
  flouci_transfers: [
    { id: 't1', title: 'Transfer to Flouci Wallet', points: 1 },
  ],
  travel: [
    { id: 'tr1', title: 'Weekend Getaway', points: 15000 },
  ],
};

export default function ConvertItemDetailScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<any>();
  const item = route.params?.item;
  const items = sampleItems[item?.id] || [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}> 
        <Text style={styles.headerTitle}>{item?.title || 'Items'}</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.rowTitle}>{item.title}</Text>
            <Text style={styles.rowPoints}>{item.points} pts</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={{ padding: 16 }}>
            <Text>No items available</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  row: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowTitle: { fontSize: 16, color: '#111827' },
  rowPoints: { fontSize: 14, color: '#6B7280', fontWeight: '700' },
});
