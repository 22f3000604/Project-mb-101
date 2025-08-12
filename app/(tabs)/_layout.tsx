import { Tabs } from 'expo-router';
import { Heart, MessageCircle, User, Compass } from 'lucide-react-native';
import { View, Text, StyleSheet } from 'react-native';

const colors = {
  primary: '#FF6B35',
  secondary: '#2C5F6F',
  accent: '#FFD700',
  background: '#FAF7F2',
  text: '#333333',
  tabBackground: '#FFFFFF',
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
        tabBarStyle: {
          backgroundColor: colors.tabBackground,
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Discover',
          tabBarIcon: ({ size, color }) => (
            <Compass size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: 'Matches',
          tabBarIcon: ({ size, color }) => (
            <Heart size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ size, color }) => (
            <MessageCircle size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}