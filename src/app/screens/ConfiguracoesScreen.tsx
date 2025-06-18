import React, { useState } from 'react';
import { View, Text, TextInput, Switch, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const ConfiguracoesScreen = () => {
  const [nome, setNome] = useState('Marco Antônio');
  const [email, setEmail] = useState('marco@email.com');
  const [endereco, setEndereco] = useState('Rua Exemplo, 123');
  const [tipoPainel, setTipoPainel] = useState('Monocristalino');
  const [notificacoesAtivadas, setNotificacoesAtivadas] = useState(true);
  const [idioma, setIdioma] = useState('pt');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Configurações do Usuário</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Endereço</Text>
      <TextInput
        style={styles.input}
        value={endereco}
        onChangeText={setEndereco}
      />

      <Text style={styles.label}>Tipo de Painel Solar</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipoPainel}
          onValueChange={(itemValue) => setTipoPainel(itemValue)}
        >
          <Picker.Item label="Monocristalino" value="Monocristalino" />
          <Picker.Item label="Policristalino" value="Policristalino" />
          <Picker.Item label="Filme Fino" value="Filme Fino" />
        </Picker>
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.label}>Notificações</Text>
        <Switch
          value={notificacoesAtivadas}
          onValueChange={setNotificacoesAtivadas}
        />
      </View>

      <Text style={styles.label}>Idioma</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={idioma}
          onValueChange={(itemValue) => setIdioma(itemValue)}
        >
          <Picker.Item label="Português (PT)" value="pt" />
          <Picker.Item label="English (EN)" value="en" />
        </Picker>
      </View>
    </ScrollView>
  );
};

export default ConfiguracoesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginTop: 4
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    marginTop: 4
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16
  }
});
