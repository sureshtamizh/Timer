import React, { useState } from 'react';
import { Modal, StyleSheet, TextInput, TouchableOpacity, View, Text, Button } from 'react-native';

const Duration = ({ onSubmit }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [duration, setDuration] = useState('');

    const toggleDropdown = () => setIsVisible(!isVisible);

    const handleSubmit = () => {
        toggleDropdown();
        onSubmit && onSubmit(duration); // Pass the entered duration to the parent
    };

    return (
        <View>
            <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
                <Text>Duration: {duration || 'Not Set'}</Text>
            </TouchableOpacity>
            <Modal visible={isVisible} transparent animationType="fade">
                <TouchableOpacity style={styles.modalOverlay} onPress={toggleDropdown}>
                    <View style={styles.dropdownContainer}>
                        <TextInput
                            placeholder="Enter Your Time (Seconds)"
                            keyboardType="numeric"
                            value={duration}
                            onChangeText={setDuration}
                            style={styles.input}
                        />
                        <Button title="Submit" onPress={handleSubmit} />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dropdownButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        minWidth: 200,
    },
    dropdownContainer: {
        width: '80%',
        maxHeight: 200,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
});

export default Duration;