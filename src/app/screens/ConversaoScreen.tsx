import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ConversaoItem {
  data: string;
  gerado: number;
  consumido: number;
  tokens: number;
}

const ConversaoScreen = () => {
  const [historico, setHistorico] = useState<ConversaoItem[]>([]);
  const [totalTokens, setTotalTokens] = useState(0);

  useEffect(() => {
    const carregarHistorico = async () => {
      try {
        const historicoSalvo = await AsyncStorage.getItem('historicoConversao');
        const totalSalvo = await AsyncStorage.getItem('totalTokens');

        if (historicoSalvo) {
          setHistorico(JSON.parse(historicoSalvo));
        }

        if (totalSalvo) {
          setTotalTokens(Number(totalSalvo));
        }
      } catch (error) {
        console.error('Erro ao carregar histórico de conversão:', error);
      }
    };

    carregarHistorico();
  }, []);

  const renderItem = ({ item }: { item: ConversaoItem }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>📅 {item.data}</Text>
      <Text style={styles.itemText}>⚡ Gerado: {item.gerado} kWh</Text>
      <Text style={styles.itemText}>💡 Consumido: {item.consumido} kWh</Text>
      <Text style={styles.itemText}>🎯 Tokens: {item.tokens}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversão de Energia em Tokens</Text>
      <Text style={styles.total}>Total de Tokens Acumulados: {totalTokens}</Text>

      <Text style={styles.subTitle}>Histórico de Conversões</Text>
      <FlatList
        data={historico}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <Text style={styles.rulesTitle}>📝 Regras de Conversão</Text>
      <Text style={styles.rule}>
        • A cada 1 kWh de excedente, 1 token é gerado automaticamente.
      </Text>
      <Text style={styles.rule}>
        • O cálculo ocorre a cada 2 segundos com base nos dados simulados.
      </Text>
      <Text style={styles.rule}>
        • Tokens podem ser usados, trocados ou vendidos no mercado.
      </Text>
    </View>
  );
};

export default ConversaoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4FAFF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  total: {
    fontSize: 18,
    marginBottom: 16,
    color: '#4CAF50',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#555',
  },
  item: {
    backgroundColor: '#EAF6FF',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 14,
  },
  rulesTitle: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: '600',
    color: '#333',
  },
  rule: {
    fontSize: 14,
    marginTop: 6,
    color: '#666',
  },
});
