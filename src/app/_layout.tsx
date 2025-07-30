import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import MonitoramentoScreen from './screens/MonitoramentoScreen';
import GestaoScreen from './screens/GestaoScreen';
import ConversaoScreen from './screens/ConversaoScreen';
import MercadoScreen from './screens/MercadoScreen';
import ComunidadeScreen from './screens/ComunidadeScreen';
import ConfiguracoesScreen from './screens/ConfiguracoesScreen';
import LoginScreen from './screens/LoginScreen'; 


const Drawer = createDrawerNavigator();


export default function Layout() {
  return (
    
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Monitoramento" component={MonitoramentoScreen} />
        <Drawer.Screen name="Gestão de Energia" component={GestaoScreen} />
        <Drawer.Screen name="Conversão de Tokens" component={ConversaoScreen} />
        <Drawer.Screen name="Mercado" component={MercadoScreen} />
        <Drawer.Screen name="Comunidade" component={ComunidadeScreen} />
        <Drawer.Screen name="Configurações" component={ConfiguracoesScreen} />
      </Drawer.Navigator>
   
  );
}
