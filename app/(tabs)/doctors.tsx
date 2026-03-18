import { ScrollView, StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';

export default function DoctorsScreen() {
  const isDark = useColorScheme() === 'dark';
  const router = useRouter();
  const textColor = isDark ? '#FFFFFF' : '#000000';
  const subtextColor = isDark ? '#A0A0A0' : '#666666';

  const doctorGroups = [
    {
      title: "Especialistas en Longevidad",
      doctors: [
        { id: 'dr1', name: 'Dr. Carlos Mendoza', specialty: 'Medicina Interna', desc: 'Prevención cardiovascular y optimización metabólica.', icon: 'heart' },
        { id: 'dr2', name: 'Dra. Elena Silva', specialty: 'Endocrinóloga', desc: 'Equilibrio hormonal y salud tiroidea de precisión.', icon: 'zap' },
        { id: 'dr6', name: 'Dr. Alan Turing', specialty: 'Genetista Clínico', desc: 'Análisis de polimorfismos y riesgo genético.', icon: 'activity' },
        { id: 'dr7', name: 'Dra. Sarah Lewis', specialty: 'Biogerontóloga', desc: 'Especialista en mecanismos de senescencia celular.', icon: 'layers' },
      ]
    },
    {
      title: "Salud Mental y Bienestar",
      doctors: [
        { id: 'dr3', name: 'Lic. Roberto Paz', specialty: 'Psicólogo Clínico', desc: 'Gestión del estrés y bioneuroemoción.', icon: 'smile' },
        { id: 'dr4', name: 'Dr. Jorge Luna', specialty: 'Neurólogo', desc: 'Optimización cognitiva y salud cerebral.', icon: 'cpu' },
        { id: 'dr5', name: 'Dra. Sofía Rossi', specialty: 'Psiquiatra', desc: 'Equilibrio psicosomático y bienestar emocional.', icon: 'user' },
      ]
    },
    {
        title: "Apoyo Nutricional",
        doctors: [
            { id: 'dr8', name: 'Lic. Laura Gómez', specialty: 'Nutrióloga Longevidad', desc: 'Protocolos de ayuno y nutrición de precisión.', icon: 'coffee' },
            { id: 'dr9', name: 'Ana Ruiz', specialty: 'Health Coach', desc: 'Acompañamiento en cambio de hábitos.', icon: 'check-circle' },
        ]
    }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F6F6F9' }]} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>Telemedicina y Equipo</Text>
      </View>

      <View style={styles.telemedicineGrid}>
        <TouchableOpacity 
            style={[styles.telePanel, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}
            onPress={() => router.push({ pathname: '/checkout', params: { type: 'chat', price: '150' } })}
        >
            <View style={[styles.teleIcon, { backgroundColor: '#007AFF15' }]}>
              <Feather name="message-square" size={20} color="#007AFF" />
            </View>
            <Text style={[styles.teleTitle, { color: textColor }]}>Chat Médico</Text>
            <Text style={[styles.teleDesc, { color: subtextColor }]}>Respuesta en {"<"} 5 min</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={[styles.telePanel, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}
            onPress={() => router.push({ pathname: '/checkout', params: { type: 'phone', price: '150' } })}
        >
            <View style={[styles.teleIcon, { backgroundColor: '#34C75915' }]}>
              <Feather name="phone" size={20} color="#34C759" />
            </View>
            <Text style={[styles.teleTitle, { color: textColor }]}>Llamada Express</Text>
            <Text style={[styles.teleDesc, { color: subtextColor }]}>Audio 24/7 sin cita</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={[styles.telePanel, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}
            onPress={() => router.push({ pathname: '/checkout', params: { type: 'video', price: '150' } })}
        >
            <View style={[styles.teleIcon, { backgroundColor: '#AF52DE15' }]}>
              <Feather name="video" size={20} color="#AF52DE" />
            </View>
            <Text style={[styles.teleTitle, { color: textColor }]}>Video Consulta</Text>
            <Text style={[styles.teleDesc, { color: subtextColor }]}>Especialista HD</Text>
        </TouchableOpacity>
      </View>

      {doctorGroups.map((group, gIdx) => (
        <View key={gIdx}>
          <Text style={[styles.sectionTitle, { color: textColor, marginTop: 24 }]}>{group.title}</Text>
          {group.doctors.map((dr) => (
            <Card key={dr.id} style={styles.doctorProfileCard}>
              <View style={styles.profileHeader}>
                <View style={[styles.avatarPlaceholder, { backgroundColor: '#007AFF15' }]}>
                   <Feather name={dr.icon as any} size={28} color="#007AFF" />
                </View>
                <View style={styles.profileInfo}>
                  <Text style={[styles.profileName, { color: textColor }]}>{dr.name}</Text>
                  <Text style={[styles.profileSpecialty, { color: '#007AFF' }]}>{dr.specialty}</Text>
                  <Text style={[styles.profileDesc, { color: subtextColor }]} numberOfLines={2}>{dr.desc}</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.primaryBtnLight}
                onPress={() => router.push({
                  pathname: '/doctor-profile',
                  params: { id: dr.id, name: dr.name, specialty: dr.specialty, desc: dr.desc }
                })}
              >
                <Text style={[styles.primaryBtnLightText, { color: textColor }]}>Contactar</Text>
              </TouchableOpacity>
            </Card>
          ))}
        </View>
      ))}

      <View style={{height: 40}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  telemedicineGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  telePanel: {
    width: '31%',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  teleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  teleTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  teleDesc: {
    fontSize: 9,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  doctorProfileCard: {
    padding: 16,
    marginBottom: 12,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  profileSpecialty: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  profileDesc: {
    fontSize: 11,
    lineHeight: 14,
  },
  primaryBtnLight: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryBtnLightText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
