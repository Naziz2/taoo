import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';

type AccountScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export default function AccountScreen() {
  const { t, language, setLanguage } = useLanguage();
  const { user, logout } = useUser();
  const navigation = useNavigation<AccountScreenNavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', options: [] as any[] });

  const showModal = (title: string, message: string, options: any[] = []) => {
    setModalContent({ title, message, options });
    setModalVisible(true);
  };

  const handleUpgrade = () => {
    console.log('Upgrade button pressed');
    navigation.navigate('UpgradeAccount');
  };

  const handleProfile = () => {
    console.log('Profile button pressed');
    showModal(
      t('account.profile'),
      `${t('account.name')}: ${user?.firstName || 'N/A'} ${user?.lastName || 'N/A'}\n${t('account.phone')}: ${user?.phone || 'N/A'}\n${t('account.level')}: ${user?.level || 'basic'}\n${t('account.points')}: ${user?.points || 0}`,
      [{ text: t('privacy.close'), onPress: () => setModalVisible(false) }]
    );
  };

  const handleLanguage = () => {
    console.log('Language button pressed, current language:', language);
    const languageNames = {
      'en': 'English',
      'fr': 'Français',
      'ar': 'العربية'
    };
    showModal(
      t('language.choose'),
      `${t('language.current')}: ${languageNames[language as keyof typeof languageNames]}`,
      [
        { 
          text: '🇫🇷 Français', 
          onPress: async () => { 
            console.log('Switching to French...');
            setModalVisible(false);
            await setLanguage('fr');
            setTimeout(() => {
              Alert.alert(t('language.changed'), 'L\'application est maintenant en Français');
            }, 100);
          } 
        },
        { 
          text: '🇸🇦 العربية', 
          onPress: async () => { 
            console.log('Switching to Arabic...');
            setModalVisible(false);
            await setLanguage('ar');
            setTimeout(() => {
              Alert.alert('تم تغيير اللغة', 'التطبيق الآن باللغة العربية');
            }, 100);
          } 
        },
        { 
          text: '🇬🇧 English', 
          onPress: async () => { 
            console.log('Switching to English...');
            setModalVisible(false);
            await setLanguage('en');
            setTimeout(() => {
              Alert.alert('Language Changed', 'App is now in English');
            }, 100);
          } 
        },
        { text: t('language.cancel'), onPress: () => setModalVisible(false) },
      ]
    );
  };

  const handleNotifications = () => {
    console.log('Notifications button pressed');
    showModal(
      t('notifications.title'),
      t('notifications.manage'),
      [
        { 
          text: `✅ ${t('notifications.enableAll')}`, 
          onPress: () => { 
            console.log('Notifications activées'); 
            setModalVisible(false);
            Alert.alert(t('notifications.enabled'), t('notifications.willReceive'));
          } 
        },
        { 
          text: `🔕 ${t('notifications.disableAll')}`, 
          onPress: () => { 
            console.log('Notifications désactivées'); 
            setModalVisible(false);
            Alert.alert(t('notifications.disabled'), t('notifications.wontReceive'));
          } 
        },
        { 
          text: `⚙️ ${t('notifications.customize')}`, 
          onPress: () => { 
            console.log('Personnaliser notifications'); 
            setModalVisible(false);
            Alert.alert(t('notifications.customize'), 'Fonctionnalité disponible prochainement');
          } 
        },
        { text: t('language.cancel'), onPress: () => setModalVisible(false) },
      ]
    );
  };

  const handlePrivacy = () => {
    console.log('Privacy button pressed');
    showModal(
      t('privacy.title'),
      t('privacy.protected'),
      [
        { 
          text: `📄 ${t('privacy.readPolicy')}`, 
          onPress: () => { 
            console.log('Afficher politique de confidentialité'); 
            setModalVisible(false);
            Alert.alert(t('privacy.title'), 'Ouverture de la politique complète...');
          } 
        },
        { 
          text: `🗑️ ${t('privacy.deleteData')}`, 
          onPress: () => { 
            setModalVisible(false);
            Alert.alert(
              t('privacy.deleteData'),
              t('privacy.confirmDelete'),
              [
                { text: t('language.cancel'), style: 'cancel' },
                { 
                  text: t('privacy.deleteData'), 
                  style: 'destructive',
                  onPress: () => Alert.alert(t('privacy.deleteData'), 'Vos données ont été supprimées')
                }
              ]
            );
          } 
        },
        { text: t('privacy.close'), onPress: () => setModalVisible(false) },
      ]
    );
  };

  const handleHelp = () => {
    console.log('Help button pressed');
    showModal(
      t('help.title'),
      t('help.how'),
      [
        { 
          text: `❓ ${t('help.faq')}`, 
          onPress: () => { 
            console.log('Ouvrir FAQ'); 
            setModalVisible(false);
            Alert.alert(
              t('help.faq'),
              '1. Comment gagner des points ?\n   Réponse: Achetez chez nos partenaires\n\n2. Comment utiliser mes points ?\n   Réponse: Convertissez-les en réductions\n\n3. Quelle est la validité des points ?\n   Réponse: 12 mois à partir de la date d\'obtention'
            );
          } 
        },
        { 
          text: `💬 ${t('help.contact')}`, 
          onPress: () => { 
            console.log('Contacter support'); 
            setModalVisible(false);
            Alert.alert(
              t('help.contact'),
              'Email: support@cashlik.com\nTéléphone: +966 11 234 5678\nDisponible: 9h-18h (Dim-Jeu)',
              [{ text: 'Copier l\'email' }, { text: t('privacy.close') }]
            );
          } 
        },
        { 
          text: `📱 ${t('help.tour')}`, 
          onPress: () => { 
            console.log('Ouvrir guide'); 
            setModalVisible(false);
            Alert.alert(
              t('help.tour'),
              '🏠 Accueil: Découvrez les promotions\n🎁 Offres: Les meilleures deals\n🏪 Magasins: Nos partenaires\n💳 Wallet: Gérez vos points\n👤 Compte: Votre profil'
            );
          } 
        },
        { 
          text: `📞 ${t('help.whatsapp')}`, 
          onPress: () => { 
            console.log('Ouvrir WhatsApp'); 
            setModalVisible(false);
            Alert.alert('WhatsApp', 'Ouverture de WhatsApp: +966 50 123 4567');
          } 
        },
        { text: t('privacy.close'), onPress: () => setModalVisible(false) },
      ]
    );
  };

  const handleSettings = () => {
    console.log('Settings button pressed');
    showModal(
      t('settings.title'),
      t('settings.configure'),
      [
        { 
          text: `🌙 ${t('settings.theme')}`, 
          onPress: () => { 
            console.log('Changer thème'); 
            setModalVisible(false);
            Alert.alert(
              t('settings.theme'),
              'Quel thème préférez-vous ?',
              [
                { text: '☀️ Clair', onPress: () => Alert.alert('Thème', 'Thème clair activé') },
                { text: '🌙 Sombre', onPress: () => Alert.alert('Thème', 'Thème sombre activé') },
                { text: '⚙️ Auto', onPress: () => Alert.alert('Thème', 'Thème automatique activé') },
              ]
            );
          } 
        },
        { 
          text: `🔔 ${t('settings.sounds')}`, 
          onPress: () => { 
            console.log('Modifier sons'); 
            setModalVisible(false);
            Alert.alert(
              t('settings.sounds'),
              'Paramètres audio',
              [
                { text: 'Activer les sons', onPress: () => console.log('Sons activés') },
                { text: 'Activer les vibrations', onPress: () => console.log('Vibrations activées') },
                { text: 'Tout désactiver', onPress: () => console.log('Audio désactivé') },
              ]
            );
          } 
        },
        { 
          text: `💾 ${t('settings.storage')} (12.5 MB)`, 
          onPress: () => { 
            console.log('Gérer stockage'); 
            setModalVisible(false);
            Alert.alert(
              t('settings.storage'),
              'Utilisation: 12.5 MB\n\n• Images: 8.2 MB\n• Cache: 3.1 MB\n• Données: 1.2 MB',
              [
                { text: 'Vider le cache', onPress: () => Alert.alert('Cache vidé', 'Le cache a été supprimé') },
                { text: t('privacy.close') },
              ]
            );
          } 
        },
        { 
          text: `📍 ${t('settings.location')}`, 
          onPress: () => { 
            console.log('Gérer localisation'); 
            setModalVisible(false);
            Alert.alert(
              t('settings.location'),
              'Autoriser l\'accès à votre position pour trouver les magasins proches',
              [
                { text: 'Activer', onPress: () => Alert.alert('Localisation', 'Localisation activée') },
                { text: 'Désactiver' },
              ]
            );
          } 
        },
        { text: t('privacy.close'), onPress: () => setModalVisible(false) },
      ]
    );
  };

  const handleLogout = async () => {
    console.log('Logout button pressed');
    showModal(
      t('logout.title'),
      t('logout.confirm'),
      [
        {
          text: t('logout.cancel'),
          onPress: () => {
            console.log('Logout cancelled');
            setModalVisible(false);
          },
        },
        {
          text: t('account.logout'),
          onPress: async () => {
            console.log('Logout confirmed, calling logout()');
            setModalVisible(false);
            try {
              await logout();
              console.log('Logout completed successfully');
            } catch (error) {
              console.error('Logout error:', error);
              showModal('Erreur', 'Une erreur est survenue lors de la déconnexion', [
                { text: t('privacy.close'), onPress: () => setModalVisible(false) }
              ]);
            }
          },
        },
      ]
    );
  };

  const menuItems = [
    { icon: 'account', label: t('account.profile'), onPress: handleProfile },
    { icon: 'web', label: t('account.language'), onPress: handleLanguage },
    { icon: 'bell', label: t('account.notifications'), onPress: handleNotifications },
    { icon: 'shield-check', label: t('account.privacy'), onPress: handlePrivacy },
    { icon: 'help-circle', label: t('account.help'), onPress: handleHelp },
    { icon: 'cog', label: t('account.settings'), onPress: handleSettings },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('account.title')}</Text>
        <Text style={styles.languageIndicator}>🌐 {language.toUpperCase()}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons name="account" color="#FFFFFF" size={40} />
          </View>
          <Text style={styles.userName}>
            {user?.firstName && user?.lastName 
              ? `${user.firstName} ${user.lastName}` 
              : 'User'}
          </Text>
          <Text style={styles.userEmail}>{user?.phone || user?.email || 'Not available'}</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{user?.level || 'Basic'} Level</Text>
          </View>
          {user?.level !== 'gold' && (
            <TouchableOpacity 
              style={styles.upgradeButton}
              onPress={handleUpgrade}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="star" color="#FFFFFF" size={18} />
              <Text style={styles.upgradeButtonText}>{t('account.upgrade')}</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.menu}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                console.log(`Menu item pressed: ${item.label}`);
                item.onPress();
              }}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <MaterialCommunityIcons name={item.icon} color="#6B7280" size={24} />
                <Text style={styles.menuItemText} numberOfLines={1}>{item.label}</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" color="#9CA3AF" size={24} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="logout" color="#EF4444" size={24} />
          <Text style={styles.logoutText}>{t('account.logout')}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Custom Modal Dialog */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable 
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={styles.modalTitle}>{modalContent.title}</Text>
            <Text style={styles.modalMessage}>{modalContent.message}</Text>
            
            <View style={styles.modalButtons}>
              {modalContent.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.modalButton,
                    index === modalContent.options.length - 1 && styles.modalButtonLast
                  ]}
                  onPress={option.onPress}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.modalButtonText,
                    option.text === 'Annuler' && styles.modalButtonTextCancel
                  ]}>
                    {option.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  languageIndicator: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    marginHorizontal: 16,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EAB308',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  levelBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAB308',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
    marginTop: 4,
  },
  upgradeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  menu: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
    flexShrink: 1,
  },
  menuItemArrow: {
    fontSize: 24,
    color: '#9CA3AF',
    minWidth: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 32,
    padding: 16,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
  modalButtons: {
    gap: 12,
  },
  modalButton: {
    backgroundColor: '#EAB308',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonLast: {
    backgroundColor: '#E5E7EB',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modalButtonTextCancel: {
    color: '#6B7280',
  },
});
