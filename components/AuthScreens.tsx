import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Eye, EyeOff, Phone, Mail, User, MapPin } from 'lucide-react-native';

const colors = {
  primary: '#FF6B35',
  secondary: '#2C5F6F',
  accent: '#FFD700',
  background: '#FAF7F2',
  text: '#333333',
  white: '#FFFFFF',
  error: '#E74C3C',
  success: '#27AE60',
  lightGray: '#F5F5F5',
};

interface AuthProps {
  onComplete: () => void;
}

export function WelcomeScreen({ onComplete }: AuthProps) {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.welcomeGradient}>
        <View style={styles.welcomeContent}>
          <View style={styles.logoContainer}>
            <Heart size={60} color={colors.white} fill={colors.white} />
            <Text style={styles.appName}>Pathankot Hearts</Text>
            <Text style={styles.tagline}>Find love in your city</Text>
          </View>
          
          <View style={styles.welcomeButtons}>
            <TouchableOpacity style={styles.primaryButton} onPress={onComplete}>
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Already have an account? Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

export function RegistrationScreen({ onComplete }: AuthProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    otp: '',
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.age && parseInt(formData.age) >= 18 && parseInt(formData.age) <= 65;
      case 2:
        return formData.email && formData.password.length >= 6;
      case 3:
        return formData.phone && formData.location;
      case 4:
        return formData.otp.length === 6;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        onComplete();
      }
    } else {
      Alert.alert('Error', 'Please fill all required fields correctly');
    }
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3, 4].map((step) => (
        <View
          key={step}
          style={[
            styles.stepDot,
            currentStep >= step ? styles.stepDotActive : styles.stepDotInactive,
          ]}
        />
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Let's get to know you</Text>
      <Text style={styles.stepSubtitle}>Tell us your basic information</Text>
      
      <View style={styles.inputContainer}>
        <User size={20} color={colors.secondary} />
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={formData.name}
          onChangeText={(text) => updateFormData('name', text)}
          placeholderTextColor={colors.secondary}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputIcon}>📅</Text>
        <TextInput
          style={styles.input}
          placeholder="Age (18-65)"
          value={formData.age}
          onChangeText={(text) => updateFormData('age', text)}
          keyboardType="numeric"
          placeholderTextColor={colors.secondary}
        />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Create your account</Text>
      <Text style={styles.stepSubtitle}>We'll keep your information secure</Text>
      
      <View style={styles.inputContainer}>
        <Mail size={20} color={colors.secondary} />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={formData.email}
          onChangeText={(text) => updateFormData('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={colors.secondary}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.passwordToggle}
          onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <EyeOff size={20} color={colors.secondary} />
          ) : (
            <Eye size={20} color={colors.secondary} />
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Create Password (min 6 characters)"
          value={formData.password}
          onChangeText={(text) => updateFormData('password', text)}
          secureTextEntry={!showPassword}
          placeholderTextColor={colors.secondary}
        />
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Where are you located?</Text>
      <Text style={styles.stepSubtitle}>This helps us find matches nearby</Text>
      
      <View style={styles.inputContainer}>
        <Phone size={20} color={colors.secondary} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={formData.phone}
          onChangeText={(text) => updateFormData('phone', text)}
          keyboardType="phone-pad"
          placeholderTextColor={colors.secondary}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <MapPin size={20} color={colors.secondary} />
        <TextInput
          style={styles.input}
          placeholder="Area/Colony (e.g., Dhangu Road, Civil Lines)"
          value={formData.location}
          onChangeText={(text) => updateFormData('location', text)}
          placeholderTextColor={colors.secondary}
        />
      </View>
      
      <Text style={styles.privacyNote}>
        🔒 Your exact location is kept private and never shared with other users
      </Text>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Verify your phone</Text>
      <Text style={styles.stepSubtitle}>We sent a code to {formData.phone}</Text>
      
      <View style={styles.otpContainer}>
        <TextInput
          style={styles.otpInput}
          placeholder="Enter 6-digit OTP"
          value={formData.otp}
          onChangeText={(text) => updateFormData('otp', text)}
          keyboardType="numeric"
          maxLength={6}
          placeholderTextColor={colors.secondary}
        />
      </View>
      
      <TouchableOpacity style={styles.resendButton}>
        <Text style={styles.resendText}>Resend Code</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Heart size={40} color={colors.primary} fill={colors.primary} />
            <Text style={styles.headerTitle}>Join Pathankot Hearts</Text>
          </View>

          {renderStepIndicator()}
          {renderCurrentStep()}

          <View style={styles.buttonContainer}>
            {currentStep > 1 && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setCurrentStep(currentStep - 1)}>
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={[
                styles.nextButton,
                !validateStep() && styles.nextButtonDisabled,
              ]}
              onPress={nextStep}
              disabled={!validateStep()}>
              <Text style={styles.nextButtonText}>
                {currentStep === 4 ? 'Complete Registration' : 'Continue'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  welcomeGradient: {
    flex: 1,
  },
  welcomeContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.white,
    marginTop: 20,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    color: colors.white,
    marginTop: 8,
    opacity: 0.9,
  },
  welcomeButtons: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  secondaryButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 12,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    gap: 12,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  stepDotActive: {
    backgroundColor: colors.primary,
  },
  stepDotInactive: {
    backgroundColor: '#E5E5E5',
  },
  stepContainer: {
    paddingHorizontal: 30,
    marginBottom: 40,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 16,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  inputIcon: {
    fontSize: 20,
  },
  passwordToggle: {
    padding: 4,
  },
  privacyNote: {
    fontSize: 14,
    color: colors.secondary,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 20,
  },
  otpContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  otpInput: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 20,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 8,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  resendButton: {
    alignItems: 'center',
  },
  resendText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingBottom: 40,
    gap: 12,
  },
  backButton: {
    flex: 1,
    backgroundColor: colors.lightGray,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  nextButton: {
    flex: 2,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#E5E5E5',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
});