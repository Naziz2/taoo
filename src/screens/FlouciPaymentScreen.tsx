import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUser } from '../contexts/UserContext';
import CoinIcon from '../components/CoinIcon';

interface PaymentService {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
}

export default function FlouciPaymentScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { user } = useUser();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const services: PaymentService[] = [
    {
      id: 'card',
      title: 'Carte Bancaire',
      description: 'Payez avec votre carte',
      icon: 'credit-card',
      color: '#3B82F6',
    },
    {
      id: 'transfer',
      title: 'Virement',
      description: 'Transfert bancaire',
      icon: 'bank-transfer',
      color: '#10B981',
    },
    {
      id: 'mobile',
      title: 'Paiement Mobile',
      description: 'Flouci / D17',
      icon: 'cellphone',
      color: '#F59E0B',
    },
    {
      id: 'cash',
      title: 'Espèces',
      description: 'Points de vente',
      icon: 'cash',
      color: '#8B5CF6',
    },
  ];

  const handlePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Erreur', 'Veuillez entrer un montant valide');
      return;
    }

    if (selectedService === 'card') {
      if (!cardNumber || !expiryDate || !cvv) {
        Alert.alert('Erreur', 'Veuillez remplir toutes les informations de la carte');
        return;
      }
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      setIsProcessing(false);
      
      Alert.alert(
        'Paiement Réussi! 🎉',
        `Montant: ${amount} TND\nVotre paiement a été traité avec succès.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      setIsProcessing(false);
      Alert.alert('Erreur', 'Le paiement a échoué. Veuillez réessayer.');
    }
  };

  const renderServiceSelection = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Choisissez un mode de paiement</Text>
      <View style={styles.servicesGrid}>
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={[
              styles.serviceCard,
              selectedService === service.id && styles.serviceCardActive,
            ]}
            onPress={() => setSelectedService(service.id)}
          >
            <View style={[styles.serviceIcon, { backgroundColor: service.color + '20' }]}>
              <MaterialCommunityIcons name={service.icon} size={32} color={service.color} />
            </View>
            <Text style={styles.serviceTitle}>{service.title}</Text>
            <Text style={styles.serviceDescription}>{service.description}</Text>
            {selectedService === service.id && (
              <View style={styles.selectedBadge}>
                <MaterialCommunityIcons name="check-circle" size={20} color="#10B981" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderCardPayment = () => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name="credit-card" size={24} color="#3B82F6" />
        <Text style={styles.cardTitle}>Informations de la carte</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Numéro de carte</Text>
        <TextInput
          style={styles.input}
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
          maxLength={19}
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.inputLabel}>Date d'expiration</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/AA"
            value={expiryDate}
            onChangeText={setExpiryDate}
            keyboardType="numeric"
            maxLength={5}
          />
        </View>
        <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.inputLabel}>CVV</Text>
          <TextInput
            style={styles.input}
            placeholder="123"
            value={cvv}
            onChangeText={setCvv}
            keyboardType="numeric"
            maxLength={3}
            secureTextEntry
          />
        </View>
      </View>

      <View style={styles.securityBadge}>
        <MaterialCommunityIcons name="shield-check" size={20} color="#10B981" />
        <Text style={styles.securityText}>Paiement sécurisé SSL</Text>
      </View>
    </View>
  );

  const renderMobilePayment = () => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name="cellphone" size={24} color="#F59E0B" />
        <Text style={styles.cardTitle}>Paiement Mobile</Text>
      </View>

      <View style={styles.mobileOptions}>
        <TouchableOpacity style={styles.mobileOption}>
          <View style={styles.mobileOptionIcon}>
            <Text style={styles.mobileOptionEmoji}>📱</Text>
          </View>
          <View style={styles.mobileOptionContent}>
            <Text style={styles.mobileOptionTitle}>Flouci</Text>
            <Text style={styles.mobileOptionDescription}>Paiement via Flouci</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.mobileOption}>
          <View style={styles.mobileOptionIcon}>
            <Text style={styles.mobileOptionEmoji}>💳</Text>
          </View>
          <View style={styles.mobileOptionContent}>
            <Text style={styles.mobileOptionTitle}>D17</Text>
            <Text style={styles.mobileOptionDescription}>Paiement D17</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTransferPayment = () => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name="bank-transfer" size={24} color="#10B981" />
        <Text style={styles.cardTitle}>Virement Bancaire</Text>
      </View>

      <View style={styles.bankDetails}>
        <Text style={styles.bankDetailsTitle}>Coordonnées bancaires</Text>
        <View style={styles.bankDetailRow}>
          <Text style={styles.bankDetailLabel}>Banque:</Text>
          <Text style={styles.bankDetailValue}>BIAT</Text>
        </View>
        <View style={styles.bankDetailRow}>
          <Text style={styles.bankDetailLabel}>RIB:</Text>
          <Text style={styles.bankDetailValue}>08 000 0123456789 01</Text>
        </View>
        <View style={styles.bankDetailRow}>
          <Text style={styles.bankDetailLabel}>Bénéficiaire:</Text>
          <Text style={styles.bankDetailValue}>DO SHOPPING</Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <MaterialCommunityIcons name="information" size={20} color="#2563EB" />
        <Text style={styles.infoText}>
          Veuillez inclure votre référence client dans le libellé du virement
        </Text>
      </View>
    </View>
  );

  const renderCashPayment = () => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name="cash" size={24} color="#8B5CF6" />
        <Text style={styles.cardTitle}>Paiement en Espèces</Text>
      </View>

      <Text style={styles.description}>
        Rendez-vous dans l'un de nos points de vente partenaires pour effectuer votre paiement en espèces.
      </Text>

      <View style={styles.locationsList}>
        <View style={styles.locationItem}>
          <MaterialCommunityIcons name="map-marker" size={24} color="#8B5CF6" />
          <View style={styles.locationContent}>
            <Text style={styles.locationTitle}>Centre Commercial Tunisia Mall</Text>
            <Text style={styles.locationAddress}>Les Berges du Lac, Tunis</Text>
          </View>
        </View>
        <View style={styles.locationItem}>
          <MaterialCommunityIcons name="map-marker" size={24} color="#8B5CF6" />
          <View style={styles.locationContent}>
            <Text style={styles.locationTitle}>Mall of Sousse</Text>
            <Text style={styles.locationAddress}>Sousse, Tunisie</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paiement Flouci</Text>
        <TouchableOpacity style={styles.pointsContainer}>
          <Text style={styles.pointsText}>{user?.points?.toLocaleString() || '0'}</Text>
          <CoinIcon size={14} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Amount Card */}
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Montant à payer</Text>
          <View style={styles.amountInputContainer}>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
            />
            <Text style={styles.currency}>TND</Text>
          </View>
        </View>

        {/* Service Selection */}
        {renderServiceSelection()}

        {/* Payment Method Details */}
        {selectedService === 'card' && renderCardPayment()}
        {selectedService === 'mobile' && renderMobilePayment()}
        {selectedService === 'transfer' && renderTransferPayment()}
        {selectedService === 'cash' && renderCashPayment()}

        {/* Payment Button */}
        {selectedService && (
          <TouchableOpacity
            style={[styles.payButton, isProcessing && styles.payButtonDisabled]}
            onPress={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <ActivityIndicator size="small" color="#111827" />
                <Text style={styles.payButtonText}>Traitement...</Text>
              </>
            ) : (
              <>
                <MaterialCommunityIcons name="check-circle" size={20} color="#111827" />
                <Text style={styles.payButtonText}>Payer {amount || '0.00'} TND</Text>
              </>
            )}
          </TouchableOpacity>
        )}

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
  amountCard: {
    backgroundColor: '#EAB308',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#EAB308',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  amountLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#78350F',
    marginBottom: 12,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  amountInput: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  currency: {
    fontSize: 24,
    fontWeight: '700',
    color: '#78350F',
    marginLeft: 8,
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
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  serviceCardActive: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  serviceIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  selectedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  row: {
    flexDirection: 'row',
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  securityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
    marginLeft: 8,
  },
  mobileOptions: {
    gap: 12,
  },
  mobileOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  mobileOptionIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  mobileOptionEmoji: {
    fontSize: 24,
  },
  mobileOptionContent: {
    flex: 1,
  },
  mobileOptionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  mobileOptionDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  bankDetails: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  bankDetailsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  bankDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  bankDetailLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  bankDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  infoText: {
    fontSize: 14,
    color: '#1E40AF',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  locationsList: {
    gap: 12,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
  },
  locationContent: {
    flex: 1,
    marginLeft: 12,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 12,
    color: '#6B7280',
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAB308',
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 18,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#EAB308',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  payButtonDisabled: {
    backgroundColor: '#D1D5DB',
    shadowOpacity: 0.1,
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
});
