import { useAudioPlayer } from 'expo-audio';

export const useSoundManager = () => {
    // Defines players for each sound effect
    // Note: User needs to add these files to assets/
    
    const plingPlayer = useAudioPlayer(require('../../assets/pling.mp3'));
    const scorePlayer = useAudioPlayer(require('../../assets/score.mp3'));
    const bouncePlayer = useAudioPlayer(require('../../assets/bounce.mp3'));

    const play = (name) => {
        try {
            switch (name) {
                case 'pling':
                    if (plingPlayer) {
                       plingPlayer.seekTo(0);
                       plingPlayer.play();
                    }
                    break;
                case 'score':
                    if (scorePlayer) {
                       scorePlayer.seekTo(0);
                       scorePlayer.play();
                    }
                    break;
                case 'bounce_heavy':
                    if (bouncePlayer) {
                       bouncePlayer.seekTo(0);
                       bouncePlayer.play();
                    }
                    break;
                default:
                    console.log("Unknown sound:", name);
                    break;
            }
        } catch (e) {
            console.log("Error playing sound", e);
        }
    };

    return { play };
};
