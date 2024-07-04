import { Alert, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Text, View } from '@/components/Themed';
import { useFonts } from 'expo-font';
import CourgetteRegular from '@/assets/fonts/Courgette-Regular.ttf';
import RobotoRegular from '@/assets/fonts/Roboto-Regular.ttf';
import RobotoMedium from '@/assets/fonts/Roboto-Medium.ttf';
import { Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SharedButton from '@/components/SharedButton';
import * as ImagePicker from 'expo-image-picker';

const App: React.FC = () => {

    const [selectedTab, setSelectedTab] = useState(''); // Initial state

    const handlePress = (newTab: string) => {
        setSelectedTab(newTab); // Update state based on button press
    };

    const isRadioSelected = (value: string): boolean => true;

    const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void => console.log("click")

    const [image, setImage] = React.useState('');

    const [fontsLoaded] = useFonts({
        'Courgette': CourgetteRegular, 
        'Roboto': RobotoRegular,
        'RobotoMedium': RobotoMedium,
    });

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

    if (!fontsLoaded) {
        return <Text>Carregando fontes...</Text>;
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text>Tenho interesse em cadastrar o animal para:</Text>

                <View style={styles.row}>
                    <SharedButton title='ADOÇÃO' style={styles.button} onPress={() => handlePress('ADOÇÃO')}/>
                    <SharedButton title='APADRINHAR' style={styles.button} onPress={() => handlePress('APADRINHAR')}/>
                    <SharedButton title='AJUDA' style={styles.button} onPress={() => handlePress('AJUDAR')}/>
                </View>

                <Text style={styles.subtitle}>{selectedTab ? `${selectedTab}` : 'Selecione uma opção'}</Text>

                <Text style={styles.explainText}>Nome do animal</Text>

                <TextInput style={styles.input} placeholder="Nome de animal"/>

                <View>
                    <Text style={styles.explainText}>Foto do animal</Text>

                    <View>
                        <TouchableOpacity onPress={pickImage} style={styles.rectangle}>
                            {image ? (<Image source={{ uri: image }}/> ) : (
                                <View> 
                                    <Icon style={styles.iconContainer} name="control-point" size={24} color="#757575"/>
                                    <Text style={styles.imageText}>adicionar fotos</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    <Text style={styles.explainText}>Espécie</Text>
                    <View style={styles.row}>
                        <Text>Gato</Text>
                        <input type='radio' id='gato' name="especie" value="gato"/>
                        <Text>Cachorro</Text>
                        <input type='radio' id='cachorro' name="especie" value="cachorro"/>
                    </View>
                </View>

                <View>
                    <Text style={styles.explainText}>Sexo</Text>
                    <View style={styles.row}>
                        <Text>Pequeno</Text>
                        <input type='radio' id='pequeno' name="porte" value="pequeno"/>
                        <Text>Médio</Text>
                        <input type='radio' id='medio' name="porte" value="medio"/>
                        <Text>Grande</Text>
                        <input type='radio' id='grande' name="porte" value="grande"/>
                    </View>
                </View>

                <View>
                    <Text style={styles.explainText}>Porte</Text>
                    <View style={styles.row}>
                        <Text>Pequeno</Text>
                        <input type='radio' id='pequeno' name="porte" value="pequeno"/>
                        <Text>Médio</Text>
                        <input type='radio' id='medio' name="porte" value="medio"/>
                        <Text>Grande</Text>
                        <input type='radio' id='grande' name="porte" value="grande"/>
                    </View>
                </View>

                <View>
                    <Text style={styles.explainText}>Idade</Text>
                    <View style={styles.row}>
                        <Text>Filhote</Text>
                        <input type='radio' id='filhote' name="idade" value="filhote"/>
                        <Text>Adulto</Text>
                        <input type='radio' id='Adulto' name="idade" value="Adulto"/>
                        <Text>Idoso</Text>
                        <input type='radio' id='Idoso' name="idade" value="Idoso"/>
                    </View>
                </View>

                <View>
                    <Text style={styles.explainText}>Temperamento</Text>

                    <View style={styles.row}>
                        <input type='checkbox'/>
                        <Text>Brincalhão</Text>
                        <input type='checkbox'/>
                        <Text>Tímido</Text>
                        <input type='checkbox'/>
                        <Text>Calmo</Text>
                    </View>

                    <View style={styles.row}>
                        <input type='checkbox'/>
                        <Text>Guarda</Text>
                        <input type='checkbox'/>
                        <Text>Amoroso</Text>
                        <input type='checkbox'/>
                        <Text>Preguiçoso</Text>
                    </View>

                </View>

                <View>
                    <Text style={styles.explainText}>Saúde</Text>

                    <View style={styles.row}>
                        <input type='checkbox'/>
                        <Text>Vacinado</Text>
                        <input type='checkbox'/>
                        <Text>Vermifugado</Text>
                    </View>

                    <View style={styles.row}>
                        <input type='checkbox'/>
                        <Text>Castrado</Text>
                        <input type='checkbox'/>
                        <Text>Doente</Text>
                    </View>

                    <TextInput style={styles.input} placeholder="Doenças do animal"/>
                </View>

                <View>
                    <Text style={styles.explainText}>Exigências para Adoção</Text>
                    
                    <View style={styles.row}>
                        <input type='checkbox'/>
                        <Text>Termo de adoção</Text>
                    </View>
                    
                    <View style={styles.row}>
                        <input type='checkbox'/>
                        <Text>Fotos da casa</Text>
                    </View>

                    <View style={styles.row}>
                        <input type='checkbox'/>
                        <Text>Visita prévia ao animal</Text>
                    </View>

                    <View style={styles.row}>
                        <input type='checkbox'/>
                        <Text>Acompanhamento pós adoção</Text>
                    </View>

                    <View style={styles.row}>
                        <input type='checkbox'/>
                        <Text>1 mês</Text>
                    </View>

                    <View style={styles.row}>
                        <input type='checkbox'/>
                        <Text>3 meses</Text>
                    </View>

                    <View style={styles.row}>
                        <input type='checkbox'/>
                        <Text>6 meses</Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.explainText}>Sobre o animal</Text>
                    <TextInput style={styles.input} placeholder="Compartilhe a história do animal"/>
                </View>

                <SharedButton title='COLOCAR PARA ADOÇÃO' style={styles.submitButton}/>

            </View>               
        </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 24,
    },
    title:{
        fontFamily: 'Roboto',
        fontSize: 14,
        color: '#757575',
        marginTop: 16,
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        color: '#434343',
        fontFamily: 'RobotoMedium',
        marginTop: 16,
        marginBottom: 16,
    },
    row: {
        marginTop: 16,
        marginBottom: 16,
        flexDirection: 'row',
    },
    separator: {
        marginVertical: 15,
        height: 1,
        width: '80%',
    },
    inputContainer:{
        paddingTop: 32,
        paddingBottom: 28,
        width: '100%',
    },
    input: {
        width: 312,
        paddingVertical: 10,
        marginVertical: 10,
        color: '#bdbdbd',
        fontSize: 14,
        fontFamily: 'Roboto',
    },
    explainText: {
        color: '#f7a800',
        fontSize: 12,
        fontFamily: 'Roboto',
    },
    imageText: {
        fontFamily: 'Roboto',
        fontSize: 14,
        color: '#757575',
    },
    rectangle: {
        width: 312,
        height: 128,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#f1f2f2',
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
        marginTop: 32,
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
    checkbox: {
        margin: 8,
    },
    paragraph: {
        fontSize: 15,
    },
    button: {
        width: 100,
        height: 40,
        borderRadius: 2,
        color: '#ffd358',
        margin: 4,
    },
    submitButton: {
        borderRadius: 2,
        color: '#ffd358',
        marginLeft: 32,
    },
});
