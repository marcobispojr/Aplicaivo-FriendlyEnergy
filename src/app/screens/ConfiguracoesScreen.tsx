import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet, Switch, TouchableOpacity, Alert} from 'react-native';

export default function ConfiguracoesScreen() {
  const [nome, setNome] = useState('João da Silva');
  const [endereco, setEndereco] = useState('Rua das Palmeiras, 123');
  const [painel, setPainel] = useState('Monocristalino');
  const [notificacoes, setNotificacoes] = useState(true);
  const [idioma, setIdioma] = useState('Português');

  const salvar = () => {
    Alert.alert('Salvo com sucesso!', 'Suas configurações foram atualizadas.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações do Usuário</Text>

      <Text style={styles.label}>Nome:</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.label}>Endereço:</Text>
      <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} />

      <Text style={styles.label}>Tipo de Painel Solar:</Text>
      <TextInput style={styles.input} value={painel} onChangeText={setPainel} />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Receber Notificações:</Text>
        <Switch
          value={notificacoes}
          onValueChange={setNotificacoes}
          trackColor={{ true: '#FF9800' }}
          thumbColor={notificacoes ? '#FFF' : '#CCC'}
        />
      </View>

      <Text style={styles.label}>Idioma:</Text>
      <TextInput style={styles.input} value={idioma} onChangeText={setIdioma} />

      <TouchableOpacity style={styles.button} onPress={salvar}>
        <Text style={styles.buttonText}>Salvar Configurações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginTop: 10 },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    borderColor: '#CCC',
    borderWidth: 1,
    marginTop: 5
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15
  },
  button: {
    backgroundColor: '#3897E2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30
  },
  buttonText: { color: '#FFF', fontWeight: 'bold' }
});
