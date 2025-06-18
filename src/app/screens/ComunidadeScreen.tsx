import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const MOCK_MEMBROS = [
  {
    id: '1',
    nome: 'João Silva',
    localizacao: 'Belo Horizonte - MG',
    tokens: 14,
    gerado: 170,
    consumido: 140
  },
  {
    id: '2',
    nome: 'Ana Paula',
    localizacao: 'São Paulo - SP',
    tokens: 9,
    gerado: 110,
    consumido: 95
  },
  {
    id: '3',
    nome: 'Carlos Santos',
    localizacao: 'Curitiba - PR',
    tokens: 20,
    gerado: 220,
    consumido: 160
  }
];

const ComunidadeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comunidade Solar</Text>

      <FlatList
        data={MOCK_MEMBROS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={require('@/assets/images/100.jpeg')} // Adicione uma imagem genérica aqui
              style={styles.avatar}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.localizacao}>{item.localizacao}</Text>
              <Text style={styles.dado}>🔋 Tokens: {item.tokens}</Text>
              <Text style={styles.dado}>☀️ Gerado: {item.gerado} kWh</Text>
              <Text style={styles.dado}>⚡ Consumido: {item.consumido} kWh</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ComunidadeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12
  },
  infoContainer: {
    flex: 1
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  localizacao: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4
  },
  dado: {
    fontSize: 14
  }
});
