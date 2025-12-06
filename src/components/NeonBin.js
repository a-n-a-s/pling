import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NeonBin = ({ height, color, score }) => (
  <View style={[styles.bin, { height }]}>
     {/* Main Bin Body */}
     <View style={{
        flex: 1,
        backgroundColor: color,
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderWidth: 3,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
     }}>
        <Text style={styles.binText}>{score}</Text>
     </View>
  </View>
);

const styles = StyleSheet.create({
  bin: {
    // Width handled by parent flex/width calc usually, but we need consistency
    // We pass style from parent typically if needed, or keeping basic styles here
  },
  binText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: -10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 2
  }
});

export default NeonBin;
