import { useEffect } from 'react';
import { soundManager } from '../services/SoundManager';

export const useInstantPlayer = (
  soundItem: any, // Accepts the whole object now
  isPlaying: boolean,
  volume: number = 1.0,
) => {
  useEffect(() => {
    // Safety check
    if (!soundItem) return;

    if (isPlaying) {
      soundManager.play(soundItem, volume);
    } else {
      // Pass the object so Manager can determine the ID/URL to pause
      soundManager.pause(soundItem);
    }

    // Cleanup: Pause this specific sound when unmounting
    return () => {
      soundManager.pause(soundItem);
    };
  }, [soundItem, isPlaying, volume]);
};
