import { Alert, StyleSheet } from 'react-native';
import React from 'react';
import { Text, View } from '@/components/Themed';
import AdoptButton from '@/components/Button';
import { useFonts } from 'expo-font';
import CourgetteRegular from '@/assets/fonts/Courgette-Regular.ttf';
import RobotoRegular from '@/assets/fonts/Roboto-Regular.ttf';
import { Image } from 'react-native';
import { Link } from 'expo-router';
import { router } from 'expo-router';


const Meau_marca_2 = require('@/assets/images/Meau_marca_2.png');




const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    'Courgette': CourgetteRegular, 
    'Roboto': RobotoRegular
  });

  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>;
  }

  return (
  
    <View style={styles.container}>
      <View style={styles.separator}/>
      
      <Text style={styles.title}>Olá!</Text>

      
      <View style={styles.container}>
        
        <Text style={styles.paragraph}>Bem vindo ao Meau!</Text>
        <Text style={styles.paragraph}>Aqui você pode adotar, doar e ajudar</Text>
        <Text style={styles.paragraph}>cães e gatos com facilidade.</Text>
        <Text style={styles.paragraph}>Qual o seu interesse?</Text>
      </View>

      

      <AdoptButton title='ADOTAR' onPress={() => router.push("/(tabs)/telaAutenticacao")}/>
      <AdoptButton title="AJUDAR" onPress={() => router.push("/(tabs)/telaAutenticacao")}/>
      <AdoptButton title="CADASTRAR ANIMAL" onPress={() => router.push("/(tabs)/telaAutenticacao")}/>

      <View style={styles.separator}/>

      <Link href="/(tabs)/telaLoginUsuario" style={styles.loginButton}>login</Link>

      <View style={styles.separator}/>

      <Image source={Meau_marca_2} style={styles.image}/>
    </View>
  
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 72,
    color: '#ffd358',
    fontFamily: 'Courgette',
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
  },
  paragraph: {
    fontSize: 16,
    color: '#757575',
    fontFamily: 'Roboto',
    textAlign: 'justify',
    
  },
  loginButton: {
    fontSize: 16,
    color: '#88c9bf',
    fontFamily: 'Roboto',
  },
  image: {
    width: 122,
    height: 44,
    resizeMode: 'contain', // Adjust as needed (cover, stretch, etc.)
    marginBottom: 20, // Optional spacing below the image
  },
});

