import { createDrawerNavigator } from '@react-navigation/drawer';

// Import your screen components
import IndexScreen from '../app/index';
import TelaAutenticacaoScreen from '../app/(tabs)/telaAutenticacao';
import TelaLoginUsuarioScreen from '../app//(tabs)/telaLoginUsuario';
import TelaCadastroUsuarioScreen from '../app/(tabs)/telaCadastroUsuario';
import TelaCadastroAnimalScreen from '../app/(tabs)/telaCadastroAnimal';
import TelaDetalheAnimalScreen from '../app/(tabs)/telaDetalheAnimal';
import TelaListaAnimalScreen from '../app/(tabs)/telaListaAnimal';
import TelaInteressadoAnimalScreen from '../app/(tabs)/telaInteressadoAnimal';


const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator detachInactiveScreens={true}>
      <Drawer.Screen
        name="index"
        component={IndexScreen}
        options={{
          drawerLabel: 'Página Principal',
          title: 'Página Principal',
        }}
      />
      <Drawer.Screen
        name="(tabs)/telaAutenticacao"
        component={TelaAutenticacaoScreen}
        options={{
          drawerLabel: 'Autenticação',
          title: 'Autenticação',
        }}
      />
      <Drawer.Screen
        name="(tabs)/telaLoginUsuario"
        component={TelaLoginUsuarioScreen}
        options={{
          drawerLabel: 'Login',
          title: 'Login',
        }}
      />
      <Drawer.Screen
        name="(tabs)/telaCadastroUsuario"
        component={TelaCadastroUsuarioScreen}
        options={{
          drawerLabel: 'Cadastro Pessoal',
          title: 'Cadastro Pessoal',
        }}
      />
      <Drawer.Screen
        name="(tabs)/telaCadastroAnimal"
        component={TelaCadastroAnimalScreen}
        options={{
          drawerLabel: 'Cadastro Animal',
          title: 'Cadastro Animal',
        }}
      />
      <Drawer.Screen
        name="(tabs)/telaDetalheAnimal"
        component={TelaDetalheAnimalScreen}
        options={{
          drawerLabel: 'Detalhe Animal',
          title: 'Bidu',
        }}
      />
      <Drawer.Screen
        name="(tabs)/telaListaAnimal"
        component={TelaListaAnimalScreen}
        options={{
          drawerLabel: 'Lista de Animais',
          title: 'Adotar',
        }}
      />
      <Drawer.Screen
        name="(tabs)/telaInteressadoAnimal"
        component={TelaInteressadoAnimalScreen}
        options={{
          drawerLabel: 'Interessados',
          title: 'Meus Pets',
        }}
      />
    </Drawer.Navigator>
  );
}

export default MyDrawer;