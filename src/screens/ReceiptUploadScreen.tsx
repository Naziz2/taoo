import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../contexts/UserContext';
import CoinIcon from '../components/CoinIcon';

export default function ReceiptUploadScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { user, setUser } = useUser();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const requestPermissions = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return cameraPermission.status === 'granted' && mediaPermission.status === 'granted';
  };

  const pickImageFromCamera = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert('Permission requise', 'Veuillez autoriser l\'accès à la caméra');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const pickImageFromGallery = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert('Permission requise', 'Veuillez autoriser l\'accès à la galerie');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const analyzeReceipt = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setIsProcessing(true);

    try {
      // Simulate OCR processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Simulate OCR results - random amount between 20-200 TND
      const receiptAmount = (Math.random() * 180 + 20).toFixed(3);
      const pointsEarned = Math.floor(parseFloat(receiptAmount) * 10); // 10 points per TND

      setIsAnalyzing(false);
      
      // Show success alert
      Alert.alert(
        'Reçu Validé! 🎉',
        `Montant détecté: ${receiptAmount} TND\nPoints gagnés: +${pointsEarned}`,
        [
          {
            text: 'Confirmer',
            onPress: () => {
              // Update user points
              if (user && setUser) {
                setUser({ ...user, points: user.points + pointsEarned });
              }
              
              Alert.alert(
                'Points ajoutés!',
                `Vos points ont été crédités avec succès.\nNouveau solde: ${(user?.points || 0) + pointsEarned} points`,
                [
                  {
                    text: 'Scanner un autre',
                    onPress: () => {
                      setSelectedImage(null);
                      setIsProcessing(false);
                    },
                  },
                  {
                    text: 'Retour',
                    onPress: () => navigation.goBack(),
                    style: 'cancel',
                  },
                ]
              );
            },
          },
          {
            text: 'Annuler',
            style: 'cancel',
            onPress: () => setIsProcessing(false),
          },
        ]
      );
    } catch (error) {
      setIsAnalyzing(false);
      setIsProcessing(false);
      Alert.alert('Erreur', 'Impossible d\'analyser le reçu. Veuillez réessayer.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Télécharger Reçu</Text>
        <TouchableOpacity style={styles.pointsContainer}>
          <Text style={styles.pointsText}>{user?.points?.toLocaleString() || '0'}</Text>
          <CoinIcon size={14} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* How it works */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="gift" size={24} color="#EAB308" />
            <Text style={styles.cardTitle}>Comment ça marche</Text>
          </View>
          <View style={styles.stepsList}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Faites vos achats</Text>
                <Text style={styles.stepDescription}>
                  Achetez dans n'importe quel magasin et gardez votre reçu
                </Text>
              </View>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Prenez une photo</Text>
                <Text style={styles.stepDescription}>
                  Photographiez votre reçu clairement
                </Text>
              </View>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Gagnez des points</Text>
                <Text style={styles.stepDescription}>
                  Recevez automatiquement des points TAOO
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Upload Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Télécharger votre reçu</Text>
          
          {selectedImage ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => setSelectedImage(null)}
              >
                <MaterialCommunityIcons name="close" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              
              {isAnalyzing && (
                <View style={styles.analyzingOverlay}>
                  <ActivityIndicator size="large" color="#EAB308" />
                  <Text style={styles.analyzingText}>Analyse OCR en cours...</Text>
                  <Text style={styles.analyzingSubtext}>Extraction du montant total</Text>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.uploadContainer}>
              <MaterialCommunityIcons name="receipt" size={64} color="#9CA3AF" />
              <Text style={styles.uploadTitle}>Ajoutez votre reçu</Text>
              <Text style={styles.uploadDescription}>
                Prenez une photo ou sélectionnez depuis votre galerie
              </Text>
            </View>
          )}

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.cameraButton]}
              onPress={pickImageFromCamera}
              disabled={isProcessing}
            >
              <MaterialCommunityIcons name="camera" size={24} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Appareil photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.galleryButton]}
              onPress={pickImageFromGallery}
              disabled={isProcessing}
            >
              <MaterialCommunityIcons name="image" size={24} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Galerie</Text>
            </TouchableOpacity>
          </View>

          {selectedImage && !isProcessing && (
            <TouchableOpacity
              style={styles.submitButton}
              onPress={analyzeReceipt}
            >
              <MaterialCommunityIcons name="check-circle" size={20} color="#111827" />
              <Text style={styles.submitButtonText}>Analyser et Soumettre</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <MaterialCommunityIcons name="information" size={20} color="#2563EB" />
            <Text style={styles.tipsTitle}>Conseils pour une photo parfaite</Text>
          </View>
          <View style={styles.tipsList}>
            <Text style={styles.tipText}>• Assurez-vous que le reçu est bien éclairé</Text>
            <Text style={styles.tipText}>• Toutes les informations doivent être lisibles</Text>
            <Text style={styles.tipText}>• Incluez la date, le montant et le nom du magasin</Text>
            <Text style={styles.tipText}>• Évitez les reflets et les ombres</Text>
            <Text style={styles.tipText}>• Le montant total sera détecté automatiquement par OCR</Text>
          </View>
        </View>

        {/* Points Calculation Info */}
        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="calculator" size={24} color="#10B981" />
          <Text style={styles.infoTitle}>Calcul des Points</Text>
          <Text style={styles.infoText}>
            Vous gagnez <Text style={styles.infoBold}>10 points par TND</Text> dépensé
          </Text>
          <View style={styles.examplesContainer}>
            <View style={styles.exampleRow}>
              <Text style={styles.exampleAmount}>20 TND</Text>
              <MaterialCommunityIcons name="arrow-right" size={16} color="#6B7280" />
              <Text style={styles.examplePoints}>200 points</Text>
            </View>
            <View style={styles.exampleRow}>
              <Text style={styles.exampleAmount}>50 TND</Text>
              <MaterialCommunityIcons name="arrow-right" size={16} color="#6B7280" />
              <Text style={styles.examplePoints}>500 points</Text>
            </View>
            <View style={styles.exampleRow}>
              <Text style={styles.exampleAmount}>100 TND</Text>
              <MaterialCommunityIcons name="arrow-right" size={16} color="#6B7280" />
              <Text style={styles.examplePoints}>1,000 points</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#111827',
  },
  backButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(254, 243, 199, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(254, 230, 138, 0.3)',
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FEF3C7',
    marginRight: 4,
  },
  coinIcon: {
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 8,
  },
  stepsList: {
    gap: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400E',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  uploadContainer: {
    alignItems: 'center',
    paddingVertical: 48,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    borderRadius: 16,
    marginBottom: 16,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  uploadDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  imagePreviewContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  imagePreview: {
    width: '100%',
    height: 400,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  removeImageButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  analyzingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  analyzingText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 16,
  },
  analyzingSubtext: {
    fontSize: 14,
    color: '#D1D5DB',
    marginTop: 8,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  cameraButton: {
    backgroundColor: '#3B82F6',
  },
  galleryButton: {
    backgroundColor: '#6B7280',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAB308',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  tipsCard: {
    backgroundColor: '#EFF6FF',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E40AF',
    marginLeft: 8,
  },
  tipsList: {
    gap: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#1E3A8A',
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginTop: 12,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  infoBold: {
    fontWeight: '700',
    color: '#10B981',
  },
  examplesContainer: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  exampleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  exampleAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  examplePoints: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
    flex: 1,
    textAlign: 'right',
  },
});
