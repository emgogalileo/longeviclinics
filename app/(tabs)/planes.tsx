import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function PlanesScreen() {
  const isDark = useColorScheme() === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#000000';
  const subtextColor = isDark ? '#A0A0A0' : '#666666';

  const longevityPlans = [
    { 
      title: "Plan Fundamental", 
      desc: "Optimización básica metabólica y hormonal.", 
      price: "$200",
      details: ["Consulta inicial", "Perfil metabólico", "Plan nutricional base"] 
    },
    { 
      title: "Plan Vitalidad", 
      desc: "Enfoque en energía, sueño y recuperación.", 
      price: "$450",
      details: ["Higiene del sueño", "Optimización magnesio/B12", "Monitoreo de estrés"] 
    },
    { 
      title: "Plan Cognitivo", 
      desc: "Neuroprotección y enfoque mental agudo.", 
      price: "$800",
      details: ["Suplementación nootrópica", "Test cognitivo inicial", "Control homocisteína"] 
    },
    { 
      title: "Plan Rendimiento", 
      desc: "Para atletas y optimización física extrema.", 
      price: "$1500",
      details: ["Biometría hemática Pro", "Perfil hormonal completo", "Asesoría deportiva"] 
    },
    { 
      title: "Plan Celular", 
      desc: "Limpieza celular y control de edad biológica.", 
      price: "$3000",
      details: ["Activadores sirtuinas", "Limpieza senolítica", "Edad Biológica DNA"] 
    }
  ];

  const biomarkerPlans = [
    { 
      title: "Panel Esencial", 
      count: "70", 
      desc: "Métricas base de salud cardiovascular y metabólica.", 
      price: "$200",
      details: ["Lípidos y ApoB", "Glucosa y Ayunas", "Hemograma Completo", "Perfil Renal Base", "2 Chequeos al año"]
    },
    { 
      title: "Panel Avanzado", 
      count: "150", 
      desc: "Análisis profundo de inflamación y balance hormonal.", 
      price: "$500", 
      recommended: true,
      details: ["Marcadores Inflamatorios", "Hormonas Sexuales", "Vitaminas y Minerales", "Función Hepática Pro", "2 Chequeos al año"]
    },
    { 
      title: "Panel Longevidad Plus", 
      count: "320+", 
      desc: "El mapeo biológico más completo disponible hoy.", 
      price: "$1000",
      details: ["Edad Biológica (DNAm)", "Metabolómica Celular", "Marcadores Senescencia", "Genética de Precisión", "2 Chequeos al año"]
    }
  ];

  const consultationServices = [
    { name: "Medicina Interna", price: "$120", range: "$50 - $150", icon: "heart" },
    { name: "Genética Clínica", price: "$150", range: "$50 - $150", icon: "activity" },
    { name: "Nutrición Longevidad", price: "$80", range: "$50 - $150", icon: "coffee" },
    { name: "Salud Mental", price: "$100", range: "$50 - $150", icon: "smile" },
    { name: "Biogerontología", price: "$150", range: "$50 - $150", icon: "layers" },
    { name: "Health Coaching", price: "$50", range: "$50 - $150", icon: "check-circle" }
  ];

  const additionalServices = [
    { name: "Chequeo de Orina", price: "$50", icon: "droplet" },
    { name: "Chequeo de Heces", price: "$60", icon: "database" },
    { name: "Prueba Genética Pro", price: "$450", icon: "git-branch" }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F6F6F9' }]} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>Mis Planes</Text>
      </View>

      <Text style={[styles.sectionTitle, { color: textColor }]}>Planes de Longevidad (Pago Único)</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
        {longevityPlans.map((plan, idx) => (
          <Card key={idx} style={styles.planCard}>
            <View style={styles.planIcon}>
              <Feather name="shield" size={24} color="#007AFF" />
            </View>
            <Text style={[styles.planTitle, { color: textColor }]}>{plan.title}</Text>
            <Text style={[styles.planDesc, { color: subtextColor }]} numberOfLines={2}>{plan.desc}</Text>
            
            <View style={styles.detailsList}>
              {plan.details.map((detail, i) => (
                <View key={i} style={styles.detailItem}>
                  <Feather name="check" size={12} color="#34C759" />
                  <Text style={[styles.detailText, { color: subtextColor }]}>{detail}</Text>
                </View>
              ))}
            </View>

            <View style={styles.priceRow}>
              <Text style={[styles.planPrice, { color: textColor }]}>{plan.price}</Text>
              <Text style={[styles.planInterval, { color: subtextColor }]}>(Único)</Text>
            </View>
            <TouchableOpacity style={styles.btnSubscribe}>
              <Text style={styles.btnText}>Contratar</Text>
            </TouchableOpacity>
          </Card>
        ))}
      </ScrollView>

      <Text style={[styles.sectionTitle, { color: textColor, marginTop: 32 }]}>Paneles de Biomarcadores (Anual)</Text>
      {biomarkerPlans.map((plan, idx) => (
        <Card key={idx} style={[styles.biomarkerCard, plan.recommended && styles.recommendedCard]}>
          {plan.recommended && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Más Popular</Text>
            </View>
          )}
          <View style={styles.cardHeader}>
            <View>
              <Text style={[styles.bmTitle, { color: textColor }]}>{plan.title}</Text>
              <Text style={[styles.bmCount, { color: '#007AFF' }]}>{plan.count} Biomarcadores</Text>
            </View>
            <Text style={[styles.bmPrice, { color: textColor }]}>{plan.price}</Text>
          </View>
          <Text style={[styles.bmDesc, { color: subtextColor }]}>{plan.desc}</Text>
          
          <View style={styles.detailsGrid}>
            {plan.details.map((detail, i) => (
              <View key={i} style={styles.detailItemBM}>
                <View style={styles.bullet} />
                <Text style={[styles.detailTextBM, { color: subtextColor }]}>{detail}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={[styles.btnSubscribeBM, plan.recommended && styles.btnRecommended]}>
            <Text style={[styles.btnText, plan.recommended && { color: '#FFF' }]}>Agendar Panel</Text>
          </TouchableOpacity>
        </Card>
      ))}

      <Text style={[styles.sectionTitle, { color: textColor, marginTop: 32 }]}>Consultas Especializadas</Text>
      <View style={styles.servicesGrid}>
        {consultationServices.map((service, i) => (
            <Card key={i} style={styles.serviceCard}>
                <Feather name={service.icon as any} size={20} color="#007AFF" />
                <Text style={[styles.serviceName, { color: textColor }]}>{service.name}</Text>
                <Text style={[styles.servicePrice, { color: '#34C759' }]}>{service.price}</Text>
                <Text style={[styles.serviceRange, { color: subtextColor }]}>{service.range}</Text>
                <TouchableOpacity style={styles.serviceBtn}>
                    <Text style={styles.serviceBtnText}>Agendar</Text>
                </TouchableOpacity>
            </Card>
        ))}
      </View>

      <Text style={[styles.sectionTitle, { color: textColor, marginTop: 32 }]}>Pruebas Adicionales</Text>
      <View style={styles.servicesGrid}>
        {additionalServices.map((service, i) => (
            <Card key={i} style={styles.serviceCard}>
                <Feather name={service.icon as any} size={20} color="#007AFF" />
                <Text style={[styles.serviceName, { color: textColor }]}>{service.name}</Text>
                <Text style={[styles.servicePrice, { color: '#34C759' }]}>{service.price}</Text>
                <TouchableOpacity style={styles.serviceBtn}>
                    <Text style={styles.serviceBtnText}>Pedir</Text>
                </TouchableOpacity>
            </Card>
        ))}
      </View>

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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  horizontalScroll: {
    gap: 16,
    paddingRight: 24,
  },
  planCard: {
    width: 220,
    marginRight: 16,
    padding: 20,
    marginBottom: 0,
  },
  planIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#007AFF15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  planDesc: {
    fontSize: 12,
    marginBottom: 12,
    lineHeight: 16,
    height: 32,
  },
  detailsList: {
    marginBottom: 8,
    height: 80,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  detailText: {
    fontSize: 11,
    flex: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 16,
    marginBottom: 16,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  planInterval: {
    fontSize: 12,
    marginLeft: 4,
  },
  btnSubscribe: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  biomarkerCard: {
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 16,
  },
  recommendedCard: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderBottomLeftRadius: 12,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    marginTop: 4,
  },
  bmTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bmCount: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  bmPrice: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bmDesc: {
    fontSize: 13,
    marginBottom: 16,
    lineHeight: 18,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 8,
  },
  detailItemBM: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    gap: 6,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#007AFF',
  },
  detailTextBM: {
    fontSize: 10,
    flex: 1,
  },
  btnSubscribeBM: {
    backgroundColor: '#1C1C1E',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnRecommended: {
    backgroundColor: '#007AFF',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    padding: 16,
    alignItems: 'center',
    marginBottom: 0,
  },
  serviceName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  serviceRange: {
    fontSize: 9,
    marginBottom: 12,
  },
  serviceBtn: {
    backgroundColor: '#EEE',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  serviceBtnText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
});
