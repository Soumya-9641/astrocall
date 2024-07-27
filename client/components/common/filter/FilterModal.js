import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
const FilterModal = ({ visible, onClose, onApplyFilter }) => {
    const [selectedFilter, setSelectedFilter] = useState('');

  const applyFilter = (filter) => {
    onApplyFilter(filter);
    onClose();
  };
  return ( <Modal
    transparent={true}
    visible={visible}
    animationType="slide"
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
          </View>
        <Text style={styles.modalTitle}>Sort By:</Text>
        <TouchableOpacity style={styles.modalOptionContainer} onPress={() => applyFilter('name')}>
          <Text style={styles.modalOption}>Name</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalOptionContainer} onPress={() => applyFilter('experience')}>
          <Text style={styles.modalOption}>Experience (High to Low)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalOptionContainer} onPress={() => applyFilter('rating')}>
          <Text style={styles.modalOption}>Rating</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  )
}


const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      padding: 20,
      backgroundColor: '#EAEDED',
      borderRadius: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
      },
    modalTitle: {
      fontSize: 18,
      marginBottom: 10,
    },
    modalOptionContainer: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#EAEDED',
        shadowColor: '#F1C40F',
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 5,
        shadowRadius: 3,
        elevation: 10,
      },
    modalOption: {
      fontSize: 16,
      marginVertical: 5,
    },
  });

export default FilterModal