import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db } from '../../firebaseConfig';
import { collection, query, where, onSnapshot, orderBy, updateDoc, doc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { getCurrentUser } from '@/firebaseService/AuthService';
import { useFocusEffect } from '@react-navigation/native';

interface ChatMessage {
  id: string;
  userId: string; // Sender's ID
  recipientId: string; // Recipient's ID
  text: string;
  userName: string;
  createdAt: Date;
  ownerId: string;
}

interface ChatRequest {
  id: string;
  adopterId: string;
  ownerId: string;
  status: string;
  isRequest: boolean; // Flag for identifying requests
}

type ChatItem = ChatMessage | ChatRequest;

// Type guard to check if the item is a ChatMessage
function isChatMessage(item: ChatItem): item is ChatMessage {
  return (item as ChatMessage).userName !== undefined;
}

const ChatListScreen = () => {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const userId = getCurrentUser().uid;
  const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const fetchChats = useCallback(() => {
    const chatsRef = collection(db, 'chatMessages');
    const chatRequestsRef = collection(db, 'chatRequests');

    const receivedRequestsQuery = query(chatRequestsRef, where('ownerId', '==', userId), where('status', '==', 'pending'));
    const sentMessagesQuery = query(chatsRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
    const receivedMessagesQuery = query(chatsRef, where('recipientId', '==', userId), orderBy('createdAt', 'desc'));

    const chatMap = new Map<string, ChatItem>();

    // Fetch pending chat requests
    const unsubscribeRequests = onSnapshot(receivedRequestsQuery, (requestSnapshot) => {
      const requestList = requestSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        isRequest: true, // Flag to identify it's a request
      } as ChatRequest));

      requestList.forEach((request) => {
        chatMap.set(request.adopterId, request); // Group by adopterId
      });
      setChats(Array.from(chatMap.values()));
    });

    // Fetch sent messages
    const unsubscribeSent = onSnapshot(sentMessagesQuery, (sentQuerySnapshot) => {
      const sentList = sentQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as ChatMessage));

      sentList.forEach((message) => {
        chatMap.set(message.recipientId, message); // Group by recipientId
      });
      setChats(Array.from(chatMap.values()));
    });

    // Fetch received messages
    const unsubscribeReceived = onSnapshot(receivedMessagesQuery, (receivedQuerySnapshot) => {
      const receivedList = receivedQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as ChatMessage));

      receivedList.forEach((message) => {
        chatMap.set(message.userId, message); // Group by userId
      });
      setChats(Array.from(chatMap.values()));
    });

    return () => {
      unsubscribeRequests();
      unsubscribeSent();
      unsubscribeReceived();
    };
  }, [userId]);

  useEffect(() => {
    const unsubscribe = fetchChats();
    return () => unsubscribe();
  }, [fetchChats]);

  const handleAcceptRequest = async (requestId: string, adopterId: string) => {
    const requestRef = doc(db, 'chatRequests', requestId);

    try {
      await updateDoc(requestRef, { status: 'accepted' });
      Alert.alert('Request accepted', 'You can now chat with the adopter.');
      router.push({
        pathname: '/(tabs)/telaChat',
        params: {
          animalOwner: userId,
          animalAdopter: adopterId,
        },
      });
    } catch (error) {
      console.error('Error accepting request:', error);
      Alert.alert('Error', 'Failed to accept the request.');
    }
  };

  const renderChatItem = ({ item }: { item: ChatItem }) => {
    if (isChatMessage(item)) {
      // If it's a chat message, render the message details
      return (
        <TouchableOpacity
          onPress={() => 
            router.push({
              pathname: '/(tabs)/telaChat',
              params: {
                animalOwner: item.ownerId,
                animalAdopter: userId,
              },
            })
          }
          style={styles.chatItem}
        >
          <Text style={styles.chatTitle}>Conversa com {item.userName}</Text>
          <Text>{item.text}</Text>
        </TouchableOpacity>
      );
    } else {
      // If it's a chat request, show the accept option
      return (
        <TouchableOpacity 
          onPress={() => handleAcceptRequest(item.id, item.adopterId)} 
          style={styles.chatItem}
        >
          <Text style={styles.chatTitle}>Request from {item.adopterId}</Text>
          <Text>Click to accept and start chatting</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhuma conversa disponível.</Text>}
      />
    </View>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  chatItem: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },
  chatTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});
