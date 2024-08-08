import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../../firebaseConfig';
import { collection, query, where, onSnapshot, getDoc, doc, orderBy } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { getCurrentUser } from '@/firebaseService/AuthService';
import { useFocusEffect } from '@react-navigation/native';

const ChatListScreen = () => {
  const [chats, setChats] = useState<any[]>([]);
  const userId = getCurrentUser().uid.toString();
  const router = useRouter();

  const fetchChats = useCallback(() => {
    // Query pra mensagens q enviei
    const chatsRef = collection(db, 'chatMessages');
    const sentMessagesQuery = query(chatsRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));

    // Query pra mensagens q recebi
    const receivedMessagesQuery = query(chatsRef, where('recipientId', '==', userId), orderBy('createdAt', 'desc'));

    const unsubscribeSent = onSnapshot(sentMessagesQuery, async (sentQuerySnapshot) => {
      const chatMap: { [key: string]: any } = {};

      sentQuerySnapshot.docs.forEach((doc) => {
        const data = doc.data();
        const otherUserId = data.recipientId;

        // update se for mais nova
        if (!chatMap[otherUserId] || data.createdAt.toDate() > chatMap[otherUserId].timestamp) {
          chatMap[otherUserId] = {
            id: otherUserId,
            lastMessage: data.text,
            timestamp: data.createdAt.toDate(),
          };
        }
      });

      // Query pra mensagens
      const unsubscribeReceived = onSnapshot(receivedMessagesQuery, async (receivedQuerySnapshot) => {
        receivedQuerySnapshot.docs.forEach((doc) => {
          const data = doc.data();
          const otherUserId = data.userId;

          // update
          if (!chatMap[otherUserId] || data.createdAt.toDate() > chatMap[otherUserId].timestamp) {
            chatMap[otherUserId] = {
              id: otherUserId,
              lastMessage: data.text,
              timestamp: data.createdAt.toDate(),
            };
          }
        });

        // convertee mensagens pra array e pega timestamp
        const chatList = Object.values(chatMap);
        chatList.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()); // Sort by most recent message

        // logicazinha pra pegar mensagem de todos os users
        const usernamePromises = chatList.map(async (chat) => {
          const userRef = doc(db, 'users', chat.id);
          const userDoc = await getDoc(userRef);
          return {
            ...chat,
            username: userDoc.exists() ? userDoc.data()?.username || 'Unknown' : 'Unknown',
          };
        });

        const chatsWithUsernames = await Promise.all(usernamePromises);

        console.log("Grouped chatList with usernames: ", JSON.stringify(chatsWithUsernames, null, 2));
        setChats(chatsWithUsernames);
      });

      return () => {
        unsubscribeReceived();
      };
    });

    return () => {
      unsubscribeSent();
    };
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      fetchChats();
    }, [fetchChats])
  );

  const renderChatItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        onPress={() => 
          router.push({
            pathname: '/(tabs)/telaChat',
            params: {
              animalOwner: item.id,
              animalAdopter: userId,
            },
          })
        }
        style={styles.chatItem}
      >
        <Text style={styles.chatTitle}>Conversa com {item.username}</Text>
        <Text>{item.lastMessage}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  chatTitle: {
    fontSize: 16,
  },
});

export default ChatListScreen;
