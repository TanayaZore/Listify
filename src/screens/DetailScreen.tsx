import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Product } from '../types';

interface DetailScreenProps {
  route: any;
  navigation: any;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({ route, navigation }) => {
  const { item, dataType } = route.params as { item: User | Product; dataType: 'users' | 'products' };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: dataType === 'users' ? 'User Details' : 'Product Details',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const renderUserDetails = (user: User) => (
    <>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarLargeText}>
          {user.first_name[0]}{user.last_name[0]}
        </Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
        <Text style={styles.email}>📧 {user.email}</Text>
        <Text style={styles.userId}>🆔 User ID: {user.id}</Text>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <Text style={styles.detailText}>Email: {user.email}</Text>
        <Text style={styles.detailText}>Full Name: {user.first_name} {user.last_name}</Text>
        <Text style={styles.sectionTitle}>Avatar</Text>
        <Text style={styles.detailText}>Avatar URL: {user.avatar}</Text>
      </View>
    </>
  );

  const renderProductDetails = (product: Product) => (
    <>
      <View style={styles.productImageContainer}>
        <Text style={styles.avatarLargeText}>P</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{product.title}</Text>
        <Text style={styles.price}>💰 ${product.price.toFixed(2)}</Text>
        <Text style={styles.productId}>🆔 Product ID: {product.id}</Text>
        
        <Text style={styles.sectionTitle}>Product Information</Text>
        <Text style={styles.detailText}>Category: {product.category}</Text>
        <Text style={styles.detailText}>Price: ${product.price.toFixed(2)}</Text>
        
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>
        
        <Text style={styles.sectionTitle}>Rating</Text>
        <Text style={styles.detailText}>⭐ {product.rating.rate}/5.0 ({product.rating.count} reviews)</Text>
        
        <Text style={styles.sectionTitle}>Additional Details</Text>
        <Text style={styles.detailText}>Product ID: {product.id}</Text>
        <Text style={styles.detailText}>Category: {product.category}</Text>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {dataType === 'users' ? renderUserDetails(item as User) : renderProductDetails(item as Product)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  backButton: {
    fontSize: 16,
    color: '#3b82f6',
    marginLeft: 16,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  productImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  avatarLargeText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#10b981',
    textAlign: 'center',
    marginBottom: 8,
  },
  userId: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 20,
  },
  productId: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 5,
  },
  detailText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 8,
    fontStyle: 'italic',
  },
});