import { StyleSheet, Alert } from 'react-native';
import SharedButton from '@/components/SharedButton';
import { Text, View } from '@/components/Themed';
import CourgetteRegular from '@/assets/fonts/Courgette-Regular.ttf';
import RobotoRegular from '@/assets/fonts/Roboto-Regular.ttf';
import { useFonts } from 'expo-font';
import { Link, router } from 'expo-router';
import { isUserAuthenticated } from '@/firebaseService/AuthService';
export default function TelaAutenticacao() {
  const [fontsLoaded] = useFonts({
    'Courgette': CourgetteRegular, 
    'Roboto': RobotoRegular
  });
  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>;
  }
  return (
    
    <View style={styles.container}>
      
      <Text style={styles.title}>Ops!</Text>
      
      <View style={styles.form}>
        <Text style={styles.paragraph}>Você não pode realizar 
        esta ação sem possuir um cadastro.</Text>   
      </View>

      <SharedButton title='Fazer Cadastro' onPress={() => {
    // Check if user is authenticated (replace with your logic)
    if (!isUserAuthenticated()) {
      router.push("/(tabs)/telaCadastroUsuario");
    } else {
      Alert.alert("Aviso", "Você já está logado!");
      alert("voce está logado");
      router.push("../index");
    }
    }} style={{ backgroundColor: '#88c9bf' }} />
      
      <View style={styles.form}>
        <Text style={styles.paragraph}>Já possui cadastro?</Text>
      </View>
      
      <SharedButton onPress={() => {
      // Check if user is authenticated (replace with your logic)
      if (!isUserAuthenticated()) {
      router.push("/(tabs)/telaLoginUsuario");
      } else {
        Alert.alert("Aviso", "Você já está logado!");
        alert("voce está logado");
        router.push("../index");
      }
  }} 
      title="Fazer Login" style={{ backgroundColor: '#88c9bf' }}/>

     
      
    </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 72,
    color: '#88c9bf',
    fontFamily: 'Courgette',
    marginVertical: 52
  },
  
  paragraph: {
    fontSize: 16,
    color: '#757575',
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginVertical: 8,
  },
  form: {
    paddingHorizontal: 50,
    marginTop: 15
  },
  
});
