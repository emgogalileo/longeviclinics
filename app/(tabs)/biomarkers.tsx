import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useState } from 'react';
import { biomarkersData, allSystems, Biomarker } from '@/utils/biomarkersData';

const { width } = Dimensions.get('window');

export default function BiomarkersScreen() {
  const isDark = useColorScheme() === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#000000';
  const subtextColor = isDark ? '#A0A0A0' : '#666666';

  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedBiomarker, setSelectedBiomarker] = useState<Biomarker | null>(null);
  const [showGraphPanel, setShowGraphPanel] = useState(true);

  const filteredBiomarkers = activeFilter === "Todos" 
    ? biomarkersData 
    : biomarkersData.filter((b: Biomarker) => b.system === activeFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return '#34C759';
      case 'warning': return '#FFCC00';
      case 'danger': return '#FF3B30';
      default: return '#8E8E93';
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F6F6F9' }]} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>Biomarcadores</Text>
        <Text style={[styles.subtitle, { color: subtextColor }]}>Seguimiento de precisión de tus sistemas</Text>
      </View>

      <Card style={{ marginBottom: 24, padding: 20 }}>
        <Text style={[styles.sectionTitle, { color: textColor, marginTop: 0 }]}>Estado General</Text>
        <View style={styles.statusRow}>
          <View style={styles.statusItem}>
            <View style={[styles.statusDot, { backgroundColor: '#34C759' }]} />
            <Text style={[styles.statusValue, { color: textColor }]}>280</Text>
            <Text style={[styles.statusLabel, { color: subtextColor }]}>Óptimos</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusDot, { backgroundColor: '#FFCC00' }]} />
            <Text style={[styles.statusValue, { color: textColor }]}>35</Text>
            <Text style={[styles.statusLabel, { color: subtextColor }]}>Alerta</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusDot, { backgroundColor: '#FF3B30' }]} />
            <Text style={[styles.statusValue, { color: textColor }]}>5</Text>
            <Text style={[styles.statusLabel, { color: subtextColor }]}>Críticos</Text>
          </View>
        </View>
      </Card>

      <View style={styles.viewToggleRow}>
        <Text style={[styles.sectionTitle, { color: textColor, marginTop: 0 }]}>Vista General</Text>
        <TouchableOpacity 
          style={[styles.toggleBtn, { backgroundColor: isDark ? '#1C1C1E' : '#E5E5EA' }]}
          onPress={() => setShowGraphPanel(!showGraphPanel)}
        >
          <Feather name={showGraphPanel ? "list" : "grid"} size={18} color={textColor} />
          <Text style={[styles.toggleBtnText, { color: textColor }]}>
            {showGraphPanel ? "Ver Lista" : "Ver Panel"}
          </Text>
        </TouchableOpacity>
      </View>

      {showGraphPanel ? (
        <View style={styles.systemsGrid}>
          {allSystems.map((system) => {
            const systemData = biomarkersData.filter(b => b.system === system);
            const dangerCount = systemData.filter(b => b.status === 'danger').length;
            const warningCount = systemData.filter(b => b.status === 'warning').length;
            
            return (
              <TouchableOpacity 
                key={system} 
                style={[styles.systemCard, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}
                onPress={() => {
                  setActiveFilter(system);
                  setShowGraphPanel(false);
                }}
              >
                <View style={[
                  styles.systemIcon, 
                  { backgroundColor: dangerCount > 0 ? '#FF3B3020' : warningCount > 0 ? '#FFCC0020' : '#34C75920' }
                ]}>
                  <Feather 
                    name={dangerCount > 0 ? "alert-triangle" : "check-circle"} 
                    size={20} 
                    color={dangerCount > 0 ? '#FF3B30' : warningCount > 0 ? '#FFCC00' : '#34C759'} 
                  />
                </View>
                <Text style={[styles.systemName, { color: textColor }]} numberOfLines={1}>{system}</Text>
                <Text style={[styles.systemStats, { color: subtextColor }]}>{systemData.length} marcadores</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <>
          <View style={styles.filterRow}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap: 8}}>
              {["Todos", ...allSystems].map((system: string) => (
                <TouchableOpacity 
                  key={system}
                  style={[
                    styles.filterChip, 
                    activeFilter === system && styles.filterChipActive,
                    activeFilter === system && { backgroundColor: textColor, borderColor: textColor }
                  ]}
                  onPress={() => setActiveFilter(system)}
                >
                  <Text style={[
                    styles.filterChipText, 
                    { color: textColor },
                    activeFilter === system && { color: isDark ? '#000' : '#FFF' }
                  ]}>
                    {system}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <Text style={[styles.sectionTitle, { color: textColor }]}>{activeFilter}</Text>
          
          {filteredBiomarkers.length === 0 ? (
            <Text style={{color: subtextColor, textAlign: 'center', marginVertical: 20}}>
              No hay datos simulados en esta categoría todavía.
            </Text>
          ) : (
            filteredBiomarkers.map((bm: Biomarker) => (
              <TouchableOpacity key={bm.id} onPress={() => setSelectedBiomarker(bm)}>
                <Card style={styles.biomarkerCard}>
                  <View style={styles.biomarkerHeader}>
                    <View style={styles.nameRow}>
                      <View style={[styles.indicatorLine, { backgroundColor: getStatusColor(bm.status) }]} />
                      <View style={{flex: 1}}>
                        <Text style={[styles.biomarkerName, { color: textColor }]}>{bm.name}</Text>
                        <Text style={[styles.biomarkerDesc, { color: subtextColor }]}>{bm.desc}</Text>
                      </View>
                      <Feather name="chevron-right" size={18} color={subtextColor} />
                    </View>
                  </View>
                  <View style={styles.valueRow}>
                    <Text style={[styles.currentValue, { color: textColor }]}>{bm.value} <Text style={styles.unit}>{bm.unit}</Text></Text>
                    <View style={[styles.trendBadge, { backgroundColor: getStatusColor(bm.status) + '20' }]}>
                      <Feather name={bm.trendDir === 'up' ? 'arrow-up-right' : 'arrow-down-right'} size={14} color={getStatusColor(bm.status)} />
                      <Text style={[styles.trendText, { color: getStatusColor(bm.status) }]}>{bm.trend}%</Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            ))
          )}
        </>
      )}

      {/* Modal de Detalle */}
      <Modal
        visible={!!selectedBiomarker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedBiomarker(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSelectedBiomarker(null)}>
                <Feather name="x" size={24} color={textColor} />
              </TouchableOpacity>
              <Text style={[styles.modalTitle, { color: textColor }]}>Detalle del Biomarcador</Text>
              <View style={{ width: 24 }} />
            </View>

            {selectedBiomarker && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.modalBody}>
                  <Text style={[styles.modalBmName, { color: textColor }]}>{selectedBiomarker.name}</Text>
                  <View style={[styles.modalStatusBadge, { backgroundColor: getStatusColor(selectedBiomarker.status) + '20' }]}>
                    <Text style={[styles.modalStatusText, { color: getStatusColor(selectedBiomarker.status) }]}>
                      {selectedBiomarker.status.toUpperCase()}
                    </Text>
                  </View>

                  <Text style={[styles.modalSectionTitle, { color: textColor }]}>Sobre este marcador</Text>
                  <Text style={[styles.modalText, { color: subtextColor }]}>{selectedBiomarker.details}</Text>

                  <Text style={[styles.modalSectionTitle, { color: textColor }]}>Rango y Método</Text>
                  <View style={styles.modalRangeRow}>
                    <View style={styles.rangeInfo}>
                      <Text style={[styles.rangeLabel, { color: subtextColor }]}>Método</Text>
                      <Text style={[styles.rangeText, { color: textColor }]}>{selectedBiomarker.method}</Text>
                    </View>
                    <View style={styles.rangeInfo}>
                      <Text style={[styles.rangeLabel, { color: subtextColor }]}>Óptimo</Text>
                      <Text style={[styles.rangeText, { color: '#34C759' }]}>
                        {selectedBiomarker.rangeOptimal[0]} - {selectedBiomarker.rangeOptimal[1]} {selectedBiomarker.unit}
                      </Text>
                    </View>
                  </View>

                  <Text style={[styles.modalSectionTitle, { color: textColor }]}>Recomendaciones Clave</Text>
                  {selectedBiomarker.recommendations.map((rec, i) => (
                    <View key={i} style={styles.recItem}>
                      <Feather name="check-circle" size={16} color="#34C759" />
                      <Text style={[styles.recText, { color: subtextColor }]}>{rec}</Text>
                    </View>
                  ))}
                  
                  <TouchableOpacity 
                    style={styles.modalCloseBtn}
                    onPress={() => setSelectedBiomarker(null)}
                  >
                    <Text style={styles.modalCloseBtnText}>Entendido</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

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
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statusItem: {
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  statusValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 12,
  },
  viewToggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  toggleBtnText: {
    fontSize: 12,
    fontWeight: '600',
  },
  systemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  systemCard: {
    width: (width - 60) / 2,
    padding: 16,
    borderRadius: 16,
    marginBottom: 0,
    alignItems: 'center',
  },
  systemIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  systemName: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  systemStats: {
    fontSize: 10,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '85%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBody: {
    paddingBottom: 40,
  },
  modalBmName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalStatusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 24,
  },
  modalStatusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
  },
  modalText: {
    fontSize: 14,
    lineHeight: 22,
  },
  modalRangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#007AFF08',
    padding: 16,
    borderRadius: 12,
  },
  rangeInfo: {
    flex: 1,
  },
  rangeLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  rangeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  recItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  recText: {
    fontSize: 14,
    flex: 1,
  },
  modalCloseBtn: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 32,
  },
  modalCloseBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  filterRow: {
    marginBottom: 24,
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  biomarkerCard: {
    padding: 20,
    marginBottom: 12,
  },
  biomarkerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicatorLine: {
    width: 4,
    height: 32,
    borderRadius: 2,
    marginRight: 12,
  },
  biomarkerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  biomarkerDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  currentValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  unit: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#666',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});
