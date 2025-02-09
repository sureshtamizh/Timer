import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fetchTimersFromStorage } from '../stoargeHelper/stoarge';
import { ThemeContext, useFocusEffect } from '@react-navigation/core'; // Correct import for useFocusEffect

const ListTimer = ({ navigation }) => {
    const [timers, setTimers] = useState([]);

    // Fetch timers when the component mounts
    useFocusEffect(
        React.useCallback(() => {
            const loadTimers = async () => {
                const fetchedTimers = await fetchTimersFromStorage();
                setTimers(fetchedTimers);
            };
            loadTimers();

            // Optional: Cleanup function if needed
            return () => {
                // Perform cleanup here if necessary
            };
        }, []) // Empty dependency array ensures this runs only when the screen is focused
    );

    const progressbar = (duration) => {
        navigation.navigate('Progress', { timeduration: duration });
    }

    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <View style={[styles.container, { backgroundColor: isDarkTheme ? '#121212' : '#fff' }]}>
            <Text style={[styles.text, { color: isDarkTheme ? '#fff' : '#000' }]}>Saved Timers</Text>
            <FlatList
                data={timers}
                keyExtractor={(item) => item.id.toString()} // Ensure id is a string
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <View>
                            <Text style={{ color: isDarkTheme ? '#fff' : '#000' }}>Name: {item.name}</Text>
                            <Text style={{ color: isDarkTheme ? '#fff' : '#000' }}>Category: {item.category}</Text>
                            <Text style={{ color: isDarkTheme ? '#fff' : '#000' }}>Duration: {item.duration} seconds</Text>
                        </View>
                        <TouchableOpacity style={styles.startbutton} onPress={() => progressbar(item.duration)}>
                            <Text style={styles.startbuttonText}>Start</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddScreen')} // Navigate to the AddScreen
            >
                <Image source={require('../../assets/add.png')} style={styles.image} />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center'
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    timerItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: 60, // Width of the image
        height: 60, // Height of the image
        padding: 10,
    },
    startbutton: {
        backgroundColor: '#4CAF50', // Background color for visibility
        padding: 15,
        borderRadius: 20,
        width: 100
    },
    startbuttonText: {
        alignSelf: 'center'
    },
    addButton: {
        position: 'absolute', // Positioning the image absolutely within the parent view
        bottom: 30, // Distance from the bottom of the screen
        right: 20, // Distance from the right of the screen
        borderRadius: 30, // Rounded button
        elevation: 15, // Add shadow 
    },
    addButtonText: {
        fontSize: 30,
        fontWeight: 'bold',
    }
});

export default ListTimer;
