
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const UserDashboardScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View>
        <Text style={styles.title}>ZI AFFILIATES <Text style={styles.silver}>Silver Member</Text></Text>
        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Projects</Text>
            <Text style={styles.cardValue}>12</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Profit Earned</Text>
            <Text style={styles.cardValue}>2,500</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Hot</Text>
            <Text style={styles.cardValue}>200</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Warm</Text>
            <Text style={styles.cardValue}>300</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Cold</Text>
            <Text style={styles.cardValue}>135</Text>
          </View>
        </View>
        <View style={styles.graphCard}>
          <Text style={styles.cardTitle}>Monthly Reach</Text>
          {/* Placeholder for graph */}
          <View style={styles.graphPlaceholder}>
            <Text style={{ color: '#2972FE', fontSize: 16 }}>Graph</Text>
          </View>
          <View style={styles.legendRow}>
            <Text style={styles.legendHot}>● Hot</Text>
            <Text style={styles.legendWarm}>● Warm</Text>
            <Text style={styles.legendCold}>● Cold</Text>
          </View>
        </View>
        <View style={styles.graphCard}>
          <Text style={styles.cardTitle}>Monthly Profit</Text>
          <View style={styles.graphPlaceholder}>
            <Text style={{ color: '#2972FE', fontSize: 16 }}>Graph</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  content: {
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 18,
    letterSpacing: 1,
  },
  silver: {
    color: '#B0B0B0',
    fontSize: 14,
    fontWeight: '500',
    backgroundColor: '#23252C',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginLeft: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#23252C',
    borderRadius: 12,
    padding: 18,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  cardTitle: {
    color: '#B0B0B0',
    fontSize: 15,
    marginBottom: 8,
  },
  cardValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  graphCard: {
    backgroundColor: '#23252C',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
  },
  graphPlaceholder: {
    height: 80,
    backgroundColor: '#181A20',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  legendHot: {
    color: '#2972FE',
    fontSize: 14,
  },
  legendWarm: {
    color: '#FFB800',
    fontSize: 14,
  },
  legendCold: {
    color: '#B0B0B0',
    fontSize: 14,
  },
});

export default UserDashboardScreen;
