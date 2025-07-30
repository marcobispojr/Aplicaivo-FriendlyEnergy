import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  TextInput, TouchableOpacity, Alert, ScrollView,
  KeyboardAvoidingView, Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const membros = [
  { id: '1', nome: 'João Silva' },
  { id: '2', nome: 'Maria Oliveira' },
  { id: '3', nome: 'Carlos Souza' }
];

export default function MercadoScreen() {
  const [tokens, setTokens] = useState(0);
  const [destinatario, setDestinatario] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [historico, setHistorico] = useState<string[]>([]);

  useEffect(() => {
    const carregarTokens = async () => {
      const tokensSalvos = await AsyncStorage.getItem('tokens');
      setTokens(tokensSalvos ? parseInt(tokensSalvos) : 0);
    };

    carregarTokens();

    const intervalo = setInterval(async () => {
      setTokens((prev) => {
        const novoTotal = prev + 1;
        AsyncStorage.setItem('tokens', novoTotal.toString());
        return novoTotal;
      });
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  const enviarTokens = () => {
    const qtd = parseInt(quantidade);
    if (!destinatario || isNaN(qtd) || qtd <= 0 || qtd > tokens) {
      Alert.alert('Erro', 'Verifique os dados inseridos.');
      return;
    }

    const novoTotal = tokens - qtd;
    setTokens(novoTotal);
    AsyncStorage.setItem('tokens', novoTotal.toString());

    setHistorico(prev => [
      `Você enviou ${qtd} token(s) para ${destinatario}`,
      ...prev
    ]);
    setQuantidade('');
    setDestinatario('');
  };

  const venderToken = () => {
    if (!destinatario) {
      Alert.alert('Erro', 'Selecione um destinatário para vender.');
      return;
    }

    if (tokens <= 0) {
      Alert.alert('Erro', 'Você não tem tokens disponíveis.');
      return;
    }

    const novoTotal = tokens - 1;
    setTokens(novoTotal);
    AsyncStorage.setItem('tokens', novoTotal.toString());

    setHistorico(prev => [
      `Você vendeu 1 token para ${destinatario}`,
      ...prev
    ]);

    Alert.alert('Sucesso', `Você vendeu 1 token para ${destinatario}`);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
    
        <View style={styles.container}>
          <Text style={styles.title}>Tokens Disponíveis: {tokens}</Text>

          <Text style={styles.label}>Escolha um destinatário:</Text>
          <FlatList
            data={membros}
            keyExtractor={(item) => item.id}
            style={styles.listaLimitada}
            renderItem={({ item }) => {
              const selecionado = item.nome === destinatario;
              return (
                <TouchableOpacity
                  onPress={() => setDestinatario(item.nome)}
                  style={[styles.item, selecionado && styles.itemSelecionado]}
                >
                  <Text style={selecionado ? styles.textoSelecionado : styles.textoNormal}>
                    {item.nome}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          {destinatario !== '' && (
            <Text style={styles.destinatarioSelecionado}>
              Destinatário selecionado: {destinatario}
            </Text>
          )}

          <Text style={styles.label}>Quantidade de Tokens:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a quantidade"
            keyboardType="numeric"
            value={quantidade}
            onChangeText={setQuantidade}
          />

          <TouchableOpacity onPress={enviarTokens} style={styles.button}>
            <Text style={styles.buttonText}>Enviar Tokens</Text>
          </TouchableOpacity>

          {destinatario !== '' && (
            <TouchableOpacity onPress={venderToken} style={styles.botaoVender}>
              <Text style={styles.textoBotao}>Vender 1 Token</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.label}>Histórico de Transações:</Text>
          <FlatList
            data={historico}
            keyExtractor={(_, i) => i.toString()}
            style={styles.listaLimitada}
            renderItem={({ item }) => <Text style={styles.histItem}>{item}</Text>}
          />
        </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    marginTop: 10
  },
  listaLimitada: {
    maxHeight: 150,
  },
  item: {
    padding: 10,
    backgroundColor: '#FFF',
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD'
  },
  itemSelecionado: {
    backgroundColor: '#FFECB3',
    borderColor: '#FF9800'
  },
  textoSelecionado: {
    fontWeight: 'bold',
    color: '#FF9800'
  },
  textoNormal: {
    color: '#000'
  },
  destinatarioSelecionado: {
    marginTop: 10,
    fontStyle: 'italic',
    color: '#444'
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    borderColor: '#CCC',
    borderWidth: 1
  },
  button: {
    backgroundColor: '#3897E2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  botaoVender: {
    backgroundColor: '#FF9800',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  histItem: {
    fontSize: 14,
    marginVertical: 3
  }
});
