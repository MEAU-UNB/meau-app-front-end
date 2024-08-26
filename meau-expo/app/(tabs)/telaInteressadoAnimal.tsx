import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from 'expo-constants';

const images = [
  "https://wildwoodvetclinic.com/wp-content/uploads/2020/08/WVC-newsletter-graphics-aug2020-BLOG.png",
];

const dogNames = ["Buddy", "Max", "Charlie", "Bella", "Lucy", "Molly", "Daisy", "Bailey", "Maggie", "Sophie"];

const getRandomDogName = () => {
  const index = Math.floor(Math.random() * dogNames.length);
  return dogNames[index];
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const TelaInteressadoAnimal = () => {
  const [liked, setLiked] = useState(images.map(() => false));
  const [names] = useState(images.map(() => getRandomDogName()));

  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    console.log("Registering for push notifications...");
    registerForPushNotificationsAsync()
      .then((token) => {
        if (token) {
          console.log("token: ", token);
          setExpoPushToken(token.data); // Only set if the token is defined
        }
        else {
          console.log("No token received");
        }
      })
      .catch((err) => console.log(err));
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
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      });
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  const sendNotification = async (message: any) => {
    if (!expoPushToken) {
      console.log("No push token available");
      return;
    }

    console.log("Sending push notification...");

    message.to = expoPushToken;

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  const toggleLike = (index: number) => {
    setLiked((prevLiked) => {
      const newLiked = [...prevLiked];
      newLiked[index] = !newLiked[index];

      // Send notification if image is liked
      if (newLiked[index]) {
        const message = {
          sound: "default",
          title: "Someone liked your pet!",
          body: `${names[index]} has a new admirer!`,
        };
        sendNotification(message);
      }

      return newLiked;
    });
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {images.map((image, index) => (
        <View key={index} style={styles.rectangle}>
          <View style={styles.topPart}>
            <Text style={styles.dogName}>{names[index]}</Text>
            <TouchableOpacity onPress={() => toggleLike(index)}>
              <View style={[styles.iconContainer, { backgroundColor: 'gray' }]}>
                <MaterialIcons
                  name="error"
                  size={24}
                  color="white"
                />
              </View>
            </TouchableOpacity>
          </View>
          <Image source={{ uri: image }} style={styles.middlePart} />
          <View style={styles.bottomPart}>
            <Text style={styles.locationText}>2 NOVOS INTERESSADOS</Text>
            <Text style={styles.locationText}>ADOTAR</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  rectangle: {
    width: 380,
    height: 275,
    borderRadius: 10,
    backgroundColor: '#ccc',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topPart: {
    width: 380,
    height: 32,
    backgroundColor: '#d3d3d3',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  dogName: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#434343',
  },
  middlePart: {
    width: 380,
    height: 183,
    backgroundColor: '#bbb',
  },
  bottomPart: {
    width: 380,
    height: 275 - 32 - 183,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },
  bottomText: {
    fontFamily: 'Roboto',
    fontSize: 12,
    color: '#434343',
  },
  locationText: {
    fontFamily: 'Roboto',
    fontSize: 12,
    color: '#434343',
    textAlign: 'center',
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TelaInteressadoAnimal;
