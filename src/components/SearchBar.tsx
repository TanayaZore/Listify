import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Modal, TouchableOpacity, Text, FlatList } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  buttonType?: 'sort' | 'filter';
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, placeholder = "Search..." }) => {
  const clearSearch = () => {
    onChangeText("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
        />
        {value && (
          <TouchableOpacity
            style={styles.clearSearchButton}
            onPress={clearSearch}
          >
            <Text style={styles.clearSearchText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export const Select: React.FC<SelectProps> = ({ value, onValueChange, options, placeholder = "Select...", buttonType }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  // Add clear option
  const allOptions = [
    { label: "🔄 Clear Selection", value: "" },
    ...options
  ];

  const getButtonStyle = () => {
    if (buttonType === 'sort') {
      return [styles.selectContainer, styles.sortButton];
    } else if (buttonType === 'filter') {
      return [styles.selectContainer, styles.filterButton];
    }
    return styles.selectContainer;
  };

  const getButtonText = () => {
    if (selectedOption) {
      return selectedOption.label;
    }
    if (buttonType === 'sort') {
      return "↕️ Sort";
    } else if (buttonType === 'filter') {
      return "🏷️ Filter";
    }
    return placeholder;
  };

  return (
    <>
      <TouchableOpacity 
        style={getButtonStyle()} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectText} numberOfLines={1}>
          {getButtonText()}
        </Text>
        {value && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              onValueChange("");
              setModalVisible(false);
            }}
          >
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Option</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={allOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    item.value === "" && styles.clearOption,
                    value === item.value && styles.selectedOption
                  ]}
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={[
                    styles.optionText,
                    item.value === "" && styles.clearOptionText,
                    value === item.value && styles.selectedOptionText
                  ]}>
                    {item.label}
                  </Text>
                  {value === item.value && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  searchContainer: {
    position: 'relative',
  },
  input: {
    height: 40,
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    paddingRight: 40, // Make room for clear button
  },
  clearSearchButton: {
    position: 'absolute',
    right: 12,
    top: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSearchText: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: 'bold',
  },
  selectContainer: {
    height: 44,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sortButton: {
    backgroundColor: '#10b981',
  },
  filterButton: {
    backgroundColor: '#f59e0b',
  },
  selectText: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
    fontWeight: '600',
  },
  clearButton: {
    marginLeft: 8,
    paddingHorizontal: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '80%',
    maxHeight: '70%',
  },
  modalHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    paddingHorizontal: 8,
  },
  closeText: {
    color: '#6b7280',
    fontSize: 20,
    fontWeight: 'bold',
  },
  optionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clearOption: {
    backgroundColor: '#fef2f2',
  },
  selectedOption: {
    backgroundColor: '#eff6ff',
  },
  optionText: {
    fontSize: 16,
    color: '#111827',
    flex: 1,
  },
  clearOptionText: {
    color: '#dc2626',
    fontWeight: '600',
  },
  selectedOptionText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  checkmark: {
    color: '#2563eb',
    fontSize: 18,
    fontWeight: 'bold',
  },
});