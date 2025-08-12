import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, MessageCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const colors = {
  primary: '#FF6B35',
  secondary: '#2C5F6F',
  accent: '#FFD700',
  background: '#FAF7F2',
  text: '#333333',
  white: '#FFFFFF',
};

const matches = [
  {
    id: 1,
    name: 'Simran',
    age: 24,
    image: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg',
    isNewMatch: true,
    lastMessage: 'Hey there! 😊',
    timestamp: '2 min ago',
  },
  {
    id: 2,
    name: 'Arjun',
    age: 27,
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
    isNewMatch: false,
    lastMessage: 'How was your day?',
    timestamp: '1 hour ago',
  },
  {
    id: 3,
    name: 'Priya',
    age: 25,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    isNewMatch: true,
    lastMessage: 'Nice to meet you!',
    timestamp: '5 min ago',
  },
];

export default function MatchesScreen() {
  const router = useRouter();

  const handleChatPress = (match: any) => {
    // Navigate to chat screen with match data
    router.push({
      pathname: '/chat',
      params: { matchId: match.id, matchName: match.name },
    });
  };

  const renderMatch = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.matchCard}
      onPress={() => handleChatPress(item)}
      activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.matchImage} />
        {item.isNewMatch && (
          <View style={styles.newMatchBadge}>
            <Heart size={12} color={colors.white} fill={colors.white} />
          </View>
        )}
      </View>
      
      <View style={styles.matchInfo}>
        <View style={styles.matchHeader}>
          <Text style={styles.matchName}>{item.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      
      <TouchableOpacity style={styles.chatButton}>
        <MessageCircle size={20} color={colors.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Your Matches</Text>
          <Text style={styles.headerSubtitle}>
            {matches.filter(m => m.isNewMatch).length} new matches
          </Text>
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      
      <View style={styles.content}>
        {matches.length > 0 ? (
          <FlatList
            data={matches}
            renderItem={renderMatch}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyState}>
            <Heart size={64} color={colors.secondary} />
            <Text style={styles.emptyTitle}>No matches yet</Text>
            <Text style={styles.emptySubtitle}>
              Keep swiping to find your perfect match!
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerGradient: {
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  matchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  matchImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  newMatchBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  matchInfo: {
    flex: 1,
    marginLeft: 16,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  matchName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  timestamp: {
    fontSize: 12,
    color: colors.secondary,
  },
  lastMessage: {
    fontSize: 14,
    color: colors.secondary,
  },
  chatButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});