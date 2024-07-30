import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import AdoptButton from "@/components/Button";
import { isUserAuthenticated } from "@/firebaseService/AuthService";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AnimalService } from '@/firebaseService/AnimalService';
import { Alert } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const images = [
  "https://wildwoodvetclinic.com/wp-content/uploads/2020/08/WVC-newsletter-graphics-aug2020-BLOG.png",
  "https://wildwoodvetclinic.com/wp-content/uploads/2020/08/WVC-newsletter-graphics-aug2020-BLOG.png"
];

const TelaDetalheAnimal = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [animal, setAnimal] = useState<any>(null);


  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const animalData = await AnimalService.fetchAnimalById(params.id as string);
        setAnimal(animalData);
      } catch (error) {
        console.error('Error fetching animal:', error);
        Alert.alert('Error', 'Failed to fetch animal data');
      }
    };

    if (params.id) {
      fetchAnimal();
    } else {
      Alert.alert('Error', 'Animal ID is missing');
    }
  }, [params]);


  return (
    <ScrollView>
      <PagerView style={styles.pagerView} initialPage={0}>
        {animal.map((animal: any, index: number) => (
          <View key={index} style={styles.carouselItem}>
            <Image source={{ uri: `data:image/png;base64,${animal.image}` }} style={styles.carouselImage} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => console.log('Liked')}>
                <MaterialIcons name="favorite-border" size={24} color="#fff" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('Shared')}>
                <MaterialIcons name="share" size={24} color="#fff" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </PagerView>
      <View style={styles.container}>
        <Text style={styles.title}>{animal.animalName}</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.columnText}>SEXO</Text>
            <Text style={styles.underText}>{animal.sexo}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.columnText}>PORTE</Text>
            <Text style={styles.underText}>{animal.porte}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.columnText}>IDADE</Text>
            <Text style={styles.underText}>{animal.idade}</Text>
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
            <Text style={styles.underText}>{animal.saude.castrado}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.columnText}>VERMIFUGADO</Text>
            <Text style={styles.underText}>{animal.saude.vermifugado}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.columnText}>VACINADO</Text>
            <Text style={styles.underText}>{animal.saude.vacinado}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.columnText}>DOENÇAS</Text>
            <Text style={styles.underText}>{animal.saude.doenca}</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.columnText}>TEMPERAMENTO</Text>
            <Text style={styles.underText}>{animal.temperamento}</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.columnText}>EXIGÊNCIAS DO DOADOR</Text>
            <Text style={styles.underText}>{animal.exigencia}</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.columnText}>MAIS SOBRE BIDU</Text>
            <Text style={styles.underText}>{animal.sobre}</Text>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <AdoptButton title='Pretendo Adotar' onPress={() => {
          if (!isUserAuthenticated()) {
            alert("não foi autenticado");
            router.push("/(tabs)/telaAutenticacao");
            Alert.alert("Aviso", "TODO: Adicionar tela de perfil");
          } else {
            Alert.alert("Aviso", "TODO: Adicionar tela de perfil");
            alert(" foi autenticado e vai para tela de adotar");
          }
        }} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  title: {
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: 'bold',
    fontSize: 22,
    alignItems: 'flex-start',
    width: '100%',
    left: 15,
    flex: 1,
    fontFamily: 'Roboto',
    color: '#434343'
  },
  container: {
    top: 0,
    left: 0,
    backgroundColor: '#fafafa',
    marginRight: 3,
    marginLeft: 3,
    alignItems: 'center',
    flex: 10,
  },
  containertext: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  row: {
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  column: {
    left: 15,
    flex: 1,
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  columnText: {
    fontSize: 12,
    color: '#f7a800',
    fontFamily: 'Roboto',
  },
  underText: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
    fontFamily: 'Roboto',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#d3d3d3',
    marginTop: 8,
  },
  pagerView: {
    width: width,
    height: 184,
  },
  carouselItem: {
    width: '100%',
    height: 184,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  buttonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  }
});

export default TelaDetalheAnimal;
