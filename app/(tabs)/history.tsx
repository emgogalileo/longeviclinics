import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function HistoryScreen() {
  const isDark = useColorScheme() === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#000000';
  const subtextColor = isDark ? '#A0A0A0' : '#666666';

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F6F6F9' }]} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: textColor }]}>Carpeta Clínica</Text>
          <Text style={[styles.subtitle, { color: subtextColor }]}>Historial de Longevidad</Text>
        </View>
        <TouchableOpacity style={styles.exportBtn}>
          <Feather name="download" size={20} color={textColor} />
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionTitle, { color: textColor }]}>Línea de Tiempo</Text>

      <View style={styles.timelineContainer}>
        {/* Item 1 */}
        <View style={styles.timelineItem}>
          <View style={styles.timelineLine} />
          <View style={[styles.timelineDot, { backgroundColor: '#007AFF' }]} />
          <View style={styles.timelineContent}>
            <Text style={[styles.timelineDate, { color: subtextColor }]}>Ayer, 10:30 AM</Text>
            <Card style={styles.timelineCard}>
              <View style={styles.cardHeader}>
                <Feather name="file-text" size={16} color="#007AFF" />
                <Text style={[styles.cardTitle, { color: textColor }]}>Resultados de Laboratorio</Text>
              </View>
              <Text style={[styles.cardDesc, { color: subtextColor }]} numberOfLines={2}>
                Panel metabólico, perfil lipídico y hormonal. Notas de la doctora añadidas.
              </Text>
              <TouchableOpacity style={styles.cardAction}>
                <Text style={styles.cardActionText}>Ver Reporte (PDF)</Text>
              </TouchableOpacity>
            </Card>
          </View>
        </View>

        {/* Item 2 */}
        <View style={styles.timelineItem}>
          <View style={styles.timelineLine} />
          <View style={[styles.timelineDot, { backgroundColor: '#34C759' }]} />
          <View style={styles.timelineContent}>
            <Text style={[styles.timelineDate, { color: subtextColor }]}>Hace 1 semana</Text>
            <Card style={styles.timelineCard}>
              <View style={styles.cardHeader}>
                <Feather name="video" size={16} color="#34C759" />
                <Text style={[styles.cardTitle, { color: textColor }]}>Consulta Telemedicina</Text>
              </View>
              <Text style={[styles.cardDesc, { color: subtextColor }]}>
                Dra. Elena Silva. Motivo: Revisión de inicio de protocolo.
              </Text>
              <View style={styles.notesContainer}>
                <Text style={[styles.notesLabel, { color: textColor }]}>Plan:</Text>
                <Text style={[styles.notesText, { color: subtextColor }]}>Mantener ayuno intermitente 16/8. Aumentar dosis de Omega 3 a 2g diarios.</Text>
              </View>
            </Card>
          </View>
        </View>

        {/* Item 3 */}
        <View style={[styles.timelineItem, { marginBottom: 0 }]}>
          <View style={[styles.timelineDot, { backgroundColor: '#AF52DE' }]} />
          <View style={styles.timelineContent}>
            <Text style={[styles.timelineDate, { color: subtextColor }]}>Hace 1 mes</Text>
            <Card style={styles.timelineCard}>
              <View style={styles.cardHeader}>
                <Feather name="shield" size={16} color="#AF52DE" />
                <Text style={[styles.cardTitle, { color: textColor }]}>Inicio Protocolo V1.0</Text>
              </View>
              <Text style={[styles.cardDesc, { color: subtextColor }]}>
                Se definió el protocolo base de suplementación y nutrición.
              </Text>
            </Card>
          </View>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: textColor, marginTop: 24 }]}>Documentos</Text>
      
      <Card style={styles.docCard}>
        <View style={styles.docIcon}>
          <Feather name="file" size={24} color="#FF3B30" />
        </View>
        <View style={styles.docInfo}>
          <Text style={[styles.docName, { color: textColor }]}>Consentimiento Informado</Text>
          <Text style={[styles.docMeta, { color: subtextColor }]}>PDF • Firmado 12/04/2026</Text>
        </View>
        <Feather name="download" size={20} color={subtextColor} />
      </Card>

      <Card style={styles.docCard}>
        <View style={styles.docIcon}>
          <Feather name="image" size={24} color="#007AFF" />
        </View>
        <View style={styles.docInfo}>
          <Text style={[styles.docName, { color: textColor }]}>DEXA Scan Corpo Completo</Text>
          <Text style={[styles.docMeta, { color: subtextColor }]}>Imagen • 10/04/2026</Text>
        </View>
        <Feather name="download" size={20} color={subtextColor} />
      </Card>
      
      <TouchableOpacity style={styles.uploadBtn}>
        <Feather name="upload" size={20} color="#FFFFFF" />
        <Text style={styles.uploadBtnText}>Subir Documento Externo</Text>
      </TouchableOpacity>

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  exportBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#007AFF15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  timelineContainer: {
    paddingLeft: 12,
  },
  timelineItem: {
    position: 'relative',
    marginBottom: 24,
  },
  timelineLine: {
    position: 'absolute',
    left: 4,
    top: 24,
    bottom: -32,
    width: 2,
    backgroundColor: '#E5E5EA',
  },
  timelineDot: {
    position: 'absolute',
    left: -2,
    top: 4,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    zIndex: 1,
  },
  timelineContent: {
    marginLeft: 24,
  },
  timelineDate: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: '600',
  },
  timelineCard: {
    padding: 16,
    marginBottom: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  cardDesc: {
    fontSize: 14,
    lineHeight: 20,
  },
  cardAction: {
    marginTop: 12,
    backgroundColor: '#007AFF10',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  cardActionText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 12,
  },
  notesContainer: {
    marginTop: 12,
    backgroundColor: '#F3F3F5',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#34C759',
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 13,
    lineHeight: 18,
  },
  docCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  docIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#00000005',
    justifyContent: 'center',
    alignItems: 'center',
  },
  docInfo: {
    flex: 1,
    marginLeft: 16,
  },
  docName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  docMeta: {
    fontSize: 12,
  },
  uploadBtn: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  uploadBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});
