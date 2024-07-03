import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import AdoptButton from "@/components/Button";
import { isUserAuthenticated } from "@/firebaseService/AuthService";
import { router } from "expo-router";
import { Alert } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const images = [
  "https://wildwoodvetclinic.com/wp-content/uploads/2020/08/WVC-newsletter-graphics-aug2020-BLOG.png",
  "https://wildwoodvetclinic.com/wp-content/uploads/2020/08/WVC-newsletter-graphics-aug2020-BLOG.png"
];

const TelaDetalheAnimal = () => {
  return (
    <ScrollView>
      <PagerView style={styles.pagerView} initialPage={0}>
        {images.map((image, index) => (
          <View key={index} style={styles.carouselItem}>
            <Image source={{ uri: image }} style={styles.carouselImage} />
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
        <Text style={styles.title}>Bidu</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.columnText}>SEXO</Text>
            <Text style={styles.underText}>Macho</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.columnText}>PORTE</Text>
            <Text style={styles.underText}>Médio</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.columnText}>IDADE</Text>
            <Text style={styles.underText}>Adulto</Text>
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
            <Text style={styles.underText}>Não</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.columnText}>VERMIFUGADO</Text>
            <Text style={styles.underText}>Sim</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.columnText}>VACINADO</Text>
            <Text style={styles.underText}>Não</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.columnText}>DOENÇAS</Text>
            <Text style={styles.underText}>Nenhuma</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.columnText}>TEMPERAMENTO</Text>
            <Text style={styles.underText}>Calmo e dócil</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.columnText}>EXIGÊNCIAS DO DOADOR</Text>
            <Text style={styles.underText}>Termo de doação, fotos da casa, visita prévia e acompanhamento durante 3 meses</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.columnText}>MAIS SOBRE BIDU</Text>
            <Text style={styles.underText}>Bidu é um cão muito dócil e de fácil convivência. Adora caminhadas e se dá muito bem com crianças. Tem muito medo de raios e de chuva, nesses momentos ele requer mais atenção. Está disponível para adoção pois eu e minha família o encontramos na rua e não podemos mantê-lo em nossa casa.</Text>
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
        }}/> 
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
