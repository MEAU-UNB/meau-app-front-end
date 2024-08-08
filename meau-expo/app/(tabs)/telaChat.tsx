import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { db } from '../../firebaseConfig';
import { collection, query, orderBy, onSnapshot, Timestamp, doc, writeBatch } from 'firebase/firestore';
import { useGlobalSearchParams } from 'expo-router';

interface ChatMessage {
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: string;
    name: string;
  };
}

const ChatScreen = () => {
  const params = useGlobalSearchParams();
  const ownerId = params.animalOwner as string;
  const adopterId = params.animalAdopter as string;

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!adopterId || !ownerId) {
      console.log("Error: Invalid IDs");
      return;
    }

    const messagesRef = collection(db, 'chatMessages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const filteredMessages = querySnapshot.docs
        .filter((doc) => {
          const data = doc.data();
          return (
            (data.userId === adopterId && data.recipientId === ownerId) ||
            (data.userId === ownerId && data.recipientId === adopterId)
          );
        })
        .map((doc) => {
          const data = doc.data();
          return {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt.toDate(),
            user: {
              _id: data.userId,
              name: data.userName,
            },
          };
        }) as ChatMessage[];
      setMessages(filteredMessages);
    });

    return () => unsubscribe();
  }, [adopterId, ownerId]);

  const handleSend = async (newMessages: IMessage[] = []) => {
    const batch = writeBatch(db);

    newMessages.forEach((message) => {
      const messageRef = doc(collection(db, 'chatMessages'));
      batch.set(messageRef, {
        text: message.text,
        createdAt: Timestamp.fromDate(new Date()),
        userId: adopterId,
        userName: 'Adopter Name',
        recipientId: ownerId,
      });
    });

    try {
      await batch.commit();
    } catch (error) {
      console.error('Error sending messages:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{
          _id: adopterId,
          name: 'Adopter Name',
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;
