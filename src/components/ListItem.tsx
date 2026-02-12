import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User, Product } from '../types';

interface ListItemProps {
  item: User | Product;
  onPress: (item: User | Product) => void;
  dataType: 'users' | 'products';
}

export const ListItem: React.FC<ListItemProps> = ({ item, onPress, dataType }) => {
  const renderUserItem = (user: User) => (
    <>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>
          {user.first_name[0]}{user.last_name[0]}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {user.first_name} {user.last_name}
        </Text>
        <Text style={styles.subtitle}>{user.email}</Text>
      </View>
    </>
  );

  const renderProductItem = (product: Product) => (
    <>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>P</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.subtitle}>${product.price.toFixed(2)}</Text>
        <Text style={styles.category}>{product.category}</Text>
      </View>
    </>
  );

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      {dataType === 'users' ? renderUserItem(item as User) : renderProductItem(item as Product)}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  category: {
    fontSize: 12,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
});