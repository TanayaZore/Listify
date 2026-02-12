import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ListScreen } from '../screens/ListScreen';
import { DetailScreen } from '../screens/DetailScreen';

const Stack = createNativeStackNavigator();

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Listify App</Text>
        <Text style={styles.subtitle}>Choose what to explore</Text>
      </View>
      
      <View style={styles.content}>
        <TouchableOpacity 
          style={[styles.button, styles.usersButton]}
          onPress={() => navigation.navigate('UsersList')}
        >
          <Text style={styles.buttonText}>👥 View Users</Text>
          <Text style={styles.buttonSubtitle}>Browse user directory</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.productsButton]}
          onPress={() => navigation.navigate('ProductsList')}
        >
          <Text style={styles.buttonText}>🛍️ View Products</Text>
          <Text style={styles.buttonSubtitle}>Browse product catalog</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
};

export const AppNavigator: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#3b82f6',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen 
            name="UsersList" 
            options={{ title: 'Users' }}
          >
            {(props) => <ListScreen {...props} dataType="users" />}
          </Stack.Screen>
          
          <Stack.Screen 
            name="ProductsList" 
            options={{ title: 'Products' }}
          >
            {(props) => <ListScreen {...props} dataType="products" />}
          </Stack.Screen>
          
          <Stack.Screen 
            name="Detail" 
            component={DetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
    backgroundColor: '#3b82f6',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#e5e7eb',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  usersButton: {
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  productsButton: {
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  buttonSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#9ca3af',
  },
});