import { Tabs } from 'expo-router';
import React from 'react';
import { Feather } from '@expo/vector-icons';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : '#FFFFFF',
          borderTopColor: colorScheme === 'dark' ? '#333' : '#EEE',
        },
        tabBarLabelStyle: {
          fontSize: 10,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <Feather size={22} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="biomarkers"
        options={{
          title: 'Biomarcadores',
          tabBarIcon: ({ color }) => <Feather size={22} name="activity" color={color} />,
        }}
      />
      <Tabs.Screen
        name="doctors"
        options={{
          title: 'Doctores',
          tabBarIcon: ({ color }) => <Feather size={22} name="users" color={color} />,
        }}
      />
      <Tabs.Screen
        name="ai"
        options={{
          title: 'IA Médica',
          tabBarIcon: ({ color }) => <Feather size={22} name="cpu" color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Historial',
          tabBarIcon: ({ color }) => <Feather size={22} name="file-text" color={color} />,
        }}
      />
      <Tabs.Screen
        name="planes"
        options={{
          title: 'Planes',
          tabBarIcon: ({ color }) => <Feather size={22} name="star" color={color} />,
        }}
      />
    </Tabs>
  );
}
