import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Send, ArrowLeft } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const colors = {
  primary: '#FF6B35',
  secondary: '#2C5F6F',
  accent: '#FFD700',
  background: '#FAF7F2',
  text: '#333333',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
};

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Hey there! 😊',
    timestamp: new Date(Date.now() - 3600000),
    isOwn: false,
  },
  {
    id: '2',
    text: 'Hi! Nice to meet you!',
    timestamp: new Date(Date.now() - 3500000),
    isOwn: true,
  },
  {
    id: '3',
    text: 'How are you doing today?',
    timestamp: new Date(Date.now() - 3000000),
    isOwn: false,
  },
  {
    id: '4',
    text: 'I\'m doing great! Love your photos btw 📸',
    timestamp: new Date(Date.now() - 2900000),
    isOwn: true,
  },
];

export default function ChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');

  const matchName = params.matchName || 'Simran';

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        timestamp: new Date(),
        isOwn: true,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.isOwn ? styles.ownMessage : styles.otherMessage,
      ]}>
      <View
        style={[
          styles.messageBubble,
          item.isOwn ? styles.ownBubble : styles.otherBubble,
        ]}>
        <Text
          style={[
            styles.messageText,
            item.isOwn ? styles.ownMessageText : styles.otherMessageText,
          ]}>
          {item.text}
        </Text>
      </View>
      <Text style={styles.messageTime}>
        {formatTime(item.timestamp)}
      </Text>
    </View>
  );

  const renderHeader = () => (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}>
        <ArrowLeft size={24} color={colors.white} />
      </TouchableOpacity>
      
      <View style={styles.headerCenter}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg' }}
          style={styles.headerImage}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{matchName}</Text>
          <Text style={styles.headerStatus}>Online now</Text>
        </View>
      </View>
      
      <View style={styles.headerRight} />
    </LinearGradient>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        />
        
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a message..."
              placeholderTextColor={colors.secondary}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                inputText.trim() ? styles.sendButtonActive : styles.sendButtonInactive,
              ]}
              onPress={sendMessage}
              disabled={!inputText.trim()}>
              <Send
                size={20}
                color={inputText.trim() ? colors.white : colors.secondary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerInfo: {
    marginLeft: 12,
  },
  headerName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  headerStatus: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.8,
  },
  headerRight: {
    width: 40,
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  ownMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  ownBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 8,
  },
  otherBubble: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 8,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  ownMessageText: {
    color: colors.white,
  },
  otherMessageText: {
    color: colors.text,
  },
  messageTime: {
    fontSize: 12,
    color: colors.secondary,
    marginTop: 4,
    marginHorizontal: 16,
  },
  inputContainer: {
    padding: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.lightGray,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 48,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: colors.primary,
  },
  sendButtonInactive: {
    backgroundColor: 'transparent',
  },
});