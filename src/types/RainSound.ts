import Sound from 'react-native-sound';

export interface RainSound {
  videoBackground: {
    uri: string;
  };
  videoPoster: any; // 'require' returns any, adjust if you have a more specific type
  videoPosterUri: string;
  timerDialogBackgroundColor: string;
  timerDialogFontColor: string;
  timerControlsFontColor: string;
  playingSound: Sound; // Assuming 'Sound' is a type you've defined elsewhere
  volume: number;
  id: string;
}
