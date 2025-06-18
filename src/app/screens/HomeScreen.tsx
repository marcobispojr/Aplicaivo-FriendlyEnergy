import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';

type DrawerParamList = {
  Home: undefined;
  Monitoramento: undefined;
  'Gestão de Energia': undefined;
  'Conversão de Tokens': undefined;
  Mercado: undefined;
  Comunidade: undefined;
  Configurações: undefined;
};

export default function HomeScreen() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const [gerado, setGerado] = useState(0);
  const [consumido, setConsumido] = useState(0);
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const novoGerado = Math.floor(Math.random() * 53);
      const novoConsumido = Math.floor(Math.random() * 41);
      const excedente = Math.max(novoGerado - novoConsumido, 0);
      setGerado(novoGerado);
      setConsumido(novoConsumido);
      setTokens(excedente);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Ionicons size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Dashboard</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Energia Gerada:</Text>
        <Text style={styles.value}>{gerado} kWh</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Energia Consumida:</Text>
        <Text style={styles.value}>{consumido} kWh</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Tokens Gerados:</Text>
        <Text style={styles.value}>{tokens} ⚡</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fb',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF9800',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginLeft: 12,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#888',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
});
