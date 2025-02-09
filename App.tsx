import React, { createContext, useState, useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, Button, View, Image, TouchableOpacity } from 'react-native';
import AddScreen from './src/screens/AddScreen';
import ListTimer from './src/screens/ListTimer';
import Progress from './src/screens/Progress';

// Create a context for theme management
const ThemeContext = createContext<any>(null);
// Stack navigator
const Stack = createStackNavigator();

// Custom light and dark theme
const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    text: '#000',
    primary: '#6200EE',
  },
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
    text: '#fff',
    primary: '#BB86FC',
  },
};

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <NavigationContainer theme={isDarkTheme ? darkTheme : lightTheme}>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: isDarkTheme ? '#121212' : '#0000FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => <ToggleThemeButton />, // Button to toggle theme
          }}
        >
          <Stack.Screen name="Lists" component={ListTimer} options={{ title: 'List of Timer' }} />
          <Stack.Screen name="AddScreen" component={AddScreen} options={{ title: 'Add Timer' }} />
          <Stack.Screen name="Progress" component={Progress} options={{ title: 'Progress' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

// Button to toggle the theme
const ToggleThemeButton = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext); // Access theme context

  return (
    <TouchableOpacity onPress={toggleTheme}>
      {!isDarkTheme ? (
        <Image source={require('./assets/moon.png')} style={{ width: 20, height: 20, marginRight: 15 }} />
      ) : (
        <Image source={require('./assets/day-mode.png')} style={{ width: 20, height: 20, marginRight: 15 }} />
      )}
    </TouchableOpacity>
  );
};

export default App;
