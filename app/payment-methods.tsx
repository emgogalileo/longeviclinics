import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Card } from '@/components/Card';

export default function PaymentMethodsScreen() {
  const isDark = useColorScheme() === 'dark';
  const router = useRouter();
  const textColor = isDark ? '#FFFFFF' : '#000000';
  const subtextColor = isDark ? '#A0A0A0' : '#666666';

  const cards = [
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/26', brand: 'Stripe' },
    { id: 2, type: 'Mastercard', last4: '8812', expiry: '09/25', brand: 'Stripe' }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F6F6F9' }]} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color={textColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: textColor }]}>Métodos de Pago</Text>
        <View style={{ width: 44 }} />
      </View>

      <Text style={[styles.sectionLabel, { color: subtextColor }]}>Tus Tarjetas (vía Stripe)</Text>
      
      {cards.map(card => (
        <Card key={card.id} style={styles.paymentCard}>
          <View style={styles.cardInfo}>
            <View style={styles.brandIcon}>
              <Feather name="credit-card" size={24} color="#007AFF" />
            </View>
            <View style={styles.details}>
              <Text style={[styles.cardTitle, { color: textColor }]}>{card.type} •••• {card.last4}</Text>
              <Text style={[styles.cardExpiry, { color: subtextColor }]}>Expira {card.expiry}</Text>
            </View>
            <TouchableOpacity>
              <Feather name="trash-2" size={20} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        </Card>
      ))}

      <TouchableOpacity style={[styles.addBtn, { borderColor: isDark ? '#333' : '#E5E5EA' }]}>
        <Feather name="plus" size={20} color="#007AFF" />
        <Text style={styles.addBtnText}>Añadir Nueva Tarjeta</Text>
      </TouchableOpacity>

      <Text style={[styles.sectionLabel, { color: subtextColor, marginTop: 32 }]}>Otras Opciones</Text>
      
      <TouchableOpacity style={[styles.googlePayBtn, { backgroundColor: '#000000' }]}>
        <Feather name="shopping-bag" size={20} color="#FFF" style={{marginRight: 10}} />
        <Text style={styles.googlePayText}>Google Pay</Text>
      </TouchableOpacity>

      <View style={styles.stripeBadge}>
        <Feather name="lock" size={14} color={subtextColor} />
        <Text style={[styles.stripeText, { color: subtextColor }]}>Pagos seguros procesados por Stripe</Text>
      </View>

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
  paymentCard: {
    padding: 16,
    marginBottom: 12,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#007AFF10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardExpiry: {
    fontSize: 12,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: 'dashed',
    marginTop: 8,
    gap: 8,
  },
  addBtnText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  googlePayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 14,
    marginTop: 8,
  },
  googlePayText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  stripeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    gap: 6,
  },
  stripeText: {
    fontSize: 12,
  },
});
