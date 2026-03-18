import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';

import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function HomeScreen() {
  const isDark = useColorScheme() === 'dark';
  const router = useRouter();

  const textColor = isDark ? '#FFFFFF' : '#000000';
  const subtextColor = isDark ? '#A0A0A0' : '#666666';

  const [supplementsTaken, setSupplementsTaken] = useState(false);

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F6F6F9' }]} contentContainerStyle={styles.content}>
      <View style={styles.brandHeader}>
        <Text style={[styles.brandText, { color: textColor }]}>LONGEVICLINICS</Text>
      </View>

      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: subtextColor }]}>Hola, PAZ MOLINA ARGUETA</Text>
          <Text style={[styles.title, { color: textColor }]}>Tu Resumen de Salud</Text>
        </View>
        <TouchableOpacity style={styles.profileBtn} onPress={() => router.push('/profile')}>
          <Feather name="user" size={24} color={textColor} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push('/longevity-details')}>
        <Card>
          <View style={styles.scoreRow}>
            <View style={styles.scoreInfo}>
              <Text style={[styles.scoreLabel, { color: subtextColor }]}>Score de Longevidad</Text>
              <View style={styles.scoreValueRow}>
                <Text style={[styles.scoreValue, { color: textColor }]}>85</Text>
                <Text style={[styles.scoreSubValue, { color: subtextColor }]}>/100</Text>
              </View>
              <Text style={[styles.scoreTrend, { color: '#34C759' }]}>+2 puntos vs mes pasado</Text>
            </View>
            <View style={styles.ageBadge}>
              <Text style={styles.ageBadgeTitle}>Edad Bio.</Text>
              <Text style={styles.ageBadgeValue}>36 <Text style={styles.ageBadgeSub}>años</Text></Text>
              <Text style={styles.ageBadgeNote}>Cronológica: 42</Text>
            </View>
          </View>
          <ProgressBar progress={0.85} color="#34C759" height={10} />
        </Card>
      </TouchableOpacity>

      <Text style={[styles.sectionTitle, { color: textColor }]}>Biomarcadores Clave</Text>
      <View style={styles.grid}>
        <Card style={styles.gridCard}>
          <View style={styles.widgetHeader}>
            <Feather name="activity" size={20} color="#007AFF" />
            <View style={[styles.dot, { backgroundColor: '#34C759' }]} />
          </View>
          <Text style={[styles.widgetValue, { color: textColor }]}>82</Text>
          <Text style={[styles.widgetLabel, { color: subtextColor }]}>Glucosa (mg/dL)</Text>
          <Text style={[styles.widgetTrend, { color: '#34C759' }]}>↓ 3% Óptimo</Text>
        </Card>

        <Card style={styles.gridCard}>
          <View style={styles.widgetHeader}>
            <Feather name="droplet" size={20} color="#FF9500" />
            <View style={[styles.dot, { backgroundColor: '#FFCC00' }]} />
          </View>
          <Text style={[styles.widgetValue, { color: textColor }]}>210</Text>
          <Text style={[styles.widgetLabel, { color: subtextColor }]}>Colesterol (mg/dL)</Text>
          <Text style={[styles.widgetTrend, { color: '#FFCC00' }]}>↑ 2% Alerta</Text>
        </Card>

        <Card style={styles.gridCard}>
          <View style={styles.widgetHeader}>
            <Feather name="wind" size={20} color="#FF3B30" />
            <View style={[styles.dot, { backgroundColor: '#FF3B30' }]} />
          </View>
          <Text style={[styles.widgetValue, { color: textColor }]}>4.2</Text>
          <Text style={[styles.widgetLabel, { color: subtextColor }]}>PCR (mg/L)</Text>
          <Text style={[styles.widgetTrend, { color: '#FF3B30' }]}>↑ 10% Alto</Text>
        </Card>

        <Card style={styles.gridCard}>
          <View style={styles.widgetHeader}>
            <Feather name="zap" size={20} color="#AF52DE" />
            <View style={[styles.dot, { backgroundColor: '#34C759' }]} />
          </View>
          <Text style={[styles.widgetValue, { color: textColor }]}>720</Text>
          <Text style={[styles.widgetLabel, { color: subtextColor }]}>Testosterona</Text>
          <Text style={[styles.widgetTrend, { color: '#34C759' }]}>↑ 5% Óptimo</Text>
        </Card>
      </View>

      <Text style={[styles.sectionTitle, { color: textColor }]}>Próximas Acciones</Text>
      <TouchableOpacity style={styles.actionCard}>
        <View style={styles.actionIconContainer}>
          <Feather name="calendar" size={24} color="#007AFF" />
        </View>
        <View style={styles.actionContent}>
          <Text style={[styles.actionTitle, { color: textColor }]}>Consulta con Dra. Silva</Text>
          <Text style={[styles.actionSub, { color: subtextColor }]}>Mañana, 10:00 AM</Text>
        </View>
        <Feather name="chevron-right" size={20} color={subtextColor} />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.actionCard, supplementsTaken && { opacity: 0.6 }]} 
        onPress={() => setSupplementsTaken(!supplementsTaken)}
      >
        <View style={styles.actionIconContainer}>
          <Feather name="shield" size={24} color="#34C759" />
        </View>
        <View style={styles.actionContent}>
          <Text style={[
            styles.actionTitle, 
            { color: textColor }, 
            supplementsTaken && { textDecorationLine: 'line-through' }
          ]}>
            Toma de Suplementos
          </Text>
          <Text style={[styles.actionSub, { color: subtextColor }]}>Omega 3, Vitamina D</Text>
        </View>
        <View style={[styles.checkBtn, supplementsTaken ? { backgroundColor: '#34C759' } : { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#34C759' }]}>
          {supplementsTaken && <Feather name="check" size={16} color="#FFF" />}
        </View>
      </TouchableOpacity>

      <Card style={styles.tipCard}>
        <Feather name="info" size={20} color="#007AFF" style={{ marginTop: 2 }} />
        <Text style={[styles.tipText, { color: textColor }]}>
          Tu variabilidad de frecuencia cardíaca (HRV) bajó un 10% anoche. Considera un ejercicio suave hoy.
        </Text>
      </Card>
      
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
  brandHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  brandText: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#007AFF20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  scoreInfo: {
    flex: 1,
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  scoreValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  scoreSubValue: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 4,
  },
  scoreTrend: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  ageBadge: {
    backgroundColor: '#007AFF10',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ageBadgeTitle: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  ageBadgeValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 4,
  },
  ageBadgeSub: {
    fontSize: 12,
  },
  ageBadgeNote: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCard: {
    width: '48%',
    padding: 16,
  },
  widgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  widgetValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  widgetLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  widgetTrend: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#007AFF10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  actionSub: {
    fontSize: 14,
  },
  checkBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#34C759',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#007AFF10',
    borderColor: '#007AFF30',
    marginTop: 8,
  },
  tipText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    lineHeight: 20,
  },
});
