import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import PagerView from 'react-native-pager-view';
import AdoptButton from "@/components/Button";
import { getCurrentUser, isUserAuthenticated } from "@/firebaseService/AuthService";
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { AnimalService } from '@/firebaseService/AnimalService';
import { MaterialIcons } from '@expo/vector-icons';

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from 'expo-constants';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

const { width } = Dimensions.get('window');

const TelaDetalheAnimal = () => {
  const router = useRouter();
  const params = useGlobalSearchParams();
  const animalId = params.animalId as string;
  const [animal, setAnimal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [expoPushToken, setExpoPushToken] = useState<string>("");

  useEffect(() => {
    const configureNotifications = async () => {
      // Configure notification handling
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });

      // Request permissions and get push token
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          Alert.alert('Failed to get push token for push notification!');
          return;
        }

        const token = await Notifications.getExpoPushTokenAsync();
        console.log('Push token:', token);
        // Store the token if needed
      } else {
        Alert.alert('Must use a physical device for Push Notifications');
      }
    };

    configureNotifications();
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
  
      console.log(Constants.expoConfig?.extra?.eas.projectId)
      // Fetch a new token
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      });
  
      console.log('New token:', token);
  
      // Ensure the token is not null or undefined
      if (token?.data) {
        try {
          const currentUser = getCurrentUser();
          if (currentUser) {
            const userRef = doc(db, 'users', currentUser.uid);
  
            // Update Firestore with the new token
            await updateDoc(userRef, {
              pushToken: token.data,
            });
  
            console.log('Push token saved to Firestore');
          } else {
            console.log('No user is logged in');
          }
        } catch (error) {
          console.error('Error saving push token to Firestore:', error);
        }
      }
    } else {
      alert("Must use a physical device for Push Notifications");
    }
  
    return token;
  }

  async function fetchOwnerData(ownerId: string) {
    try {
      const ownerRef = collection(db, 'users');
      const ownerDoc = doc(ownerRef, ownerId);
      const ownerSnapshot = await getDoc(ownerDoc);

      if (ownerSnapshot.exists()) {
        return ownerSnapshot.data();
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching owner data:", error);
      return null;
    }
  }

  async function sendPushNotificationToOwner(ownerPushToken: string) {
    const message = {
      to: ownerPushToken,
      sound: 'default',
      title: 'Animal Liked!',
      body: `Someone liked your animal.`,
      data: { animalId },
    };

    const { status } = await Notifications.getPermissionsAsync();
    console.log(status)
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
    }
  
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
  }

  const handleLikePress = async () => {
    console.log('Liked');

    try {
      const ownerData = await fetchOwnerData(animal.userId.toString()); // Fetch owner's data from Firestore
      console.log(JSON.stringify(ownerData, null, 2));
      if(ownerData) {
        console.log("pushtoken = " + ownerData.pushToken)
      }
      if (ownerData && ownerData.pushToken) {
        console.log("here")
        await sendPushNotificationToOwner(ownerData.pushToken);
      } else {
        console.log("Owner does not have a push token or data not found");
      }
    } catch (error) {
      console.error("Error fetching owner data:", error);
    }
  };

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        if (typeof animalId === 'string') {
          const animalData = await AnimalService.fetchAnimalById(animalId);
          setAnimal(animalData);
        } else {
          throw new Error('Invalid ID format');
        }
      } catch (error) {
        console.error('Error fetching animal:', error);
        Alert.alert('Error', 'Failed to fetch animal data');
      } finally {
        setLoading(false);
      }
    };

    if (animalId) {
      fetchAnimal();
    } else {
      setLoading(false);
    }
  }, [animalId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!animal) {
    return <Text>No animal data found.</Text>;
  }

  const temperamentKeys = animal.temperamento ? Object.keys(animal.temperamento).filter(key => animal.temperamento[key]).join(', ') : '';

  const safeRenderText = (text: any) => {
    return typeof text === 'string' ? text : JSON.stringify(text);
  };

  const handleAdoptButtonPress = () => {
    if (!isUserAuthenticated()) {
      alert("Não foi autenticado");
      router.push("/(tabs)/telaAutenticacao");
    } else {
      if (animal.userId) {

        console.log("IDS: " + animal.userId + " " + getCurrentUser().uid)

        router.push({
          pathname: '/(tabs)/telaChat',
          params: {
            animalOwner: animal.userId.toString(),
            animalAdopter: getCurrentUser().uid.toString(),
          },
        })
      } else {
        Alert.alert("Error", "Animal does not have a registered user ID");
      }
    }
  };

  return (
    <ScrollView>
      <PagerView style={styles.pagerView} initialPage={0}>
        <View style={styles.carouselItem}>
          <Image source={{ uri: `data:image/png;base64,${animal.image}` }} style={styles.carouselImage} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLikePress}>
              <MaterialIcons name="favorite-border" size={24} color="#fff" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Shared')}>
              <MaterialIcons name="share" size={24} color="#fff" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </PagerView>
      <View style={styles.container}>
        <Text style={styles.title}>{safeRenderText(animal.animalName)}</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.columnText}>SEXO</Text>
            <Text style={styles.underText}>{safeRenderText(animal.sexo)}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.columnText}>PORTE</Text>
            <Text style={styles.underText}>{safeRenderText(animal.porte)}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.columnText}>IDADE</Text>
            <Text style={styles.underText}>{safeRenderText(animal.idade)}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.columnText}>LOCALIZAÇÃO</Text>
            <Text style={styles.underText}>Samambaia Sul - Distrito Federal</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.columnText}>CASTRADO</Text>
            <Text style={styles.underText}>{animal.saude.castrado ? "Sim" : "Não"}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.columnText}>VERMIFUGADO</Text>
            <Text style={styles.underText}>{animal.saude.vermifugado ? "Sim" : "Não"}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.columnText}>VACINADO</Text>
            <Text style={styles.underText}>{animal.saude.vacinado ? "Sim" : "Não"}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.columnText}>DOENÇAS</Text>
            <Text style={styles.underText}>{safeRenderText(animal.saude.doencas)}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.columnText}>DEFICIÊNCIA</Text>
            <Text style={styles.underText}>{safeRenderText(animal.saude.deficiencia)}</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.columnText}>TEMPERAMENTO</Text>
            <Text style={styles.underText}>{temperamentKeys}</Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <AdoptButton title="Pretendo Adotar" onPress={handleAdoptButtonPress} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    width: '100%',
    height: width,
  },
  carouselItem: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: width,
  },
  buttonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 5,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  column: {
    flex: 1,
  },
  columnText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  underText: {
    fontSize: 14,
    color: '#333',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 15,
  },
});

export default TelaDetalheAnimal;
