import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList as FlatListType } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ListItem } from '../components/ListItem';
import { SearchBar, Select } from '../components/SearchBar';
import { useDebounce, useAsyncState } from '../hooks';
import { apiService } from '../services/api';
import { User, Product, DataType, SearchState } from '../types';
import { 
  filterUsers, 
  filterProducts, 
  sortUsers, 
  sortProducts, 
  getUserFilterOptions,
  getProductSortOptions,
  getUserSortOptions
} from '../utils/helpers';

type DataItem = User | Product;

interface ListScreenProps {
  navigation: any;
  dataType: DataType;
}

export const ListScreen: React.FC<ListScreenProps> = ({ navigation, dataType }) => {
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    sortBy: '',
    filterBy: ''
  });

  const debouncedQuery = useDebounce(searchState.query, 300);

  const usersData = useAsyncState<User>(
    () => apiService.getUsers(),
    [dataType]
  );

  const productsData = useAsyncState<Product>(
    () => apiService.getProducts(),
    [dataType]
  );

  const { data, loading, error } = dataType === 'users' ? usersData : productsData;

  const processedData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    if (dataType === 'users') {
      const users = data as User[];
      let filtered = filterUsers(users, debouncedQuery, searchState.filterBy);
      return sortUsers(filtered, searchState.sortBy) as DataItem[];
    } else {
      const products = data as Product[];
      let filtered = filterProducts(products, debouncedQuery, searchState.filterBy);
      return sortProducts(filtered, searchState.sortBy) as DataItem[];
    }
  }, [data, debouncedQuery, searchState.sortBy, searchState.filterBy, dataType]);

  const handleItemPress = useCallback((item: DataItem) => {
    navigation.navigate('Detail', { item, dataType });
  }, [navigation, dataType]);

  const clearAllFilters = useCallback(() => {
    setSearchState({
      query: '',
      sortBy: '',
      filterBy: ''
    });
  }, []);

  const hasActiveFilters = searchState.query || searchState.sortBy || searchState.filterBy;

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>
        {hasActiveFilters 
          ? 'No results found. Try adjusting your filters.' 
          : dataType === 'users' ? 'No users found' : 'No products found'
        }
      </Text>
      {hasActiveFilters && (
        <TouchableOpacity 
          style={styles.clearAllButton} 
          onPress={clearAllFilters}
        >
          <Text style={styles.clearAllText}>Clear All Filters</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const sortOptions = dataType === 'users' 
    ? getUserSortOptions() 
    : getProductSortOptions();

  const filterOptions = dataType === 'users' && data
    ? getUserFilterOptions(data as User[])
    : [];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {dataType === 'users' ? 'Users' : 'Products'}
        </Text>
        {hasActiveFilters && (
          <TouchableOpacity 
            style={styles.headerClearButton} 
            onPress={clearAllFilters}
          >
            <Text style={styles.headerClearText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <SearchBar
        value={searchState.query}
        onChangeText={(query) => setSearchState(prev => ({ ...prev, query }))}
        placeholder={`Search ${dataType}...`}
      />

      <View style={styles.filterStatus}>
        {searchState.query && (
          <View style={styles.statusTag}>
            <Text style={styles.statusText}>🔍 {searchState.query}</Text>
            <TouchableOpacity onPress={() => setSearchState(prev => ({ ...prev, query: '' }))}>
              <Text style={styles.removeTag}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        {searchState.sortBy && (
          <View style={styles.statusTag}>
            <Text style={styles.statusText}>
              ↕️ {sortOptions.find(opt => opt.value === searchState.sortBy)?.label}
            </Text>
            <TouchableOpacity onPress={() => setSearchState(prev => ({ ...prev, sortBy: '' }))}>
              <Text style={styles.removeTag}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        {searchState.filterBy && (
          <View style={styles.statusTag}>
            <Text style={styles.statusText}>
              🏷️ {filterOptions.find(opt => opt.value === searchState.filterBy)?.label}
            </Text>
            <TouchableOpacity onPress={() => setSearchState(prev => ({ ...prev, filterBy: '' }))}>
              <Text style={styles.removeTag}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.controls}>
        <Select
          value={searchState.sortBy}
          onValueChange={(sortBy) => setSearchState(prev => ({ ...prev, sortBy }))}
          options={sortOptions}
          placeholder="Sort"
          buttonType="sort"
        />
        
        {filterOptions.length > 0 && (
          <Select
            value={searchState.filterBy}
            onValueChange={(filterBy) => setSearchState(prev => ({ ...prev, filterBy }))}
            options={filterOptions}
            placeholder="Filter"
            buttonType="filter"
          />
        )}
      </View>

      <FlatList<DataItem>
        data={processedData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            onPress={handleItemPress}
            dataType={dataType}
          />
        )}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={processedData.length === 0 ? styles.emptyContainer : null}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={10}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  headerClearButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  headerClearText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingBottom: 16,
    gap: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
  },
  emptyContainer: {
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  clearAllButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  clearAllText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  filterStatus: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  statusTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#374151',
    marginRight: 6,
  },
  removeTag: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sortButton: {
    flex: 1,
    backgroundColor: '#10b981',
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#f59e0b',
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});