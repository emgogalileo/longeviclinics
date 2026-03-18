import { ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useState } from 'react';

export default function PersonalDataScreen() {
  const isDark = useColorScheme() === 'dark';
  const router = useRouter();
  const textColor = isDark ? '#FFFFFF' : '#000000';
  const subtextColor = isDark ? '#A0A0A0' : '#666666';
  const inputBg = isDark ? '#1C1C1E' : '#FFFFFF';

  const [form, setForm] = useState({
    name: "PAZ MOLINA ARGUETA",
    age: "42",
    weight: "68",
    height: "172",
    goal: "Optimización de longevidad y rendimiento cognitivo"
  });

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F6F6F9' }]} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={24} color={textColor} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: textColor }]}>Datos Personales</Text>
          <View style={{ width: 44 }} />
        </View>

        <Text style={[styles.sectionLabel, { color: subtextColor }]}>Información Básica</Text>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: textColor }]}>Nombre Completo</Text>
          <TextInput 
            style={[styles.input, { color: textColor, backgroundColor: inputBg }]} 
            value={form.name}
            onChangeText={(t) => setForm({...form, name: t})}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
            <Text style={[styles.label, { color: textColor }]}>Edad</Text>
            <TextInput 
              style={[styles.input, { color: textColor, backgroundColor: inputBg }]} 
              value={form.age}
              keyboardType="numeric"
              onChangeText={(t) => setForm({...form, age: t})}
            />
          </View>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={[styles.label, { color: textColor }]}>Sexo</Text>
            <View style={[styles.input, { backgroundColor: inputBg, justifyContent: 'center' }]}>
               <Text style={{ color: textColor }}>Femenino</Text>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
            <Text style={[styles.label, { color: textColor }]}>Peso (kg)</Text>
            <TextInput 
              style={[styles.input, { color: textColor, backgroundColor: inputBg }]} 
              value={form.weight}
              keyboardType="numeric"
              onChangeText={(t) => setForm({...form, weight: t})}
            />
          </View>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={[styles.label, { color: textColor }]}>Altura (cm)</Text>
            <TextInput 
              style={[styles.input, { color: textColor, backgroundColor: inputBg }]} 
              value={form.height}
              keyboardType="numeric"
              onChangeText={(t) => setForm({...form, height: t})}
            />
          </View>
        </View>

        <Text style={[styles.sectionLabel, { color: subtextColor, marginTop: 24 }]}>Objetivos de Longevidad</Text>
        <View style={styles.inputGroup}>
          <TextInput 
            style={[styles.input, { color: textColor, backgroundColor: inputBg, height: 100, textAlignVertical: 'top', paddingTop: 12 }]} 
            value={form.goal}
            multiline
            onChangeText={(t) => setForm({...form, goal: t})}
          />
        </View>

        <TouchableOpacity 
            style={styles.saveBtn}
            onPress={() => {
                router.back();
            }}
        >
          <Text style={styles.saveBtnText}>Guardar Cambios</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
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
  inputGroup: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
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
