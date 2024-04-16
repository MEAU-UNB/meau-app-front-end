
import SharedButton from "@/components/SharedButton";
import React from "react";
import { Text, TextInput, View, StyleSheet, ScrollView, Alert, TouchableOpacity, Image } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import validator from 'react-native-validator';
import * as ImagePicker from 'expo-image-picker';

  
const TelaCadastro = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [fullName, setFullName] = React.useState('');
    const [age, setAge] = React.useState('');
    const [estado, setEstado] = React.useState('');
    const [cidade, setCidade] = React.useState('');
    const [endereco, setEndereco] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [image, setImage] = React.useState('');

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSignUp = async () => {
        const emailError = validator.isEmail(email) ? '' : 'use um email válido';
        const passwordError = validator.isLength(password, { min: 6 }) ? '' : 'Senha deve ser maior que 6 caracteres';
        const confirmPasswordError = password === confirmPassword ? '' : 'senha e confirmar senha precisam ser iguais';
        if (!email || !password || !confirmPassword || !username || !age) {
            Alert.alert('Erro', 'preencha todos os campos obrigatórios');
            return;
          }
        
        if (emailError || passwordError || confirmPasswordError) {
            const errorMessage = emailError + '\n' + passwordError + '\n' + confirmPasswordError;
            Alert.alert('Erro', errorMessage);
            return;
          }
        
        try {
          const response = await createUserWithEmailAndPassword(auth, email, password);
          Alert.alert('User created:', response.user.email ?? 'Unknown');
          // Handle successful sign-up (e.g., display success message, navigate to a different screen)
        } catch (error: any) {
          Alert.alert('Sign Up Error', error.message);
        }
      };


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
                        value={fullName}
                        onChangeText={(text) => setFullName(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Idade"
                        value={age}
                        onChangeText={(text) => setAge(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        value={email}
                        keyboardType="email-address"
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Estado"
                        value={estado}
                        onChangeText={(text) => setEstado(text)}

                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Cidade"
                        value={cidade}
                        onChangeText={(text) => setCidade(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Endereço"
                        value={endereco}
                        onChangeText={(text) => setEndereco(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Telefone"
                        value={phone}
                        keyboardType="phone-pad"
                        onChangeText={(text) => setPhone(text)}
                    />

                </View>
                <Text style={styles.explainText}>
                    INFORMAÇÕES DE PERFIL
                </Text>

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
                    <TextInput
                        style={styles.input}
                        placeholder="Confirmação de senha"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                    />

                </View>

                <Text style={styles.explainText}>
                    FOTO DE PERFIL
                </Text>
                {/*
                <View style={styles.rectangle}>
                    <View style={styles.iconContainer}>
                        <Icon name="control-point" size={24} color="#757575" />
                    </View>
                    <Text style={styles.explainText}>adicionar foto</Text>
                </View>
                */}

                <View style={styles.rectangle}>
                  <TouchableOpacity onPress={pickImage} style={styles.iconContainer}> {/* TouchableOpacity for button functionality */}
                    {image ? (
                      <Image source={{ uri: image }} style={styles.image} /> // Display selected image
                    ) : (
                      <View style={styles.iconContainer}> {/* Container for icon */}
                        <Icon name="control-point" size={24} color="#757575" /> {/* Re-introduce the icon */}
                      </View>
                    )}
                  </TouchableOpacity>
                  <Text style={styles.explainText}>adicionar foto</Text>
                </View>

                <SharedButton title="FAZER CADASTRO" style={styles.loginButton} onPress={handleSignUp}/>
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
      image: {
        width: 200,
        height: 200,
      },
});

export default TelaCadastro;