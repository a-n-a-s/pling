import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { PEG_TYPES, MAX_TRIES } from '../constants/GameConstants';

const RulesScreen = ({ onStart }) => (
  <View style={styles.rulesContainer}>
    <Text style={styles.title}>HOW TO PLAY</Text>
    
    <View style={styles.ruleSection}>
      <Text style={styles.ruleText}>1. Drop balls to score points.</Text>
      <Text style={styles.ruleText}>2. You have {MAX_TRIES} tries to beat your score.</Text>
    </View>

    <Text style={styles.subHeader}>SPECIAL PEGS</Text>
    <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: PEG_TYPES.TRAMPOLINE.color }]} />
          <Text style={styles.legendText}>Trampoline (High Bounce)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: PEG_TYPES.STICKY.color }]} />
          <Text style={styles.legendText}>Sticky (Low Bounce)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: PEG_TYPES.BONUS.color }]} />
          <Text style={styles.legendText}>Bonus (+50 Points)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: PEG_TYPES.EXTRA_TRY.color }]} />
          <Text style={styles.legendText}>Orange (+1 Extra Try!)</Text>
        </View>
    </View>

    <TouchableWithoutFeedback onPress={onStart}>
        <View style={styles.startButton}>
          <Text style={styles.buttonText}>START GAME</Text>
        </View>
    </TouchableWithoutFeedback>
  </View>
);

const styles = StyleSheet.create({
  rulesContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    color: '#EEE',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 4,
    marginBottom: 20,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  subHeader: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15,
    letterSpacing: 2,
  },
  ruleSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  ruleText: {
    color: '#EEE',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '600',
  },
  legendContainer: {
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  legendDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 15,
    borderWidth: 2,
    borderColor: 'white',
  },
  legendText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  startButton: {
    marginTop: 50,
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 2,
  },
});

export default RulesScreen;
