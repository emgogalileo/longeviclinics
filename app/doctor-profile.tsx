import { ScrollView, StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Linking, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Card } from '@/components/Card';

export default function DoctorProfileScreen() {
  const { id, name, specialty, desc } = useLocalSearchParams();
  const isDark = useColorScheme() === 'dark';
  const router = useRouter();
  const textColor = isDark ? '#FFFFFF' : '#000000';
  const subtextColor = isDark ? '#A0A0A0' : '#666666';

  const handleCall = () => {
    Alert.alert("Llamada", `Iniciando llamada con el especialista ${name}...`);
  };

  const handleVideo = () => {
    Alert.alert("Videollamada", "Preparando sala de consulta virtual segura Longeviclinics...");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F6F6F9' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color={textColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: textColor }]}>Perfil del Especialista</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileHero}>
            <View style={[styles.avatar, { backgroundColor: '#007AFF15' }]}>
                <Feather name="user" size={60} color="#007AFF" />
            </View>
            <Text style={[styles.name, { color: textColor }]}>{name}</Text>
            <Text style={[styles.specialty, { color: '#007AFF' }]}>{specialty}</Text>
        </View>

        <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/(tabs)/ai')}>
                <View style={[styles.actionIcon, { backgroundColor: '#34C75915' }]}>
                    <Feather name="message-circle" size={24} color="#34C759" />
                </View>
                <Text style={[styles.actionLabel, { color: textColor }]}>Mensaje</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn} onPress={handleCall}>
                <View style={[styles.actionIcon, { backgroundColor: '#007AFF15' }]}>
                    <Feather name="phone" size={24} color="#007AFF" />
                </View>
                <Text style={[styles.actionLabel, { color: textColor }]}>Llamada</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn} onPress={handleVideo}>
                <View style={[styles.actionIcon, { backgroundColor: '#AF52DE15' }]}>
                    <Feather name="video" size={24} color="#AF52DE" />
                </View>
                <Text style={[styles.actionLabel, { color: textColor }]}>Video</Text>
            </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { color: textColor }]}>Intervención en Longevidad</Text>
        <Card style={styles.longevityCard}>
            <View style={styles.longevityHeader}>
                <Feather name="shield" size={20} color="#007AFF" />
                <Text style={[styles.longevityTitle, { color: textColor }]}>Valor Clínico</Text>
            </View>
            <Text style={[styles.longevityText, { color: subtextColor }]}>
                {specialty?.toString().includes('Genetista') ? 
                  "Análisis de polimorfismos (SNPs) clave para personalizar la suplementación y predecir riesgos metabólicos antes de que ocurran." :
                 specialty?.toString().includes('Biogerontólogo') ?
                  "Especializado en protocolos senolíticos y modulación de las vías mTOR/AMPK para ralentizar el envejecimiento celular." :
                 specialty?.toString().includes('Endocrinóloga') ?
                  "Optimización del eje hormonal para mantener la masa muscular y la sensibilidad a la insulina, pilares de la longevidad." :
                 specialty?.toString().includes('Neurólogo') ?
                  "Protocolos de neuroplasticidad y prevención de neurodegeneración mediante optimización de BDNF y control de neuroinflamación." :
                  "Optimización de biomarcadores sistémicos y diseño de protocolos preventivos basados en medicina de precisión."
                }
            </Text>
        </Card>

        <Text style={[styles.sectionTitle, { color: textColor }]}>Sobre el Especialista</Text>
        <Card style={styles.bioCard}>
            <Text style={[styles.bioText, { color: subtextColor }]}>
                {desc || "Especialista certificado miembro de Longeviclinics, dedicado a la optimización de salud y medicina de precisión."}
            </Text>
            <View style={styles.statsRow}>
                <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: textColor }]}>15+</Text>
                    <Text style={[styles.statLabel, { color: subtextColor }]}>Experiencia</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: textColor }]}>4.9/5</Text>
                    <Text style={[styles.statLabel, { color: subtextColor }]}>Calificación</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: textColor }]}>1.2k</Text>
                    <Text style={[styles.statLabel, { color: subtextColor }]}>Citas</Text>
                </View>
            </View>
        </Card>

        <Text style={[styles.sectionTitle, { color: textColor }]}>Próxima Disponibilidad</Text>
        <Card style={styles.availabilityCard}>
            <View style={styles.availRow}>
                <Feather name="calendar" size={18} color="#007AFF" />
                <Text style={[styles.availText, { color: textColor }]}>Mañana, 14:00 - 18:00</Text>
            </View>
            <TouchableOpacity style={styles.bookBtn}>
                <Text style={styles.bookBtnText}>Reservar Cita</Text>
            </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 60,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    padding: 24,
  },
  profileHero: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 18,
    fontWeight: '600',
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  actionBtn: {
    alignItems: 'center',
    width: '30%',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  longevityCard: {
    padding: 16,
    marginBottom: 24,
    backgroundColor: '#007AFF05',
    borderWidth: 1,
    borderColor: '#007AFF20',
  },
  longevityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  longevityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  longevityText: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  bioCard: {
    padding: 20,
    marginBottom: 24,
  },
  bioText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#00000010',
    paddingTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  availabilityCard: {
    padding: 20,
    marginBottom: 40,
  },
  availRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  availText: {
    fontSize: 16,
    fontWeight: '600',
  },
  bookBtn: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
