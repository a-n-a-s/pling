import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.centerContent}>
      <Text style={[styles.title, { fontSize: 40 }]}>PLAIN PLING</Text>
      <Text style={styles.subtitle}>Drop, Bounce, Win!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#EEE',
    fontWeight: 'bold',
    letterSpacing: 4,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  subtitle: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
    fontWeight: '300',
    letterSpacing: 2,
  },
});

export default SplashScreen;
