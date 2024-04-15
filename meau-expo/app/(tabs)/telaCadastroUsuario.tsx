
import SharedButton from "@/components/SharedButton";
import React from "react";
import { Text, TextInput, View, StyleSheet, ScrollView, Button, Alert } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';
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


//  - FOTO DE PERFIL
//  {adicionar foto}
// botão de fazer cadastro


    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.signUpExplanation}>
                    As informações preenchidas serão divulgadas
                    apenas para a pessoa com a qual você realizar
                    o processo de adoção e/ou apadrinhamento,
                    após a formalização do processo.
                </Text>

                <Text style={styles.explainText}>
                    INFORMAÇÕES PESSOAIS
                </Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome completo"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Idade"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Estado"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Cidade"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Endereço"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Telefone"
                    />

                </View>
                <Text style={styles.explainText}>
                    INFORMAÇÕES DE PERFIL
                </Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome de usuário"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirmação de senha"
                    />

                </View>

                <Text style={styles.explainText}>
                    FOTO DE PERFIL
                </Text>

                <View style={styles.rectangle}>
                    <View style={styles.iconContainer}>
                        <Icon name="control-point" size={24} color="#757575" />
                    </View>
                    <Text style={styles.explainText}>adicionar foto</Text>
                </View>

                <SharedButton title="FAZER CADASTRO" style={styles.loginButton} />
            </View>
        </ScrollView>
        
    )
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
        paddingTop: 32,
        paddingBottom: 28,
        width: '100%',
        alignItems: 'center'
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
        color: '#bdbdbd',
        fontSize: 14,
        fontFamily: 'Roboto',
        borderBottomWidth: 0.8,
        borderBottomColor: '#e6e7e8',
        // outlineStyle: 'none' 
    },
    loginButton: {
        backgroundColor: '#88c9bf',
        color: '#fff',
        padding: 10,
        borderRadius: 2,
        width: 232,
        height: 40,
        marginTop: 32,
        marginBottom: 24
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
    signUpExplanation: {
        color: '#434343',
        fontSize: 14,
        fontFamily: 'Roboto',
        backgroundColor: '#cfe9e5',
        borderRadius: 4,
        height: 80,
        width: 328,
        textAlign: 'center',
        padding: 6,
        marginTop: 16,
        marginBottom: 28
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
    },
    explainText: {
        color: '#bdbdbd',
        fontSize: 13,
        fontFamily: 'Roboto',
    },
    rectangle: {
        width: 128,
        height: 128,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#e6e7e7',
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32
      },
      iconContainer: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default TelaCadastro;