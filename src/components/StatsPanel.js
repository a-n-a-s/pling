import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const StatsPanel = ({ score, bestScore, tries }) => {
    const [displayScore, setDisplayScore] = useState(0);

    // Score Animation
    useEffect(() => {
        if (displayScore < score) {
            const diff = score - displayScore;
            const step = Math.ceil(diff / 10); 
            const timer = setTimeout(() => {
                setDisplayScore(s => Math.min(score, s + step));
            }, 30);
            return () => clearTimeout(timer);
        } else if (displayScore > score) {
             // Reset or verify? If score resets to 0 (new game)
             setDisplayScore(score);
        }
    }, [score, displayScore]);

    return (
        <View style={styles.statsContainer}>
            <View style={styles.statBox}>
                <Text style={styles.statLabel}>SCORE</Text>
                <Text style={styles.statValue}>{displayScore}</Text>
            </View>
            <View style={styles.statBox}>
                <Text style={styles.statLabel}>BEST</Text>
                <Text style={styles.statValue}>{bestScore}</Text>
            </View>
            <View style={styles.statBox}>
                <Text style={styles.statLabel}>TRIES</Text>
                <Text style={styles.statValue}>{tries}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 20,
    },
    statBox: {
        alignItems: 'center',
    },
    statLabel: {
        color: '#EEE',
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 1,
    },
    statValue: {
        color: 'white',
        fontSize: 28,
        fontWeight: '900',
        textShadowColor: 'rgba(0,0,0,0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
});

export default StatsPanel;
