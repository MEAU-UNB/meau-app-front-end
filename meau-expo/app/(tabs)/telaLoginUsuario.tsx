import { StyleSheet,Alert, TextInput} from 'react-native';
import SharedButton from '@/components/SharedButton';
import { Text, View } from '@/components/Themed';
import CourgetteRegular from '@/assets/fonts/Courgette-Regular.ttf';
import RobotoRegular from '@/assets/fonts/Roboto-Regular.ttf';
import RobotoMedium from '@/assets/fonts/Roboto-Medium.ttf';
import { useFonts } from 'expo-font';
import React from 'react';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";

export default function TelaAutenticacao() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = async () => {  
        // Use the imported auth object here:
        try {
          const response = await signInWithEmailAndPassword(auth, username, password);
          Alert.alert('Login de' + username + 'realizado com sucesso!');
          
        } catch (error : any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert(errorCode, errorMessage);
        }
      };
    const [fontsLoaded] = useFonts({
        'Courgette': CourgetteRegular, 
        'Roboto': RobotoRegular,
        'RobotoMedium': RobotoMedium,
    });

    if (!fontsLoaded) {
        return <Text>Carregando fontes...</Text>;
    }
    return (
        <View style={styles.container}>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome de usuário"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>

            <SharedButton title="ENTRAR" style={styles.loginButton} onPress={handleLogin} />

            <View style={styles.socialLogin}>

                <SharedButton 
                    title="ENTRAR COM FACEBOOK" 
                    style={styles.facebookButton} 
                    textStyle={styles.facebookText}
                />
                <SharedButton 
                    title="ENTRAR COM GOOGLE" 
                    style={styles.googleButton} 
                    textStyle={styles.googleText}
                />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        top: 0,
        left: 0,
        backgroundColor: '#fafafa',
        alignItems: 'center',
        flex: 1,
    },
    inputContainer:{
        paddingTop: 64,
        paddingBottom: 52,
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: 312,
        padding: 10,
        margin: 10,
        backgroundColor: '#e6e7e8',
    },
    loginButton: {
        backgroundColor: '#88c9bf',
        color: '#fff',
        padding: 10,
        borderRadius: 2,
        width: 232,
        height: 40,
    },
    socialLogin: {
        padding: 10,
        justifyContent: 'space-between',
        marginTop: 72,
    },
    facebookButton: {
        backgroundColor: '#194f7c',
        padding: 10,
        margin: 4,
        borderRadius: 2,
    },
    facebookText: {
        color: '#f7f7f7',
        fontSize: 12,
        fontFamily: 'Roboto'
    },
    googleButton: {
        backgroundColor: '#f15f5c',
        padding: 10,
        margin: 4,
        borderRadius: 2,
    },
    googleText: {
        color: '#f7f7f7',
        fontSize: 12,
        fontFamily: 'Roboto'
    }
});
