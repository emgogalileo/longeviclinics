import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Card } from '@/components/Card';
import { useState } from 'react';

export default function CheckoutScreen() {
  const isDark = useColorScheme() === 'dark';
  const router = useRouter();
  const { type, price, doctorName } = useLocalSearchParams();
  const textColor = isDark ? '#FFFFFF' : '#000000';
  const subtextColor = isDark ? '#A0A0A0' : '#666666';

  const [selectedMethod, setSelectedMethod] = useState('visa');

  const handlePay = () => {
    Alert.alert(
      "Pago Exitoso",
      "Tu consulta ha sido confirmada. El especialista se conectará en breve.",
      [{ text: "OK", onPress: () => router.push('/(tabs)/doctors') }]
    );
  };

  const serviceTitle = type === 'chat' ? 'Chat Médico Express' : 
                       type === 'phone' ? 'Llamada de Voz 24/7' : 
                       'Video Consulta HD';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F6F6F9' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="x" size={24} color={textColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: textColor }]}>Confirmar y Pagar</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.sectionLabel, { color: subtextColor }]}>Resumen del Servicio</Text>
        <Card style={styles.summaryCard}>
            <View style={styles.summaryRow}>
                <View style={styles.iconBox}>
                    <Feather name={type === 'chat' ? 'message-square' : type === 'phone' ? 'phone' : 'video'} size={24} color="#007AFF" />
                </View>
                <View style={{ flex: 1, marginLeft: 16 }}>
                    <Text style={[styles.serviceTitle, { color: textColor }]}>{serviceTitle}</Text>
                    <Text style={[styles.doctorName, { color: subtextColor }]}>Con: {doctorName || 'Especialista de Turno'}</Text>
                </View>
                <Text style={[styles.price, { color: textColor }]}>$150.00</Text>
            </View>
        </Card>

        <Text style={[styles.sectionLabel, { color: subtextColor, marginTop: 32 }]}>Método de Pago</Text>
        
        <TouchableOpacity 
            style={[styles.payMethod, selectedMethod === 'visa' && styles.selectedMethod, { backgroundColor: isDark ? '#1C1C1E' : '#FFF' }]}
            onPress={() => setSelectedMethod('visa')}
        >
            <Feather name="credit-card" size={20} color={selectedMethod === 'visa' ? '#007AFF' : subtextColor} />
            <Text style={[styles.methodText, { color: textColor }]}>Visa •••• 4242</Text>
            <View style={[styles.radio, selectedMethod === 'visa' && styles.radioActive]} />
        </TouchableOpacity>

        <TouchableOpacity 
            style={[styles.payMethod, selectedMethod === 'google' && styles.selectedMethod, { backgroundColor: isDark ? '#1C1C1E' : '#FFF' }]}
            onPress={() => setSelectedMethod('google')}
        >
            <Feather name="shopping-bag" size={20} color={selectedMethod === 'google' ? '#007AFF' : subtextColor} />
            <Text style={[styles.methodText, { color: textColor }]}>Google Pay</Text>
            <View style={[styles.radio, selectedMethod === 'google' && styles.radioActive]} />
        </TouchableOpacity>

        <View style={styles.totalBox}>
            <View style={styles.totalRow}>
                <Text style={[styles.totalLabel, { color: subtextColor }]}>Subtotal</Text>
                <Text style={[styles.totalValue, { color: textColor }]}>$150.00</Text>
            </View>
            <View style={styles.totalRow}>
                <Text style={[styles.totalLabel, { color: subtextColor }]}>Impuestos (IVA)</Text>
                <Text style={[styles.totalValue, { color: textColor }]}>$0.00</Text>
            </View>
            <View style={[styles.divider, { backgroundColor: isDark ? '#333' : '#EEE' }]} />
            <View style={styles.totalRow}>
                <Text style={[styles.grandTotalLabel, { color: textColor }]}>Total a Pagar</Text>
                <Text style={[styles.grandTotalValue, { color: '#007AFF' }]}>$150.00</Text>
            </View>
        </View>

        <TouchableOpacity style={styles.payBtn} onPress={handlePay}>
            <Text style={styles.payBtnText}>Pagar Ahora</Text>
        </TouchableOpacity>

        <Text style={styles.securityNote}>
            Pago seguro encriptado de punto a punto.
        </Text>
      </ScrollView>
    </View>
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
    paddingTop: 60,
    paddingBottom: 20,
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
  content: {
    padding: 24,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  summaryCard: {
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#007AFF10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  doctorName: {
    fontSize: 13,
    marginTop: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  payMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedMethod: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF05',
  },
  methodText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#C6C6C8',
  },
  radioActive: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  totalBox: {
    marginTop: 32,
    paddingHorizontal: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 14,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  grandTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  grandTotalValue: {
    fontSize: 22,
    fontWeight: '900',
  },
  payBtn: {
    backgroundColor: '#007AFF',
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  payBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  securityNote: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    marginTop: 20,
  }
});
