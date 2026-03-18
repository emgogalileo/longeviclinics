import { ScrollView, StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';

const { width } = Dimensions.get('window');

export default function LongevityDetailsScreen() {
  const isDark = useColorScheme() === 'dark';
  const router = useRouter();
  const textColor = isDark ? '#FFFFFF' : '#000000';
  const subtextColor = isDark ? '#A0A0A0' : '#666666';

  const timelineData = [
    { year: 2021, crono: 38, bio: 35 },
    { year: 2022, crono: 39, bio: 35 },
    { year: 2023, crono: 40, bio: 34 },
    { year: 2024, crono: 41, bio: 35 },
    { year: 2025, crono: 42, bio: 36 },
  ];

  const scoreBreakdown = [
    { name: 'Metabolismo', score: 88, color: '#34C759', icon: 'zap' },
    { name: 'Cardiovascular', score: 92, color: '#007AFF', icon: 'heart' },
    { name: 'Hormonal', score: 78, color: '#AF52DE', icon: 'activity' },
    { name: 'Sensibilidad Insulina', score: 85, color: '#FF9500', icon: 'droplet' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F6F6F9' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color={textColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: textColor }]}>Análisis de Longevidad</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.mainScoreCard}>
            <Text style={[styles.sectionTitle, { color: textColor, marginTop: 0 }]}>Longevity Score</Text>
            <View style={styles.scoreCircleRow}>
                <View style={styles.scoreValueContainer}>
                    <Text style={[styles.scoreValue, { color: textColor }]}>85</Text>
                    <Text style={[styles.scoreSub, { color: subtextColor }]}>ptos</Text>
                </View>
                <View style={styles.mainStats}>
                    <View style={styles.mainStatItem}>
                        <Text style={[styles.statValue, { color: '#34C759' }]}>-6 años</Text>
                        <Text style={[styles.statLabel, { color: subtextColor }]}>Ventaja Bio</Text>
                    </View>
                    <View style={styles.mainStatItem}>
                        <Text style={[styles.statValue, { color: '#007AFF' }]}>98%</Text>
                        <Text style={[styles.statLabel, { color: subtextColor }]}>Percentil</Text>
                    </View>
                </View>
            </View>
        </Card>

        <Text style={[styles.sectionTitle, { color: textColor }]}>Línea de Tiempo: Bio vs Crono</Text>
        <Card style={styles.graphCard}>
            <View style={styles.chartContainer}>
                {timelineData.map((d, i) => (
                    <View key={i} style={styles.chartCol}>
                        <View style={styles.barGroup}>
                            <View style={[styles.bar, { height: d.crono * 3, backgroundColor: '#E5E5EA' }]} />
                            <View style={[styles.bar, { height: d.bio * 3, backgroundColor: '#34C759', position: 'absolute', bottom: 0 }]} />
                        </View>
                        <Text style={[styles.yearLabel, { color: subtextColor }]}>{d.year}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.chartLegend}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#E5E5EA' }]} />
                    <Text style={[styles.legendText, { color: subtextColor }]}>Cronológica</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#34C759' }]} />
                    <Text style={[styles.legendText, { color: subtextColor }]}>Biológica</Text>
                </View>
            </View>
        </Card>

        <Text style={[styles.sectionTitle, { color: textColor }]}>Desglose del Score</Text>
        {scoreBreakdown.map((item, i) => (
            <Card key={i} style={styles.breakdownCard}>
                <View style={styles.breakdownHeader}>
                    <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
                        <Feather name={item.icon as any} size={20} color={item.color} />
                    </View>
                    <View style={{flex: 1, marginLeft: 12}}>
                        <Text style={[styles.itemName, { color: textColor }]}>{item.name}</Text>
                        <Text style={[styles.itemValue, { color: item.color }]}>{item.score}/100</Text>
                    </View>
                </View>
                <ProgressBar progress={item.score / 100} color={item.color} height={6} />
            </Card>
        ))}

        <View style={{height: 40}} />
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
  mainScoreCard: {
    padding: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
  },
  scoreCircleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreValueContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 8,
    borderColor: '#34C759',
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  scoreSub: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  mainStats: {
    flex: 1,
    marginLeft: 24,
  },
  mainStatItem: {
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
  },
  graphCard: {
    padding: 24,
    marginBottom: 24,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 200,
    marginBottom: 20,
    paddingTop: 20,
  },
  chartCol: {
    alignItems: 'center',
    width: (width - 100) / 5,
  },
  barGroup: {
    width: 12,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#F2F2F7',
  },
  bar: {
    width: '100%',
    borderRadius: 6,
  },
  yearLabel: {
    marginTop: 12,
    fontSize: 10,
    fontWeight: 'bold',
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
  },
  breakdownCard: {
    padding: 16,
    marginBottom: 12,
  },
  breakdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemValue: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
  },
});
