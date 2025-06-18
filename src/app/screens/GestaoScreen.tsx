import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GestaoScreen = () => {
  const [prioridadeVenda, setPrioridadeVenda] = useState(false);
  const [alertaAltaProducao, setAlertaAltaProducao] = useState(true);
  const [alertaBaixoConsumo, setAlertaBaixoConsumo] = useState(false);

  useEffect(() => {
    const carregarConfiguracoes = async () => {
      try {
        const saved = await AsyncStorage.getItem('configuracoesEnergia');
        if (saved) {
          const config = JSON.parse(saved);
          setPrioridadeVenda(config.prioridadeVenda);
          setAlertaAltaProducao(config.alertaAltaProducao);
          setAlertaBaixoConsumo(config.alertaBaixoConsumo);
        }
      } catch (e) {
        console.error('Erro ao carregar configurações:', e);
      }
    };
    carregarConfiguracoes();
  }, []);

  const salvarConfiguracoes = async () => {
    const config = {
      prioridadeVenda,
      alertaAltaProducao,
      alertaBaixoConsumo,
    };
    try {
      await AsyncStorage.setItem('configuracoesEnergia', JSON.stringify(config));
      Alert.alert('Configurações salvas!', 'Suas preferências foram atualizadas.');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar as configurações.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestão de Energia</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Prioridade de Uso:</Text>
        <Text style={styles.optionText}>
          {prioridadeVenda ? 'Venda de Excedente' : 'Uso Local'}
        </Text>
        <Switch
          value={prioridadeVenda}
          onValueChange={setPrioridadeVenda}
          trackColor={{ false: '#ccc', true: '#4CAF50' }}
          thumbColor={prioridadeVenda ? '#2196F3' : '#f4f3f4'}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Alertas:</Text>

        <View style={styles.alertOption}>
          <Text>Alta Produção</Text>
          <Switch
            value={alertaAltaProducao}
            onValueChange={setAlertaAltaProducao}
          />
        </View>

        <View style={styles.alertOption}>
          <Text>Baixa Geração</Text>
          <Switch
            value={alertaBaixoConsumo}
            onValueChange={setAlertaBaixoConsumo}
          />
        </View>
      </View>

      <Button title="Salvar Configurações" onPress={salvarConfiguracoes} />
    </View>
  );
};

export default GestaoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FB',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  section: {
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  alertOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
});
