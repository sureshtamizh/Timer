import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import categories from '../consts/data';

const Dropdown = ({ onSelect }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState('Select an Option');

    const toggleDropdown = () => setIsVisible(!isVisible);

    const handleSelect = (item) => {
        setSelectedValue(item);
        setIsVisible(false);
        onSelect(item);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
                <Text>{selectedValue}</Text>
            </TouchableOpacity>

            <Modal visible={isVisible} transparent animationType="slide">
                <TouchableOpacity style={styles.modalOverlay} onPress={toggleDropdown}>
                    <View style={styles.dropdownContainer}>
                        <FlatList
                            data={categories}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleSelect(item)} style={styles.dropdownItem}>
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    dropdownButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        minWidth: 200,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dropdownContainer: {
        width: '80%',
        maxHeight: 200,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
    },
    dropdownItem: {
        padding: 10,
        borderBottomColor: '#ccc',
    },
});

export default Dropdown;