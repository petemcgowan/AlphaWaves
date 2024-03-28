import Sound from 'react-native-sound';

export interface RainSound {
  hlsPlaylist: {
    uri: string;
  };
  videoFile: {
    uri: string;
  };
  videoBackground: {
    uri: string;
  };
  videoLoaded: boolean;
  videoExists: boolean;
  videoFileSize: number;
  videoPoster: any; // 'require' returns any
  videoPosterUri: string;
  videoPosterPath: string;
  timerDialogBackgroundColor: string;
  timerDialogFontColor: string;
  timerControlsFontColor: string;
  playingSound: Sound | null;
  volume: number;
  id: string;
}
