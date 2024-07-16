import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import CourgetteRegular from '@/assets/fonts/Courgette-Regular.ttf';
import RobotoRegular from '@/assets/fonts/Roboto-Regular.ttf';
import RobotoMedium from '@/assets/fonts/Roboto-Medium.ttf';
import { CheckBox } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SharedButton from '@/components/SharedButton';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import { getCurrentUser } from '@/firebaseService/AuthService';
import { router } from 'expo-router';
type CheckboxState = {
  medio: boolean;
  grande: boolean;
  filhote: boolean;
  adulto: boolean;
  idoso: boolean;
  brincalhao: boolean;
  timido: boolean;
  calmo: boolean;
  guarda: boolean;
  amoroso: boolean;
  preguicoso: boolean;
  vacinado: boolean;
  vermifugado: boolean;
  castrado: boolean;
  doente: boolean;
  termoAdocao: boolean;
  fotosCasa: boolean;
  visitaPrevia: boolean;
  acompanhamentoPos: boolean;
  umMes: boolean;
  tresMeses: boolean;
  seisMeses: boolean;
  gato: boolean;
  cachorro: boolean;
  macho: boolean;
  femea: boolean;
  pequeno: boolean;
};

interface HealthConditions {
  castrado: boolean;
  doente: boolean;
  vermifugado: boolean;
  vacinado: boolean;
}

interface Temperament {
  calmo: boolean;
  timido: boolean;
  brincalhao: boolean;
  guardiao: boolean;
  amoroso: boolean;
  preguicoso: boolean;
}

interface Demands {
  termoAdocao: boolean;
  fotosCasa: boolean;
  visitaPrevia: boolean;
  acompanhamentoPos: boolean;
  umMes: boolean;
  tresMeses: boolean;
  seisMeses: boolean;
}
const App: React.FC = () => {


  const [animalName, setAnimalName] = useState('');
  const [doenca, setDoenca] = useState('');
  const [sobreAnimal, setSobreAnimal] = useState('');
  const [selectedTab, setSelectedTab] = useState(''); // Estado inicial do tab selecionado
  const [checkboxes, setCheckboxes] = useState<CheckboxState>({
    termoAdocao: false,
    fotosCasa: false,
    visitaPrevia: false,
    acompanhamentoPos: false,
    umMes: false,
    tresMeses: false,
    seisMeses: false,
    gato: false,
    cachorro: false,
    macho: false,
    femea: false,
    pequeno: false,
    medio: false,
    grande: false,
    filhote: false,
    adulto: false,
    idoso: false,
    brincalhao: false,
    timido: false,
    calmo: false,
    guarda: false,
    amoroso: false,
    preguicoso: false,
    vacinado: false,
    vermifugado: false,
    castrado: false,
    doente: false,
  });

  const [image, setImage] = useState('');

  const handleSaveAnimal = async () => {
    const temperamento: Temperament = {
      calmo: checkboxes.calmo,
      timido: checkboxes.timido,
      brincalhao: checkboxes.brincalhao,
      guardiao: checkboxes.guarda,
      amoroso: checkboxes.amoroso,
      preguicoso: checkboxes.preguicoso,
    };
    // Prepare animal data object
    const initialHealthData: HealthConditions = {
      castrado: checkboxes.castrado,
      doente: checkboxes.doente,
      vermifugado: checkboxes.vermifugado,
      vacinado: checkboxes.vacinado,
    };

    const exigencias: Demands = {
      termoAdocao: checkboxes.termoAdocao,
      fotosCasa: checkboxes.fotosCasa,
      visitaPrevia: checkboxes.visitaPrevia,
      acompanhamentoPos: checkboxes.acompanhamentoPos,
      umMes: checkboxes.umMes,
      tresMeses: checkboxes.tresMeses,
      seisMeses: checkboxes.seisMeses,
    };
    const animalData = {
      // Extract data from your state variables here (e.g., name, image, species, etc.)
      userId: getCurrentUser().uid,
      doencaDoAnimal: doenca,
      animalName: animalName,
      action: selectedTab, // Replace with your state variable name for animal name
      image: image, // Replace with your state variable name for image URI
      species: checkboxes.gato ? 'Gato' : 'Cachorro', // Example based on checkboxes
      sexo: checkboxes.macho ? 'M' : 'F', // Example based on checkboxes
      idade: checkboxes.filhote ? 'Filhote' : (checkboxes.adulto ? 'Adulto' : 'Idoso'),
      porte: checkboxes.medio ? 'Medio' : (checkboxes.grande ? 'Grande' : 'Pequeno'),
      temperamento: temperamento,
      saude: initialHealthData,
      exigencia: exigencias,
      sobre: sobreAnimal,
    };

    // Add animal data to Firestore
    try {
      const animalRef = collection(db, 'animals'); // Specify your collection name
      await addDoc(animalRef, animalData);
      Alert.alert('Animal cadastrado com sucesso!');
      router.push("/index");
      // Handle success (e.g., reset form, show confirmation message)
    } catch (error: any) {
      console.error('Error saving animal data:', error);
      // Handle errors (e.g., display error message)
      Alert.alert('Erro em cadastrar animal:', error.message);
    }
  };

  const handlePress = (newTab: string) => {
    setSelectedTab(newTab); // Atualiza o estado com base no botão pressionado
  };



  const handleCheckboxChange = (checkboxName: keyof CheckboxState) => {
    setCheckboxes({
      ...checkboxes,
      [checkboxName]: !checkboxes[checkboxName],
    });
  };

  const [fontsLoaded] = useFonts({
    'Courgette': CourgetteRegular,
    'Roboto': RobotoRegular,
    'RobotoMedium': RobotoMedium,
  });

  const pickImage = async () => {
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
          <SharedButton title='ADOÇÃO' style={styles.button} onPress={() => handlePress('ADOÇÃO')} />
          <SharedButton title='APADRINHAR' style={styles.button} onPress={() => handlePress('APADRINHAR')} />
          <SharedButton title='AJUDA' style={styles.button} onPress={() => handlePress('AJUDAR')} />
        </View>

        <Text style={styles.subtitle}>{selectedTab ? `${selectedTab}` : 'Selecione uma opção'}</Text>

        <Text style={styles.explainText}>Nome do animal</Text>
        <TextInput style={styles.input} placeholder="Nome de animal"
          onChangeText={(text) => setAnimalName(text)} />

        <View>
          <Text style={styles.explainText}>Foto do animal</Text>

          <TouchableOpacity onPress={pickImage} style={styles.rectangle}>
            {image ? (<Image source={{ uri: image }} style={styles.image} />) : (
              <View style={styles.iconContainer}>
                <Icon name="control-point" size={24} color="#757575" />
                <Text style={styles.imageText}>adicionar fotos</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.explainText}>Espécie</Text>
          <View style={styles.row}>
            <Text>Gato</Text>
            <CheckBox
              checked={checkboxes.gato}
              onPress={() => handleCheckboxChange('gato')}
            />
            <Text>Cachorro</Text>
            <CheckBox
              checked={checkboxes.cachorro}
              onPress={() => handleCheckboxChange('cachorro')}
            />
          </View>
        </View>

        <View>
          <Text style={styles.explainText}>Sexo</Text>
          <View style={styles.row}>
            <Text>Macho</Text>
            <CheckBox
              checked={checkboxes.macho}
              onPress={() => handleCheckboxChange('macho')}
            />
            <Text>Fêmea</Text>
            <CheckBox
              checked={checkboxes.femea}
              onPress={() => handleCheckboxChange('femea')}
            />
          </View>
        </View>

        <View>
          <Text style={styles.explainText}>Porte</Text>
          <View style={styles.row}>
            <Text>Pequeno</Text>
            <CheckBox
              checked={checkboxes.pequeno}
              onPress={() => handleCheckboxChange('pequeno')}
            />
            <Text>Médio</Text>
            <CheckBox
              checked={checkboxes.medio}
              onPress={() => handleCheckboxChange('medio')}
            />
            <Text>Grande</Text>
            <CheckBox
              checked={checkboxes.grande}
              onPress={() => handleCheckboxChange('grande')}
            />
          </View>
        </View>

        <View>
          <Text style={styles.explainText}>Idade</Text>
          <View style={styles.row}>
            <Text>Filhote</Text>
            <CheckBox
              checked={checkboxes.filhote}
              onPress={() => handleCheckboxChange('filhote')}
            />
            <Text>Adulto</Text>
            <CheckBox
              checked={checkboxes.adulto}
              onPress={() => handleCheckboxChange('adulto')}
            />
            <Text>Idoso</Text>
            <CheckBox
              checked={checkboxes.idoso}
              onPress={() => handleCheckboxChange('idoso')}
            />
          </View>
        </View>

        <View>
          <Text style={styles.explainText}>Temperamento</Text>
          <View style={styles.row}>
            <Text>Brincalhão</Text>
            <CheckBox
              checked={checkboxes.brincalhao}
              onPress={() => handleCheckboxChange('brincalhao')}
            />
            <Text>Tímido</Text>
            <CheckBox
              checked={checkboxes.timido}
              onPress={() => handleCheckboxChange('timido')}
            />
            <Text>Calmo</Text>
            <CheckBox
              checked={checkboxes.calmo}
              onPress={() => handleCheckboxChange('calmo')}
            />
          </View>

          <View style={styles.row}>
            <Text>Guarda</Text>
            <CheckBox
              checked={checkboxes.amoroso}
              onPress={() => handleCheckboxChange('amoroso')}
            />
            <Text>Amoroso</Text>
            <CheckBox
              checked={checkboxes.preguicoso}
              onPress={() => handleCheckboxChange('preguicoso')}
            />
            <Text>Preguiçoso</Text>
            <CheckBox
              checked={checkboxes.guarda}
              onPress={() => handleCheckboxChange('guarda')}
            />
          </View>
        </View>

        <View>
          <Text style={styles.explainText}>Saúde</Text>
          <View style={styles.row}>
            <Text>Vacinado</Text>
            <CheckBox
              checked={checkboxes.vacinado}
              onPress={() => handleCheckboxChange('vacinado')}
            />
            <Text>Vermifugado</Text>
            <CheckBox
              checked={checkboxes.vermifugado}
              onPress={() => handleCheckboxChange('vermifugado')}
            />
          </View>

          <View style={styles.row}>
            <Text>Castrado</Text>
            <CheckBox
              checked={checkboxes.castrado}
              onPress={() => handleCheckboxChange('castrado')}
            />
            <Text>Doente</Text>
            <CheckBox
              checked={checkboxes.doente}
              onPress={() => handleCheckboxChange('doente')}
            />
          </View>

          <TextInput style={styles.input} placeholder="Doenças do animal"
            onChangeText={(text) => setDoenca(text)} />
        </View>

        <View>
          <Text style={styles.explainText}>Exigências para Adoção</Text>

          <View style={styles.row}>
            <CheckBox
              checked={checkboxes.termoAdocao}
              onPress={() => handleCheckboxChange('termoAdocao')}
            />
            <Text>Termo de adoção</Text>
          </View>

          <View style={styles.row}>
            <CheckBox
              checked={checkboxes.fotosCasa}
              onPress={() => handleCheckboxChange('fotosCasa')}
            />
            <Text>Fotos da casa</Text>
          </View>

          <View style={styles.row}>
            <CheckBox
              checked={checkboxes.visitaPrevia}
              onPress={() => handleCheckboxChange('visitaPrevia')}
            />
            <Text>Visita prévia ao animal</Text>
          </View>

          <View style={styles.row}>
            <CheckBox
              checked={checkboxes.acompanhamentoPos}
              onPress={() => handleCheckboxChange('acompanhamentoPos')}
            />
            <Text>Acompanhamento pós adoção</Text>
          </View>

          <View style={styles.row}>
            <CheckBox
              checked={checkboxes.umMes}
              onPress={() => handleCheckboxChange('umMes')}
            />
            <Text>1 mês</Text>
          </View>

          <View style={styles.row}>
            <CheckBox
              checked={checkboxes.tresMeses}
              onPress={() => handleCheckboxChange('tresMeses')}
            />
            <Text>3 meses</Text>
          </View>

          <View style={styles.row}>
            <CheckBox
              checked={checkboxes.seisMeses}
              onPress={() => handleCheckboxChange('seisMeses')}
            />
            <Text>6 meses</Text>
          </View>
        </View>

        <View>
          <Text style={styles.explainText}>Sobre o animal</Text>
          <TextInput style={styles.input} placeholder="Compartilhe a história do animal"
            onChangeText={(text) => setSobreAnimal(text)} />
        </View>

        <SharedButton title='COLOCAR PARA ADOÇÃO' style={styles.submitButton} onPress={handleSaveAnimal} />

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
  title: {
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    justifyContent: 'flex-start',
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
  },
  inputContainer: {
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  button: {
    borderRadius: 4,
    backgroundColor: '#ffd358',
    margin: 4,
    width: '30%',
  },
  submitButton: {
    borderRadius: 2,
    color: '#ffd358',
    marginLeft: 32,
  },
});
