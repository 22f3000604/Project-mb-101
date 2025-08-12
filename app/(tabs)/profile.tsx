import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, CreditCard as Edit3, Settings, Shield, MapPin, Bell, Heart, LogOut } from 'lucide-react-native';

const colors = {
  primary: '#FF6B35',
  secondary: '#2C5F6F',
  accent: '#FFD700',
  background: '#FAF7F2',
  text: '#333333',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  error: '#E74C3C',
};

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationVisible, setLocationVisible] = useState(true);
  const [profile, setProfile] = useState({
    name: 'Rajdeep Singh',
    age: 26,
    bio: 'Software developer who loves exploring Pathankot\'s cafes and local culture. Always up for adventures! 🎯',
    location: 'Pathankot, Punjab',
    interests: ['Technology', 'Food', 'Travel', 'Photography', 'Music'],
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  const renderHeader = () => (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}>
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg' }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.cameraButton}>
          <Camera size={16} color={colors.white} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.profileHeaderInfo}>
        <Text style={styles.profileName}>
          {profile.name}, {profile.age}
        </Text>
        <View style={styles.locationContainer}>
          <MapPin size={16} color={colors.white} />
          <Text style={styles.profileLocation}>{profile.location}</Text>
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setIsEditing(!isEditing)}>
        <Edit3 size={20} color={colors.white} />
      </TouchableOpacity>
    </LinearGradient>
  );

  const renderBioSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>About Me</Text>
      {isEditing ? (
        <TextInput
          style={styles.bioInput}
          value={profile.bio}
          onChangeText={(text) => setProfile({ ...profile, bio: text })}
          multiline
          placeholder="Tell people about yourself..."
          placeholderTextColor={colors.secondary}
        />
      ) : (
        <Text style={styles.bioText}>{profile.bio}</Text>
      )}
    </View>
  );

  const renderInterestsSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Interests</Text>
      <View style={styles.interestsContainer}>
        {profile.interests.map((interest, index) => (
          <View key={index} style={styles.interestTag}>
            <Text style={styles.interestText}>{interest}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderSettingsSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Settings</Text>
      
      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Bell size={20} color={colors.secondary} />
          <Text style={styles.settingText}>Notifications</Text>
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: '#E5E5E5', true: colors.primary }}
          thumbColor={colors.white}
        />
      </View>
      
      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Shield size={20} color={colors.secondary} />
          <Text style={styles.settingText}>Show Location</Text>
        </View>
        <Switch
          value={locationVisible}
          onValueChange={setLocationVisible}
          trackColor={{ false: '#E5E5E5', true: colors.primary }}
          thumbColor={colors.white}
        />
      </View>
      
      <TouchableOpacity style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Settings size={20} color={colors.secondary} />
          <Text style={styles.settingText}>Privacy Settings</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Heart size={20} color={colors.secondary} />
          <Text style={styles.settingText}>Dating Preferences</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderBioSection()}
        {renderInterestsSection()}
        {renderSettingsSection()}
        
        {isEditing && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => setIsEditing(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.saveButton]}
              onPress={handleSaveProfile}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        )}
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color={colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: colors.white,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  profileHeaderInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileLocation: {
    fontSize: 16,
    color: colors.white,
    marginLeft: 6,
    opacity: 0.9,
  },
  editButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  bioText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  bioInput: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  interestTag: {
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  interestText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 16,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 20,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.lightGray,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 16,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: colors.error,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
    marginLeft: 8,
  },
});