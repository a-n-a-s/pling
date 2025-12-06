import React from 'react';
import { View } from 'react-native';

const NeonCircle = ({ x, y, radius, color, style }) => (
  <View style={[
    {
      position: 'absolute',
      left: x - radius * 2,
      top: y - radius * 2,
      width: radius * 4,
      height: radius * 4,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    style
  ]}>
     {/* Outer Soft Shadow (Cartoony) */}
     <View style={{
        position: 'absolute',
        top: 2, 
        width: radius * 2,
        height: radius * 2,
        borderRadius: radius,
        backgroundColor: 'rgba(0,0,0,0.2)',
     }} />
     
     {/* Inner Core */}
     <View style={{
        width: radius * 2,
        height: radius * 2,
        borderRadius: radius,
        backgroundColor: color, 
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.8)', 
     }} />
  </View>
);

export default NeonCircle;
