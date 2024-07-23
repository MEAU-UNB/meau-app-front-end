import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const images = [
  "https://wildwoodvetclinic.com/wp-content/uploads/2020/08/WVC-newsletter-graphics-aug2020-BLOG.png",
  "https://cdn.pixabay.com/photo/2016/07/15/15/55/dachshund-1519374_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/02/18/18/37/puppy-1207816_1280.jpg"
];

const dogNames = ["Buddy", "Max", "Charlie", "Bella", "Lucy", "Molly", "Daisy", "Bailey", "Maggie", "Sophie"];

const getRandomDogName = () => {
  const index = Math.floor(Math.random() * dogNames.length);
  return dogNames[index];
};

const TelaListaAnimal = () => {
  const [liked, setLiked] = useState(images.map(() => false));
  const [names] = useState(images.map(() => getRandomDogName()));

  const toggleLike = (index: number) => {
    setLiked((prevLiked) => {
      const newLiked = [...prevLiked];
      newLiked[index] = !newLiked[index];
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
              <MaterialIcons
                name={liked[index] ? "favorite" : "favorite-border"}
                size={24}
                color={liked[index] ? "red" : "black"}
              />
            </TouchableOpacity>
          </View>
          <Image source={{ uri: image }} style={styles.middlePart} />
          <View style={styles.bottomPart}>
            <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>MACHO</Text>
              <Text style={styles.bottomText}>ADULTO</Text>
              <Text style={styles.bottomText}>MEDIO</Text>
            </View>
            <Text style={styles.locationText}>SAMAMBAIA SUL DISTRITO FEDERAL</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
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
    backgroundColor: '#fee29b',
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
});

export default TelaListaAnimal;
