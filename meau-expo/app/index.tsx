import { Alert, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Text, View } from '@/components/Themed';
import AdoptButton from '@/components/Button';
import { useFonts } from 'expo-font';
import CourgetteRegular from '@/assets/fonts/Courgette-Regular.ttf';
import RobotoRegular from '@/assets/fonts/Roboto-Regular.ttf';
import { Image } from 'react-native';
import { Link, router } from 'expo-router';
import { isUserAuthenticated, signOutUser } from '@/firebaseService/AuthService'; // Import logout function

const Meau_marca_2 = require('@/assets/images/Meau_marca_2.png');

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    'Courgette': CourgetteRegular,
    'Roboto': RobotoRegular
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check user authentication status on mount
  useEffect(() => {
    setIsAuthenticated(isUserAuthenticated());
  }, []);

  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>;
  }

  const handleLogout = async () => {
    try {
      await signOutUser(); // Call the logout function
      setIsAuthenticated(false); // Update the state after logging out
      Alert.alert("Logout", "Você foi desconectado.");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível realizar o logout.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.separator} />

      <Text style={styles.title}>Olá!</Text>

      <View style={styles.container}>
        <Text style={styles.paragraph}>Bem vindo ao Meau!</Text>
        <Text style={styles.paragraph}>Aqui você pode adotar, doar e ajudar</Text>
        <Text style={styles.paragraph}>cães e gatos com facilidade.</Text>
        <Text style={styles.paragraph}>Qual o seu interesse?</Text>
      </View>

      <AdoptButton title='ADOTAR' onPress={() => {
        if (!isAuthenticated) {
          Alert.alert("Aviso", "Você precisa estar autenticado.");
          router.push("/(tabs)/telaAutenticacao");
        } else {
          router.push("/(tabs)/telaListaAnimal");
        }
      }} />

      <AdoptButton title="CADASTRAR ANIMAL" onPress={() => {
        if (!isAuthenticated) {
          router.push("/(tabs)/telaAutenticacao");
        } else {
          router.push("/(tabs)/telaCadastroAnimal");
        }
      }} />

      <View style={styles.separator} />

      {isAuthenticated ? (
        <Text style={styles.logoutButton} onPress={handleLogout}>
          Logout
        </Text>
      ) : (
        <Link href="/(tabs)/telaLoginUsuario" style={styles.loginButton}>
          Login
        </Link>
      )}

      <View style={styles.separator} />

      <Image source={Meau_marca_2} style={styles.image} />
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
  logoutButton: {
    fontSize: 16,
    color: '#FF6347', // Red color for logout button
    fontFamily: 'Roboto',
  },
  image: {
    width: 122,
    height: 44,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});
