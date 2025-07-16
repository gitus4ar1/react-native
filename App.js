import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import UserDashboardScreen from './screens/UserDashboardScreen';
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import CreateLeadsScreen from './screens/CreateLeadsScreen';
import LeadsViewScreen from './screens/LeadsViewScreen';
import SettingsScreen from './screens/SettingsScreen';
import { getAuthData, logout } from './utils/api';

const Stack = createStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState('Login');

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await getAuthData();
      if (auth?.token && auth?.role) {
        // Check JWT expiry (expiredIn is a timestamp or ISO string)
        const now = Date.now();
        const expiry = auth.expiredIn ? new Date(auth.expiredIn).getTime() : 0;
        if (expiry && now > expiry) {
          await logout();
          setInitialRoute('Login');
        } else {
          setInitialRoute(auth.role === 'admin' ? 'AdminDashboard' : 'UserDashboard');
        }
      } else {
        setInitialRoute('Login');
      }
    };
    checkAuth();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="UserDashboard" component={UserDashboardScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        <Stack.Screen name="CreateLeads" component={CreateLeadsScreen} />
        <Stack.Screen name="LeadsView" component={LeadsViewScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
