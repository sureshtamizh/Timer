import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const saveTimerToStorage = async (timer) => {
    console.log(timer)
    try {
        // Retrieve existing timers from AsyncStorage
        const existingTimers = await AsyncStorage.getItem('timers');
        const timers = existingTimers ? JSON.parse(existingTimers) : [];

        // Add the new timer to the list
        timers.push(timer);

        // Save the updated list back to AsyncStorage
        await AsyncStorage.setItem('timers', JSON.stringify(timers));
        Alert.alert('Success', 'Timer saved successfully!');
    } catch (error) {
        console.error('Error saving timer:', error);
        Alert.alert('Error', 'Failed to save timer.');
    }
};

// Optional: Add a function to fetch timers
export const fetchTimersFromStorage = async () => {
    try {
        const storedTimers = await AsyncStorage.getItem('timers');
        return storedTimers ? JSON.parse(storedTimers) : [];
    } catch (error) {
        console.error('Error fetching timers:', error);
        return [];
    }
};