import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { db } from '../../firebaseConfig';
import { collection, query, orderBy, onSnapshot, Timestamp, doc, writeBatch, getDoc } from 'firebase/firestore';
import { useGlobalSearchParams } from 'expo-router';
import * as Notifications from "expo-notifications";

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
  const [adopterName, setAdopterName] = useState<string>('');

  useEffect(() => {
    if (!adopterId || !ownerId) {
      console.log("Error: Invalid IDs");
      return;
    }

    // Fetch adopter's username
    const fetchAdopterName = async () => {
      try {
        const userRef = doc(db, 'users', adopterId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setAdopterName(userData?.username || 'Adopter Name');
        }
      } catch (error) {
        console.error('Error fetching adopter name:', error);
      }
    };

    fetchAdopterName();

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

  const fetchRecipientPushToken = async (recipientId: string) => {
    const userRef = doc(db, 'users', recipientId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData?.pushToken || null;
    }
    return null;
  };

  const sendPushNotification = async (recipientPushToken: string, messageText: string) => {
    const message = {
      to: recipientPushToken,
      sound: 'default',
      title: 'New Message!',
      body: messageText,
      data: { ownerId, adopterId },
    };

    try {
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      const responseData = await response.json();
      console.log('Notification response:', responseData);
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  };

  const handleSend = async (newMessages: IMessage[] = []) => {
    const batch = writeBatch(db);

    for (const message of newMessages) {
      const messageRef = doc(collection(db, 'chatMessages'));
      batch.set(messageRef, {
        text: message.text,
        createdAt: Timestamp.fromDate(new Date()),
        userId: adopterId,
        userName: adopterName, // Use fetched adopter name
        recipientId: ownerId,
      });

      const recipientPushToken = await fetchRecipientPushToken(ownerId);
      if (recipientPushToken) {
        await sendPushNotification(recipientPushToken, message.text);
      }
    }

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
          name: adopterName, // Use fetched adopter name
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
