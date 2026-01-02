import { useEffect, useRef } from 'react';
import { AudioManager, Player } from 'react-native-audio-playback';

export const useGaplessPlayer = (
  audioFile: number,
  isPlaying: boolean,
  volume: number = 1.0,
) => {
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      // 1. Cleanup anything lingering (Safety)
      if (playerRef.current) {
        playerRef.current.pauseSound();
        playerRef.current.unloadSound();
        playerRef.current = null;
      }

      try {
        // 2. Load the sound
        const player = await AudioManager.shared.loadSound(audioFile);

        // 3. If component died while loading, kill player immediately
        if (!isMounted) {
          player?.unloadSound();
          return;
        }

        if (player) {
          playerRef.current = player;
          player.loopSound(true);
          player.setVolume(volume);

          if (isPlaying) {
            player.playSound();
          }
        }
      } catch (e) {
        console.log('Audio load error (safe to ignore if fast swiping)', e);
      }
    };

    init();

    // 4. CLEANUP: When you swipe away, this runs.
    return () => {
      isMounted = false;
      if (playerRef.current) {
        playerRef.current.pauseSound();
        playerRef.current.unloadSound();
        playerRef.current = null;
      }
    };
  }, [audioFile]); // Re-run when file changes

  // Simple Play/Pause Watcher
  useEffect(() => {
    const player = playerRef.current;
    if (player) {
      if (isPlaying) player.playSound();
      else player.pauseSound();
    }
  }, [isPlaying]);

  // Simple Volume Watcher
  useEffect(() => {
    const player = playerRef.current;
    if (player) player.setVolume(volume);
  }, [volume]);
};
