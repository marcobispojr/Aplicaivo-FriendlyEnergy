import React, { useState } from 'react';
import { View, Text, Dimensions, Button, StyleSheet } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const sampleData = {
  daily: [12, 15, 10, 18, 14, 20, 22],
  weekly: [80, 95, 102, 88, 110, 105, 98],
  monthly: [320, 400, 360, 500, 470, 490, 530],
};

export default function MonitoramentoScreen() {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'pie'>('line');
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const labels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  const data = sampleData[period];

  const pieData = data.map((value, index) => ({
    name: labels[index],
    population: value,
    color: `hsl(${index * 50}, 70%, 60%)`,
    legendFontColor: '#333',
    legendFontSize: 12,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monitoramento de Energia</Text>

      {/* Botões para mudar período */}
      <View style={styles.buttonRow}>
        <Button title="Diário" onPress={() => setPeriod('daily')} />
        <Button title="Semanal" onPress={() => setPeriod('weekly')} />
        <Button title="Mensal" onPress={() => setPeriod('monthly')} />
      </View>

      {/* Botões para mudar tipo de gráfico */}
      <View style={styles.buttonRow}>
        <Button title="Linha" onPress={() => setChartType('line')} />
        <Button title="Barras" onPress={() => setChartType('bar')} />
        <Button title="Pizza" onPress={() => setChartType('pie')} />
      </View>

      {/* Gráfico dinâmico */}
      {chartType === 'line' && (
        <LineChart
        yAxisLabel="kWh "
        yAxisSuffix=""
          data={{ labels, datasets: [{ data }] }}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      )}

      {chartType === 'bar' && (
        <BarChart
        yAxisLabel="kWh "
        yAxisSuffix=""
          data={{ labels, datasets: [{ data }] }}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />
      )}

      {chartType === 'pie' && (
        <PieChart
        yAxisLabel="kWh "
        yAxisSuffix=""
          data={pieData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={styles.chart}
        />
      )}
    </View>
  );
}

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#f7f9fb',
  backgroundGradientTo: '#f7f9fb',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 152, 0, ${opacity})`,
  labelColor: () => '#333',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F7F9FB',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#FF9800',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
});
