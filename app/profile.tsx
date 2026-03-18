import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useState } from 'react';

export default function ProfileScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#000000';
  const subtextColor = isDark ? '#A0A0A0' : '#666666';

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [faceIdEnabled, setFaceIdEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  const [profileName, setProfileName] = useState("PAZ MOLINA ARGUETA");
  const [profileEmail, setProfileEmail] = useState("paz.molina@longeviclinics.com");

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F6F6F9' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="chevron-left" size={28} color={textColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: textColor }]}>Perfil y Configuración</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Feather name="user" size={40} color="#007AFF" />
        </View>
        <Text style={[styles.profileName, { color: textColor }]}>{profileName}</Text>
        <Text style={[styles.profileEmail, { color: subtextColor }]}>{profileEmail}</Text>
      </View>

      <View style={[styles.settingsGroup, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/personal-data')}>
          <Feather name="user" size={20} color={textColor} style={styles.settingIcon} />
          <Text style={[styles.settingText, { color: textColor }]}>Datos Personales</Text>
          <Feather name="chevron-right" size={20} color={subtextColor} />
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/medical-history')}>
          <Feather name="file-text" size={20} color={textColor} style={styles.settingIcon} />
          <Text style={[styles.settingText, { color: textColor }]}>Historial Médico Base</Text>
          <Feather name="chevron-right" size={20} color={subtextColor} />
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/payment-methods')}>
          <Feather name="credit-card" size={20} color={textColor} style={styles.settingIcon} />
          <Text style={[styles.settingText, { color: textColor }]}>Métodos de Pago</Text>
          <Feather name="chevron-right" size={20} color={subtextColor} />
        </TouchableOpacity>
      </View>

      <View style={[styles.settingsGroup, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
        <View style={styles.settingItem}>
          <Feather name="bell" size={20} color={textColor} style={styles.settingIcon} />
          <Text style={[styles.settingText, { color: textColor }]}>Notificaciones Push</Text>
          <Switch 
            value={notificationsEnabled} 
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#767577', true: '#34C759' }}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.settingItem}>
          <Feather name="lock" size={20} color={textColor} style={styles.settingIcon} />
          <Text style={[styles.settingText, { color: textColor }]}>Entrar con Face ID</Text>
          <Switch 
            value={faceIdEnabled} 
            onValueChange={setFaceIdEnabled}
            trackColor={{ false: '#767577', true: '#34C759' }}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.settingItem}>
          <Feather name="mail" size={20} color={textColor} style={styles.settingIcon} />
          <Text style={[styles.settingText, { color: textColor }]}>Novedades y Ofertas</Text>
          <Switch 
            value={marketingEnabled} 
            onValueChange={setMarketingEnabled}
            trackColor={{ false: '#767577', true: '#34C759' }}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  backBtn: {
    padding: 8,
    marginLeft: -8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
  },
  settingsGroup: {
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 24,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingIcon: {
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  settingText: {
    flex: 1,
    fontSize: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#C6C6C8',
    marginLeft: 56,
  },
  logoutBtn: {
    marginHorizontal: 20,
    marginTop: 8,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#FF3B3015',
    borderRadius: 12,
  },
  logoutText: {
    color: '#FF3B30',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
