import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, X, MapPin, Info } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const colors = {
  primary: '#FF6B35',
  secondary: '#2C5F6F',
  accent: '#FFD700',
  background: '#FAF7F2',
  text: '#333333',
  white: '#FFFFFF',
  error: '#E74C3C',
  success: '#27AE60',
};

const profiles = [
  {
    id: 1,
    name: 'Simran',
    age: 24,
    location: 'Lives nearby',
    distance: '2 km away',
    images: ['https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg'],
    bio: 'Love exploring local cafes and enjoy traditional Punjabi music 🎵',
    interests: ['Music', 'Food', 'Travel', 'Photography'],
  },
  {
    id: 2,
    name: 'Arjun',
    age: 27,
    location: 'Lives nearby',
    distance: '1 km away',
    images: ['https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg'],
    bio: 'Fitness enthusiast and lover of Punjabi culture 💪',
    interests: ['Fitness', 'Culture', 'Movies', 'Cricket'],
  },
  {
    id: 3,
    name: 'Priya',
    age: 25,
    location: 'Lives nearby',
    distance: '3 km away',
    images: ['https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'],
    bio: 'Artist and dreamer. Love painting and classical dance 🎨',
    interests: ['Art', 'Dance', 'Books', 'Nature'],
  },
];

export default function DiscoveryScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const cardAnimation = useRef(new Animated.Value(0)).current;
  const likeAnimation = useRef(new Animated.Value(0)).current;
  const passAnimation = useRef(new Animated.Value(0)).current;

  const currentProfile = profiles[currentIndex];

  const animateCard = (direction: 'left' | 'right') => {
    const toValue = direction === 'right' ? width : -width;
    
    Animated.timing(cardAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex((prev) => (prev + 1) % profiles.length);
      cardAnimation.setValue(0);
    });
  };

  const animateButton = (animation: Animated.Value) => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLike = () => {
    animateButton(likeAnimation);
    setTimeout(() => animateCard('right'), 100);
  };

  const handlePass = () => {
    animateButton(passAnimation);
    setTimeout(() => animateCard('left'), 100);
  };

  if (!currentProfile) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
        <Text style={styles.headerSubtitle}>Pathankot</Text>
      </View>

      {/* Card Container */}
      <View style={styles.cardContainer}>
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ translateX: cardAnimation }],
            },
          ]}>
          <Image source={{ uri: currentProfile.images[0] }} style={styles.cardImage} />
          
          {/* Gradient Overlay */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.gradient}
          />

          {/* Profile Info */}
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>
                {currentProfile.name}, {currentProfile.age}
              </Text>
              <TouchableOpacity
                style={styles.infoButton}
                onPress={() => setShowInfo(!showInfo)}>
                <Info size={20} color={colors.white} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.locationRow}>
              <MapPin size={16} color={colors.white} />
              <Text style={styles.location}>{currentProfile.distance}</Text>
            </View>

            {showInfo && (
              <View style={styles.bioContainer}>
                <Text style={styles.bio}>{currentProfile.bio}</Text>
                <View style={styles.interestsContainer}>
                  {currentProfile.interests.map((interest, index) => (
                    <View key={index} style={styles.interestTag}>
                      <Text style={styles.interestText}>{interest}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </Animated.View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <Animated.View
          style={[
            styles.actionButton,
            styles.passButton,
            {
              transform: [
                {
                  scale: passAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.1],
                  }),
                },
              ],
            },
          ]}>
          <TouchableOpacity style={styles.actionButtonInner} onPress={handlePass}>
            <X size={28} color={colors.error} strokeWidth={3} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            styles.actionButton,
            styles.likeButton,
            {
              transform: [
                {
                  scale: likeAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.1],
                  }),
                },
              ],
            },
          ]}>
          <TouchableOpacity style={styles.actionButtonInner} onPress={handleLike}>
            <Heart size={28} color={colors.primary} strokeWidth={3} fill={colors.primary} />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        {profiles.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index === currentIndex && styles.progressDotActive,
            ]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: '500',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: width - 40,
    height: height * 0.7,
    borderRadius: 20,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  profileInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
  },
  infoButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  location: {
    fontSize: 16,
    color: colors.white,
    marginLeft: 6,
    fontWeight: '500',
  },
  bioContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  bio: {
    fontSize: 16,
    color: colors.white,
    lineHeight: 22,
    marginBottom: 12,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  interestText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    gap: 40,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  actionButtonInner: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passButton: {
    borderWidth: 2,
    borderColor: colors.error,
  },
  likeButton: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E5E5',
  },
  progressDotActive: {
    backgroundColor: colors.primary,
    width: 24,
  },
});