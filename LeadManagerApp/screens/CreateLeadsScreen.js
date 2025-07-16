import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { createLead, getAuthData } from '../../utils/api';

const SERVICES = [
  'Digital Marketing',
  'Development',
  'Social Media',
  'GMB',
  'Lead Generation',
];
const INDUSTRY = ['1 year', '2 year', '3 year', '4 year', '5 year+'];

const CreateLeadsScreen = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('hot');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');
  const [agency, setAgency] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [industry, setIndustry] = useState(INDUSTRY[0]);
  const [budget, setBudget] = useState([15000, 100000]);
  const [loading, setLoading] = useState(false);

  const toggleService = (service) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    const auth = await getAuthData();
    if (!auth?.token || !auth?.employeeID) return;
    try {
      await createLead(auth.token, auth.employeeID, {
        name,
        phone,
        email,
        status,
        notes,
        date,
        agency,
        services: selectedServices,
        industry,
        budget,
      });
      Alert.alert('Success', 'Lead created successfully');
      setName(''); setPhone(''); setEmail(''); setStatus('hot'); setNotes(''); setDate(''); setAgency(false); setSelectedServices([]); setIndustry(INDUSTRY[0]); setBudget([15000, 100000]);
    } catch (e) {
      Alert.alert('Error', 'Failed to create lead');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Lead</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Status (hot/warm/cold)" value={status} onChangeText={setStatus} placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Notes" value={notes} onChangeText={setNotes} placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} placeholderTextColor="#888" />
      <View style={styles.rowSwitch}>
        <Text style={styles.label}>Existing Agency:</Text>
        <Switch value={agency} onValueChange={setAgency} />
      </View>
      <Text style={styles.label}>Services:</Text>
      <View style={styles.servicesWrap}>
        {SERVICES.map(service => (
          <TouchableOpacity
            key={service}
            style={[styles.serviceBtn, selectedServices.includes(service) && styles.serviceBtnActive]}
            onPress={() => toggleService(service)}>
            <Text style={styles.serviceText}>{service}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Industry:</Text>
      <View style={styles.pickerWrap}>
        <Picker
          selectedValue={industry}
          style={styles.picker}
          onValueChange={setIndustry}>
          {INDUSTRY.map(opt => <Picker.Item key={opt} label={opt} value={opt} />)}
        </Picker>
      </View>
      <Text style={styles.label}>Budget Range: ₹{budget[0]} - ₹{budget[1]}</Text>
      <MultiSlider
        values={budget}
        min={15000}
        max={100000}
        step={1000}
        onValuesChange={setBudget}
        selectedStyle={{ backgroundColor: '#2972FE' }}
        markerStyle={{ backgroundColor: '#2972FE' }}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Create Lead'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    padding: 24,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 18,
    letterSpacing: 1,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#23252C',
    borderRadius: 10,
    color: '#fff',
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: 16,
  },
  rowSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  servicesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  serviceBtn: {
    backgroundColor: '#23252C',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  serviceBtnActive: {
    backgroundColor: '#2972FE',
  },
  serviceText: {
    color: '#fff',
    fontWeight: '500',
  },
  pickerWrap: {
    backgroundColor: '#23252C',
    borderRadius: 10,
    marginBottom: 12,
  },
  picker: {
    color: '#fff',
    height: 48,
    width: '100%',
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#2972FE',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#2972FE',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
  },
});

export default CreateLeadsScreen;
