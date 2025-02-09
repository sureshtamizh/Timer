import { ThemeContext } from '@react-navigation/native';
import React, { useState, useEffect, useRef, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    Button,
} from 'react-native';

const Progress = ({ route }) => {
    const { timeduration } = route.params; // Total duration in seconds
    const [remainingTime, setRemainingTime] = useState(timeduration); // Remaining time
    const [progress, setProgress] = useState(100); // Progress percentage
    const [isRunning, setIsRunning] = useState(false); // Timer running state
    const intervalRef = useRef(null); // Reference to the interval
    const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
    const [feedback, setFeedback] = useState(''); // Feedback input state

    const { isDarkTheme } = useContext(ThemeContext); // Get the theme context

    // Start or pause the timer
    useEffect(() => {
        if (isRunning && remainingTime > 0) {
            // Start the timer
            intervalRef.current = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            // Clear the interval if paused or time is up
            clearInterval(intervalRef.current);
        }

        // Cleanup interval on component unmount
        return () => clearInterval(intervalRef.current);
    }, [isRunning, remainingTime]);

    // Update progress percentage based on remaining time
    useEffect(() => {
        const calculatedProgress = ((remainingTime / timeduration) * 100).toFixed(2);
        setProgress(calculatedProgress);

        // Show feedback modal when the timer finishes
        if (remainingTime === 0) {
            setIsRunning(false); // Stop the timer
            setIsModalVisible(true); // Show the modal
        }
    }, [remainingTime]);

    // Start the timer
    const handleStart = () => {
        setIsRunning(true); // Set the timer to running state
    };

    // Pause the timer
    const handlePause = () => {
        setIsRunning(false); // Set the timer to paused state
    };

    // Reset the timer
    const handleReset = () => {
        setIsRunning(false); // Stop the timer
        setRemainingTime(timeduration); // Reset to original duration
        setIsModalVisible(false); // Hide the modal
    };

    return (
        <View style={[styles.container, { backgroundColor: isDarkTheme ? '#121212' : '#fff' }]}>
            {/* Timer Display */}
            <Text style={styles.timerText}>{remainingTime} seconds remaining</Text>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
                <View
                    style={[
                        styles.progressBar,
                        {
                            width: `${progress}%`,
                            backgroundColor:
                                progress > 50 ? 'green' : progress > 20 ? 'orange' : 'red',
                        },
                    ]}
                />
            </View>

            {/* Control Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleStart}>
                    <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handlePause}>
                    <Text style={styles.buttonText}>Pause</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleReset}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
            </View>

            {/* Feedback Modal */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Provide Feedback</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your feedback..."
                            value={feedback}
                            onChangeText={setFeedback}
                        />
                        <View style={styles.modalButtons}>
                            <Button
                                title="Submit"
                                onPress={() => {
                                    setIsModalVisible(false); // Close the modal
                                    console.log('Feedback submitted:', feedback); // Handle feedback submission
                                    setFeedback(''); // Reset feedback input
                                }}
                            />
                            <Button
                                title="Cancel"
                                color="red"
                                onPress={() => setIsModalVisible(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    timerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    progressBarContainer: {
        height: 20,
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
        gap: 10,
    },
    button: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default Progress;
