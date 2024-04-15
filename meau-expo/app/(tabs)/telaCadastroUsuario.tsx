import { Text, View, Alert } from "react-native"
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const handleSignUp = async (email : any, password : any) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('User created:', response.user.displayName ?? 'Unknown');
      // Handle successful sign-up (e.g., display success message, navigate to a different screen)
    } catch (error: any) {
      console.error('Sign-up error:', error.message);
      // Handle sign-up errors (e.g., weak password, email already exists)
      Alert.alert('Sign Up Error', error.message);
    }
  };
  
const TelaCadastro = () => {
    {/* TODO: Implementar tela de cadastro */}

    return (
        <View>
            <Text>Tela de Cadastro</Text>
        </View>
    )
}

export default TelaCadastro;