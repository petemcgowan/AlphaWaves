// Import your sound and image libraries specific to React
import {Howl} from 'howler';
import videoPosterPath1 from '../../assets/images/posters/rainInPorchOverlookingForest.jpg';
import videoPosterPath2 from '../../assets/images/posters/RainInACar540x960.jpg';
import videoPosterPath3 from '../../assets/images/posters/HeavyRainOnWindowOnTheTrain.jpg';
import videoPosterPath4 from '../../assets/images/posters/RainPouringDown.jpg';
import videoPosterPath5 from '../../assets/images/posters/RainPouringDown.jpg';

import videoBackground1 from '../../assets/videos/rainInPorchOverlookingForest.mp4';
import videoBackground2 from '../../assets/videos/RainInACar540x960.mp4';
import videoBackground3 from '../../assets/videos/HeavyRainOnWindowOnTheTrain.mp4';
import videoBackground4 from '../../assets/videos/RainPouringDown.mp4';
import videoBackground5 from '../../assets/videos/GentleWavesonaSmallWhiteRockBeach.mp4';

import videoPoster1 from '../../assets/images/posters/rainInPorchOverlookingForest.jpg';
import videoPoster2 from '../../assets/images/posters/RainInACar540x960.jpg';
import videoPoster3 from '../../assets/images/posters/HeavyRainOnWindowOnTheTrain.jpg';
import videoPoster4 from '../../assets/images/posters/RainPouringDown.jpg';
import videoPoster5 from '../../assets/images/posters/GentleWavesonaSmallWhiteRockBeach.jpg';

interface RainSound {
  videoBackground: any;
  videoPoster: any;
  videoPosterUri: string;
  timerDialogBackgroundColor: string;
  timerDialogFontColor: string;
  timerControlsFontColor: string;
  playingSound: Howl;
  id: string;
}

const rainSounds: RainSound[] = [
  {
    videoBackground: videoBackground1,
    videoPoster: videoPoster1,
    videoPosterUri: videoPosterPath1,
    timerDialogBackgroundColor: '#136a53',
    timerDialogFontColor: '#d5e5ea',
    timerControlsFontColor: '#d5e5ea',
    playingSound: new Howl({
      src: [
        '../../assets/sounds/cozy_cabin_porch_with_heavy_rainstorm_trim.mp3',
      ],
      html5: true,
      autoplay: false,
      loop: true,
      volume: 0.9,
    }),
    id: '1',
  },
  {
    videoBackground: videoBackground2,
    videoPoster: videoPoster2,
    videoPosterUri: videoPosterPath2,
    timerDialogBackgroundColor: '#4d94ca',
    timerDialogFontColor: '#afb7ad',
    timerControlsFontColor: '#afb7ad',
    playingSound: new Howl({
      src: ['../../assets/sounds/night_rain_on_a_car_trim.mp3'],
      html5: true,
      autoplay: false,
      loop: true,
      volume: 0.6,
    }),
    id: '2',
  },
  {
    videoBackground: videoBackground3,
    videoPoster: videoPoster3,
    videoPosterUri: videoPosterPath3,
    timerDialogBackgroundColor: '#47819d',
    timerDialogFontColor: '#faaf32',
    timerControlsFontColor: '#faaf32',
    playingSound: new Howl({
      src: ['../../assets/sounds/heavy1_rain_on_window_on_the_train.mp3'],
      html5: true,
      autoplay: false,
      loop: true,
      volume: 0.9,
    }),
    id: '3',
  },
  {
    videoBackground: videoBackground4,
    videoPoster: videoPoster4,
    videoPosterUri: videoPosterPath4,
    timerDialogBackgroundColor: '#2c5056',
    timerDialogFontColor: '#e4af91',
    timerControlsFontColor: '#e4af91',
    playingSound: new Howl({
      src: ['../../assets/sounds/rain_hitting_a_campervan_roof_window.mp3'],
      html5: true,
      autoplay: false,
      loop: true,
      volume: 0.9,
    }),
    id: '4',
  },
  {
    videoBackground: videoBackground5,
    videoPoster: videoPoster5,
    videoPosterUri: videoPosterPath5,
    timerDialogBackgroundColor: '#2c5056',
    timerDialogFontColor: '#e4af91',
    timerControlsFontColor: '#e4af91',
    playingSound: new Howl({
      src: ['../../assets/sounds/gentle_waves_on_a_small_white_rock_beach.mp3'],
      html5: true,
      autoplay: false,
      loop: true,
      volume: 0.7,
    }),
    id: '5',
  },
];

export default rainSounds;
