import { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const images = [
  "https://wildwoodvetclinic.com/wp-content/uploads/2020/08/WVC-newsletter-graphics-aug2020-BLOG.png",
];

const dogNames = ["Buddy", "Max", "Charlie", "Bella", "Lucy", "Molly", "Daisy", "Bailey", "Maggie", "Sophie"];

const getRandomDogName = () => {
  const index = Math.floor(Math.random() * dogNames.length);
  return dogNames[index];
};
const TelaInteressadoAnimal = () => {
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
