import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AnimalService, AnimalFetch } from '../../firebaseService/AnimalService'; // Import the AnimalService
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';


const TelaListaAnimal = () => {
  // Define the Animal type
  const [animals, setAnimals] = useState<AnimalFetch[]>([]);
  const [liked, setLiked] = useState<boolean[]>([]);
  const router = useRouter();
  const navigation = useNavigation();


  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const animalList = await AnimalService.fetchAnimals();
        setAnimals(animalList);
        setLiked(animalList.map(() => false)); // Initialize liked state
      } catch (error) {
        console.error('Error fetching animals:', error);
      }
    };

    fetchAnimals();
  }, []);

  const toggleLike = (index: number) => {
    setLiked((prevLiked) => {
      const newLiked = [...prevLiked];
      newLiked[index] = !newLiked[index];
      return newLiked;
    });
  };

  const navigateToDetail = (id: string) => {
    router.push({
      pathname: '/(tabs)/telaDetalheAnimal',
      params: {
        animalId: id, 
      },
    })
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {animals.length > 0 ? (
        animals.map((animal, index) => (
          <TouchableOpacity key={animal.id} onPress={() => navigateToDetail(animal.id)}>
            <View style={styles.rectangle}>
              <View style={styles.topPart}>
                <Text style={styles.dogName}>{animal.animalName}</Text>
                <TouchableOpacity onPress={() => toggleLike(index)}>
                  <MaterialIcons
                    name={liked[index] ? "favorite" : "favorite-border"}
                    size={24}
                    color={liked[index] ? "red" : "black"}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => navigateToDetail(animal.id)}>
                <Image source={{ uri: `data:image/png;base64,${animal.image}` }} style={styles.middlePart} />
              </TouchableOpacity>
              <View style={styles.bottomPart}>
                <View style={styles.bottomRow}>
                  <Text style={styles.bottomText}>{animal.sexo.toUpperCase()}</Text>
                  <Text style={styles.bottomText}>{animal.idade.toUpperCase()}</Text>
                  <Text style={styles.bottomText}>{animal.porte.toUpperCase()}</Text>
                </View>
                <Text style={styles.locationText}>SAMAMBAIA SUL DISTRITO FEDERAL</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No animals found</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  rectangle: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  topPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  dogName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  middlePart: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  bottomPart: {
    padding: 16,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomText: {
    fontSize: 14,
    color: '#555',
  },
  locationText: {
    marginTop: 8,
    fontSize: 14,
    color: '#888',
  },
});

export default TelaListaAnimal;
