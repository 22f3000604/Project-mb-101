import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { WelcomeScreen, RegistrationScreen } from '@/components/AuthScreens';

const colors = {
  background: '#FAF7F2',
};

export default function IndexScreen() {
  const [authStep, setAuthStep] = useState<'welcome' | 'register' | 'complete'>('welcome');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already authenticated
  useEffect(() => {
    // In a real app, check AsyncStorage or other auth state
    // For demo, we'll show the auth flow
    const checkAuthStatus = async () => {
      // Simulated auth check
      const userToken = false; // Replace with actual auth check
      if (userToken) {
        setIsAuthenticated(true);
      }
    };
    
    checkAuthStatus();
  }, []);

  const handleWelcomeComplete = () => {
    setAuthStep('register');
  };

  const handleRegistrationComplete = () => {
    setAuthStep('complete');
    setIsAuthenticated(true);
  };

  // Redirect to main app if authenticated
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  if (authStep === 'welcome') {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  if (authStep === 'register') {
    return <RegistrationScreen onComplete={handleRegistrationComplete} />;
  }

  return (
    <View style={styles.container}>
      {/* This shouldn't be reached, but just in case */}
      <Redirect href="/(tabs)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});