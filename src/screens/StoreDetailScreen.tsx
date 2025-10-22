import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Linking, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

export default function StoreDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { store } = route.params || { store: null };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          {store?.logo ? (
            <Image source={{ uri: store.logo }} style={styles.headerLogo} resizeMode="contain" />
          ) : (
            <View style={[styles.headerLogoPlaceholder, { backgroundColor: store?.bgColor || '#EAB308' }]}> 
              <Text style={styles.headerLogoText}>{store?.logoInitials || store?.name?.slice(0,2)}</Text>
            </View>
          )}
          <View style={styles.headerText}>
            <Text style={styles.title} numberOfLines={1}>{store?.name || 'Store'}</Text>
            {store?.cashback && (
              <View style={styles.headerBadge}>
                <MaterialCommunityIcons name="star" size={12} color="#EAB308" />
                <Text style={styles.headerBadgeText}>{store.cashback}</Text>
              </View>
            )}
          </View>
        </View>
        <TouchableOpacity 
          style={styles.externalButton}
          onPress={() => store?.webLink && Linking.openURL(store.webLink)}
        >
          <MaterialCommunityIcons name="open-in-new" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      {store?.webLink ? (
        <WebView
          originWhitelist={["*"]}
          source={{ uri: store.webLink }}
          startInLoadingState
          allowsBackForwardNavigationGestures
          automaticallyAdjustContentInsets
          style={styles.webview}
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading {store.name}...</Text>
            </View>
          )}
        />
      ) : (
        <View style={styles.noWebsiteContainer}>
          <MaterialCommunityIcons name="web-off" size={64} color="#9CA3AF" />
          <Text style={styles.noWebsiteText}>No website available</Text>
          <Text style={styles.noWebsiteSubtext}>This store doesn't have an online presence yet</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F9FAFB' 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    paddingBottom: 12, 
    backgroundColor: '#111827',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  backButton: { 
    padding: 8, 
    marginLeft: -8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  headerLogo: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  headerLogoPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLogoText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  title: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#FFFFFF',
    marginBottom: 2,
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(234, 179, 8, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  headerBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FDE68A',
    marginLeft: 4,
  },
  externalButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    marginLeft: 8,
  },
  webview: { 
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 12,
  },
  noWebsiteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  noWebsiteText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  noWebsiteSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
