
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const leads = [
  { id: '1', name: 'Project A', status: 'Converted', date: 'Feb 10, 2024' },
  { id: '2', name: 'Project B', status: 'Converted', date: 'Jan 22, 2024' },
  { id: '3', name: 'Project C', status: 'Converted', date: 'Jan 3, 2024' },
  { id: '4', name: 'Project D', status: 'Converted', date: 'Dec 16, 2023' },
];

const LeadsViewScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projects</Text>
      <FlatList
        data={leads}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.leadCard}>
            <View style={styles.leadRow}>
              <Text style={styles.leadName}>{item.name}</Text>
              <Text style={styles.leadStatus}>{item.status}</Text>
            </View>
            <Text style={styles.leadDate}>{item.date}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    letterSpacing: 1,
  },
  leadCard: {
    backgroundColor: '#23252C',
    borderRadius: 12,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  leadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  leadName: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  leadStatus: {
    color: '#B0B0B0',
    fontSize: 15,
    fontWeight: '500',
  },
  leadDate: {
    color: '#888',
    fontSize: 14,
    marginTop: 2,
  },
});

export default LeadsViewScreen;
