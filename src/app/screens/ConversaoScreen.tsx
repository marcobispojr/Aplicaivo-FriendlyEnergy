import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConversaoScreen = () => {
  const [tokens, setTokens] = useState(0);
  const [ultimoUso, setUltimoUso] = useState<Date | null>(null);
  const navigation = useNavigation();

  // Carrega tokens armazenados ao focar na tela
  useFocusEffect(
    React.useCallback(() => {
      const carregarTokens = async () => {
        const armazenados = await AsyncStorage.getItem('tokens');
        setTokens(armazenados ? parseInt(armazenados) : 0);
      };
      carregarTokens();
    }, [])
  );

  // Incrementa 1 token a cada 5 segundos e salva no AsyncStorage
  useEffect(() => {
    const interval = setInterval(async () => {
      setTokens(prev => {
        const novo = prev + 1;
        AsyncStorage.setItem('tokens', novo.toString());
        return novo;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const usarTokens = () => {
    if (tokens <= 0) {
      Alert.alert('Sem tokens disponíveis');
      return;
    }
    const novoValor = tokens - 1;
    setTokens(novoValor);
    AsyncStorage.setItem('tokens', novoValor.toString());
    setUltimoUso(new Date());
    Alert.alert('Token usado com sucesso!');
  };

  const venderTokens = () => {
    if (tokens <= 0) {
      Alert.alert('Sem tokens para vender');
      return;
    }
    navigation.navigate('Mercado', { tokens });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversão de Energia em Tokens</Text>
      <Text style={styles.tokens}>Tokens Disponíveis: {tokens}</Text>
      {ultimoUso && (
        <Text style={styles.info}>Último uso: {ultimoUso.toLocaleString()}</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Usar Token" onPress={usarTokens} color="#FF9800" />
        <View style={{ height: 16 }} />
        <Button title="Vender Token" onPress={venderTokens} color="#3897E2" />
      </View>

      <Text style={styles.regras}>
        Regras: Cada 1kWh excedente sem uso por 24hrs = 1 token. Tokens podem ser usados ou vendidos.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FB',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  tokens: {
    fontSize: 18,
    marginBottom: 12,
  },
  info: {
    fontSize: 14,
    color: '#777',
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 24,
  },
  regras: {
    fontSize: 14,
    color: '#333',
    marginTop: 32,
    textAlign: 'center',
  },
});

export default ConversaoScreen;