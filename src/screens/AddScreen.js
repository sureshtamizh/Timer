import React, { useState, useContext } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Dropdown from '../components/Dropdown';
import Duration from '../components/Duration';
import { saveTimerToStorage } from '../stoargeHelper/stoarge';
import { ThemeContext } from '@react-navigation/native';

const AddScreen = () => {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [category, setCategory] = useState('');

    const { isDarkTheme } = useContext(ThemeContext); // Get the theme context

    const submitDetails = () => {
        console.log(name, category, duration);
        if (!name || !category || !duration) {
            Alert.alert('Error', 'Please fill out all fields.');
            return;
        }

        // Create a timer object
        const timer = {
            id: Date.now().toString(), // Unique ID for each timer
            name,
            category,
            duration: parseInt(duration, 10), // Convert duration to a number
        };

        // Save the timer to AsyncStorage
        saveTimerToStorage(timer);

        // Reset the form fields
        setName('');
        setCategory('');
        setDuration('');
    };

    return (
        <View style={[styles.container, { backgroundColor: isDarkTheme ? '#121212' : '#fff' }]}>
            <Text style={[styles.text, { color: isDarkTheme ? '#fff' : '#000' }]}>Name</Text>
            <TextInput
                placeholder="Name"
                style={[styles.input, { color: isDarkTheme ? '#fff' : '#000', borderColor: isDarkTheme ? '#fff' : '#000' }]}
                onChangeText={setName}
                value={name}
            />

            <Dropdown onSelect={(category) => setCategory(category)} />

            <Duration onSubmit={(duration) => setDuration(duration)} />

            <Button title="Submit" onPress={submitDetails} />
        </View>
    );
};

export default AddScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        padding: 20,
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
});
