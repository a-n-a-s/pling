import React, { useRef } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated } from 'react-native';
import { 
    PEG_RADIUS, BALL_RADIUS, BIN_WIDTH, DIVIDER_HEIGHT 
} from '../constants/GameConstants';
import NeonCircle from '../components/NeonCircle';
import NeonBin from '../components/NeonBin';
import Particles from '../components/Particles';
import StatsPanel from '../components/StatsPanel';
import { useGameLoop } from '../hooks/useGameLoop';

const GameScreen = () => {
    const shakeAnim = useRef(new Animated.Value(0)).current;

    const triggerShake = () => {
        shakeAnim.setValue(0);
        Animated.sequence([
            Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 5, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
        ]).start();
    };

    const { 
        score, bestScore, tries, balls, particles, pegs, 
        spawnBall, resetGame 
    } = useGameLoop({
        onShake: triggerShake
    });

    return (
        <Animated.View style={[styles.container, { transform: [{ translateX: shakeAnim }] }]}>
            <View style={styles.uiLayer}>
                <Text style={styles.title}>PLAIN PLING</Text>
                <StatsPanel score={score} bestScore={bestScore} tries={tries} />
            </View>

            {pegs.map(peg => (
                <NeonCircle 
                    key={peg.id}
                    x={peg.x}
                    y={peg.y}
                    radius={PEG_RADIUS}
                    color={peg.type.color} 
                />
            ))}

            {balls.map(ball => (
                <NeonCircle 
                    key={ball.id}
                    x={ball.x}
                    y={ball.y}
                    radius={BALL_RADIUS}
                    color="#FF6B6B"
                />
            ))}

            <Particles items={particles} />

            <View style={styles.binsContainer}>
                {[1, 2, 3, 4].map(i => (
                <View 
                    key={`div-${i}`}
                    style={[styles.divider, { left: i * BIN_WIDTH - 2 }]} 
                />
                ))}

                {[
                { score: 10, color: '#FF9FF3', height: 60 }, 
                { score: 50, color: '#54A0FF', height: 90 }, 
                { score: 100, color: '#Feca57', height: 120 }, 
                { score: 50, color: '#54A0FF', height: 90 },
                { score: 10, color: '#FF9FF3', height: 60 },
                ].map((bin, index) => (
                <View key={index} style={{ width: BIN_WIDTH }}>
                    <NeonBin 
                        height={bin.height}
                        color={bin.color}
                        score={bin.score}
                    />
                </View>
                ))}
            </View>

            <TouchableWithoutFeedback onPress={tries > 0 ? spawnBall : resetGame}>
            <View style={[styles.button, tries <= 0 && styles.resetButton]}>
                <Text style={styles.buttonText}>{tries > 0 ? "DROP BALL" : "PLAY AGAIN"}</Text>
            </View>
            </TouchableWithoutFeedback>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    uiLayer: {
        position: 'absolute',
        top: 60,
        width: '100%',
        alignItems: 'center',
        zIndex: 10,
    },
    title: {
        color: '#888',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 4,
        marginBottom: 20,
        textShadowColor: 'rgba(0,0,0,0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 0,
    },
    binsContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    divider: {
        position: 'absolute',
        bottom: 0,
        width: 4,
        height: DIVIDER_HEIGHT,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 2,
        zIndex: 5,
        shadowColor: '#FFF',
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    button: {
        position: 'absolute',
        top: 180, 
        alignSelf: 'center',
        backgroundColor: '#FF6B6B',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
        zIndex: 20,
    },
    resetButton: {
        backgroundColor: '#1dd1a1',
        borderColor: '#FFF',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 2,
    }
});

export default GameScreen;
