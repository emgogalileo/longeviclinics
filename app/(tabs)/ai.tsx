import { ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useState, useRef } from 'react';

export default function AiScreen() {
  const isDark = useColorScheme() === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#000000';
  const subtextColor = isDark ? '#A0A0A0' : '#666666';

  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Hola Paz Molina Argueta, he analizado tus últimos laboratorios de precisión. ¿Sobre qué biomarcador te gustaría profundizar hoy?' }
  ]);
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);
  
  const handleSend = () => {
    if (inputText.trim()) {
      setChatMessages(prev => [...prev, { role: 'user', text: inputText.trim() }]);
      const currentInput = inputText.trim();
      setInputText("");
      // Simulate AI response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { role: 'ai', text: `Analizando datos clínicos para "${currentInput}". Basado en tu perfil de longevidad, este marcador es clave para tu optimización metabólica.` }]);
      }, 1000);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <ScrollView 
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F6F6F9' }]} 
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: textColor }]}>IA Clínica</Text>
        </View>

        <View style={styles.disclaimerBox}>
          <Feather name="shield" size={16} color="#007AFF" style={{marginTop: 2}} />
          <Text style={styles.disclaimerText}>
            Análisis basado en tus 320+ biomarcadores. Consulta siempre con tu equipo médico antes de realizar cambios en tu protocolo.
          </Text>
        </View>

        <Card style={styles.chatContainer}>
          {chatMessages.map((msg, idx) => (
            <View key={idx} style={[styles.messageBubble, msg.role === 'user' ? styles.userBubble : styles.aiBubble]}>
              <Text style={[styles.messageText, msg.role === 'user' ? { color: '#FFFFFF' } : { color: textColor }]}>
                {msg.text}
              </Text>
            </View>
          ))}
          
          {chatMessages.length === 1 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
              <TouchableOpacity style={styles.chip} onPress={() => setInputText("¿Por qué mi ApoB está en rango óptimo?")}>
                <Text style={[styles.chipText, { color: textColor }]}>🩸 Mi nivel de ApoB</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.chip} onPress={() => setInputText("¿Cómo influye mi HRV en mi edad biográfica?")}>
                <Text style={[styles.chipText, { color: textColor }]}>💤 HRV y Longevidad</Text>
              </TouchableOpacity>
            </ScrollView>
          )}

          <View style={styles.inputRow}>
            <TextInput 
              style={[styles.inputField, { color: textColor, backgroundColor: isDark ? '#1C1C1E' : '#F3F3F5' }]} 
              placeholder="Pregunta sobre tus resultados..." 
              placeholderTextColor={subtextColor}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSend}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
              <Feather name="arrow-up" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </Card>

        <Text style={[styles.sectionTitle, { color: textColor, marginTop: 24 }]}>Evaluación Guiada</Text>
        <View style={styles.gridContainer}>
          <Card style={styles.gridItem}>
            <View style={[styles.gridIcon, { backgroundColor: '#34C75920' }]}>
              <Feather name="zap" size={20} color="#34C759" />
            </View>
            <Text style={[styles.gridTitle, { color: textColor }]}>Energía</Text>
          </Card>
          <Card style={styles.gridItem}>
            <View style={[styles.gridIcon, { backgroundColor: '#FF3B3020' }]}>
              <Feather name="activity" size={20} color="#FF3B30" />
            </View>
            <Text style={[styles.gridTitle, { color: textColor }]}>Metabolismo</Text>
          </Card>
          <Card style={styles.gridItem}>
            <View style={[styles.gridIcon, { backgroundColor: '#007AFF20' }]}>
              <Feather name="smile" size={20} color="#007AFF" />
            </View>
            <Text style={[styles.gridTitle, { color: textColor }]}>Estrés</Text>
          </Card>
          <Card style={styles.gridItem}>
            <View style={[styles.gridIcon, { backgroundColor: '#AF52DE20' }]}>
              <Feather name="heart" size={20} color="#AF52DE" />
            </View>
            <Text style={[styles.gridTitle, { color: textColor }]}>Hormonas</Text>
          </Card>
        </View>

      <Text style={[styles.sectionTitle, { color: textColor, marginTop: 24 }]}>Preparación de Consulta</Text>
      <Card style={styles.questionsCard}>
        <Text style={[styles.questionsHeader, { color: textColor }]}>Preguntas sugeridas para tu próxima cita:</Text>
        
        <View style={styles.questionItem}>
          <Feather name="check-circle" size={16} color="#007AFF" style={{marginTop: 2}} />
          <Text style={[styles.questionText, { color: textColor }]}>
            ¿Cómo podemos optimizar mi nivel de Cistatina C para mejorar la función renal?
          </Text>
        </View>
        
        <View style={styles.questionItem}>
          <Feather name="check-circle" size={16} color="#007AFF" style={{marginTop: 2}} />
          <Text style={[styles.questionText, { color: textColor }]}>
            Basado en mi variabilidad cardiaca (HRV), ¿es momento de ajustar mi carga de entrenamiento?
          </Text>
        </View>
      </Card>

      <View style={{height: 40}} />
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
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  disclaimerBox: {
    flexDirection: 'row',
    backgroundColor: '#007AFF10',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF20',
    marginBottom: 24,
  },
  disclaimerText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12,
    color: '#007AFF',
    lineHeight: 18,
  },
  chatContainer: {
    padding: 16,
    marginBottom: 0,
  },
  messageBubble: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    maxWidth: '90%',
  },
  aiBubble: {
    backgroundColor: '#007AFF10',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  userBubble: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  chipsScroll: {
    marginBottom: 16,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    alignSelf: 'flex-start',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '46%',
    padding: 16,
    alignItems: 'center',
    marginBottom: 0,
  },
  gridIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  questionsCard: {
    padding: 16,
  },
  questionsHeader: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  questionItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  questionText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    lineHeight: 20,
  },
});
