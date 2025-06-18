import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const MOCK_OFERTAS = [
  { id: '1', nome: 'João', quantidade: 3, preco: 10, userId: 'joao123' },
  { id: '2', nome: 'Maria', quantidade: 5, preco: 15, userId: 'maria456' },
  { id: '3', nome: 'Lucas', quantidade: 2, preco: 8, userId: 'lucas789' }
];

const loggedUserId = 'marco001';

const MercadoScreen = () => {
  const [ofertas, setOfertas] = useState(MOCK_OFERTAS);
  const [meusTokens, setMeusTokens] = useState(2); // Tokens do usuário logado

  const handleComprar = (ofertaId) => {
    const ofertaSelecionada = ofertas.find(o => o.id === ofertaId);

    if (!ofertaSelecionada) return;

    // Atualiza tokens e remove a oferta da lista
    setMeusTokens(meusTokens + ofertaSelecionada.quantidade);
    setOfertas(ofertas.filter(o => o.id !== ofertaId));

    Alert.alert('Compra realizada', `Você comprou ${ofertaSelecionada.quantidade} tokens de ${ofertaSelecionada.nome}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mercado de Tokens (P2P)</Text>

      <Text style={styles.saldo}>Seus tokens: {meusTokens}</Text>

      {ofertas.length === 0 ? (
        <Text style={styles.subtitle}>Nenhuma oferta disponível.</Text>
      ) : (
        <FlatList
          data={ofertas.filter(oferta => oferta.userId !== loggedUserId)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.nome}>Vendedor: {item.nome}</Text>
              <Text>Quantidade: {item.quantidade}</Text>
              <Text>Preço: {item.preco} créditos</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleComprar(item.id)}
              >
                <Text style={styles.buttonText}>Comprar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default MercadoScreen;

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
  saldo: {
    fontSize: 16,
    marginBottom: 12
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 32
  },
  card: {
    backgroundColor: '#F2F2F2',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12
  },
  nome: {
    fontWeight: 'bold',
    marginBottom: 4
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 6,
    marginTop: 10
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center'
  }
});
