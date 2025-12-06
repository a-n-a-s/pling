import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SplashScreen from './src/screens/SplashScreen';
import RulesScreen from './src/screens/RulesScreen';
import GameScreen from './src/screens/GameScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('SPLASH'); // SPLASH, RULES, GAME

  let content;
  if (currentScreen === 'SPLASH') {
    content = <SplashScreen onFinish={() => setCurrentScreen('RULES')} />;
  } else if (currentScreen === 'RULES') {
    content = <RulesScreen onStart={() => setCurrentScreen('GAME')} />;
  } else {
    content = <GameScreen />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4ECDC4', // Playful Teal
  },
});
