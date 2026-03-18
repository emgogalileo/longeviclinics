import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useState } from 'react';
import { Card } from '@/components/Card';

export default function MedicalHistoryScreen() {
  const isDark = useColorScheme() === 'dark';
  const router = useRouter();
  const textColor = isDark ? '#FFFFFF' : '#000000';
  const subtextColor = isDark ? '#A0A0A0' : '#666666';

  const [history, setHistory] = useState([
    { id: 1, title: 'Hipertensión', checked: false },
    { id: 2, title: 'Diabetes Tipo 2', checked: false },
    { id: 3, title: 'Colesterol Alto', checked: true },
    { id: 4, title: 'Alergias Medicamentosas', checked: false },
    { id: 5, title: 'Cirugías Previas', checked: true },
    { id: 6, title: 'Antecedentes Familiares CV', checked: true },
    { id: 7, title: 'Fumador/Ex-fumador', checked: false },
    { id: 8, title: 'Consumo de Alcohol Regular', checked: false },
  ]);

  const toggleCheck = (id: number) => {
    setHistory(history.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F6F6F9' }]} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color={textColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: textColor }]}>Historial Médico</Text>
        <View style={{ width: 44 }} />
      </View>

      <Text style={[styles.sectionLabel, { color: subtextColor }]}>Condiciones y Antecedentes</Text>
      
      {history.map(item => (
        <Card key={item.id} style={styles.historyCard}>
          <TouchableOpacity 
            style={styles.historyRow} 
            onPress={() => toggleCheck(item.id)}
            activeOpacity={0.7}
          >
            <Text style={[styles.historyText, { color: textColor }]}>{item.title}</Text>
            <View style={[
              styles.checkbox, 
              item.checked ? styles.checked : { borderColor: subtextColor }
            ]}>
              {item.checked && <Feather name="check" size={14} color="#FFF" />}
            </View>
          </TouchableOpacity>
        </Card>
      ))}

      <Text style={[styles.infoText, { color: subtextColor }]}>
        Esta información ayuda a nuestros especialistas a personalizar tus planes de longevidad de forma segura.
      </Text>

      <TouchableOpacity 
          style={styles.saveBtn}
          onPress={() => router.back()}
      >
        <Text style={styles.saveBtnText}>Actualizar Historial</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  historyCard: {
    padding: 16,
    marginBottom: 12,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyText: {
    fontSize: 16,
    fontWeight: '500',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  infoText: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 12,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  saveBtn: {
    backgroundColor: '#007AFF',
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
