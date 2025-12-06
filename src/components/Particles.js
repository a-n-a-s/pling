import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

const Particle = ({ x, y, color }) => {
    const opacity = useRef(new Animated.Value(1)).current;
    const scale = useRef(new Animated.Value(1)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, { 
                toValue: 0, 
                duration: 600, 
                useNativeDriver: true 
            }),
            Animated.timing(scale, { 
                toValue: 0, 
                duration: 600, 
                useNativeDriver: true 
            }),
            Animated.timing(translateY, { 
                toValue: 50, // Fall down a bit
                duration: 600, 
                useNativeDriver: true 
            }),
        ]).start();
    }, []);

    return (
        <Animated.View style={{
            position: 'absolute',
            left: x, 
            top: y, 
            width: 8, 
            height: 8, 
            borderRadius: 4,
            backgroundColor: color,
            opacity: opacity,
            transform: [{ scale }, { translateY }]
        }}/>
    );
};

const Particles = ({ items }) => {
    return (
        <>
            {items.map(p => (
                <Particle key={p.id} x={p.x} y={p.y} color={p.color} />
            ))}
        </>
    );
};
export default Particles;
