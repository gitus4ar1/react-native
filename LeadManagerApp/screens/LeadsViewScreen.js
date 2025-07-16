
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { getLeads, getAuthData } from '../../utils/api';
import axios from 'axios';

const LeadsViewScreen = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    const auth = await getAuthData();
    if (!auth?.token || !auth?.employeeID) return;
    try {
      const data = await getLeads(auth.token, auth.employeeID);
      setLeads(data.leads || []);
    } catch (e) {
      Alert.alert('Error', 'Failed to fetch leads');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (leadId) => {
    const auth = await getAuthData();
    try {
      await axios.delete(`https://zi-affiliates-backend.onrender.com/leads/${leadId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'employee-id': auth.employeeID,
        },
      });
      setLeads(leads.filter(l => l._id !== leadId));
      Alert.alert('Deleted', 'Lead deleted successfully');
    } catch (e) {
      Alert.alert('Error', 'Failed to delete lead');
    }
  };

  const handleEdit = async (leadId, field, value) => {
    const auth = await getAuthData();
    try {
      await axios.post(`https://zi-affiliates-backend.onrender.com/leads/update`, {
        id: leadId,
        field,
        value,
      }, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'employee-id': auth.employeeID,
          'Content-Type': 'application/json',
        },
      });
      fetchLeads();
      Alert.alert('Updated', 'Lead updated successfully');
    } catch (e) {
      Alert.alert('Error', 'Failed to update lead');
    }
  };

  const renderLead = ({ item }) => (
    <View style={styles.leadCard}>
      <View style={styles.leadRow}>
        <Text style={styles.leadName}>{item.name}</Text>
        <Text style={styles.leadStatus}>{item.status}</Text>
      </View>
      <Text style={styles.leadDate}>{item.date}</Text>
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.editBtn} onPress={() => handleEdit(item._id, 'status', item.status === 'hot' ? 'warm' : 'hot')}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item._id)}>
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projects</Text>
      {loading ? (
        <ActivityIndicator color="#2972FE" size="large" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={leads}
          keyExtractor={item => item._id}
          renderItem={renderLead}
          refreshing={refreshing}
          onRefresh={fetchLeads}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
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
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editBtn: {
    backgroundColor: '#2972FE',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  deleteBtn: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default LeadsViewScreen;
