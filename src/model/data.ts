import Sound from 'react-native-sound';
import {Image} from 'react-native';
import Config from 'react-native-config';

import videoPosterPath1 from '../../assets/images/posters/rainInPorchOverlookingForest.jpg';
import videoPosterPath2 from '../../assets/images/posters/RainInACar540x960.jpg';
import videoPosterPath3 from '../../assets/images/posters/RainInACarAltHD.jpg';
import videoPosterPath4 from '../../assets/images/posters/HDerGrassyRain.jpg';
import videoPosterPath5 from '../../assets/images/posters/blueSplashes3Reduced1.jpg';
import {RainSound} from '../types/RainSound';

const DataTsserverURL = Config.HLS_SERVER_URL;
console.log('Config.HLS_SERVER_URL:' + Config.HLS_SERVER_URL);
console.log('DataTsserverURL:' + DataTsserverURL);

const rainSounds: RainSound[] = [
  {
    videoBackground: {
      uri: `${Config.HLS_SERVER_URL}/RainInACarAltHD/master.m3u8`,
    },
    // videoBackground: {
    //   uri: `http://localhost:8080/RainInACarAltHD/master.m3u8`,
    // },
    videoPoster: require('../../assets/images/posters/RainInACarAltHD.jpg'),
    videoPosterUri: Image.resolveAssetSource(videoPosterPath3).uri,
    timerDialogBackgroundColor: 'rgb(38, 27, 21)',
    timerDialogFontColor: '#fff',
    timerControlsFontColor: '#fff',
    // ['rgb(38, 27, 21)', 'rgb(25, 26, 29)', 'rgb(9, 21, 39)']
    playingSound: new Sound(
      'relaxing_sounds_of_light_rain_falling_on_the_car_trim.mp3',
      // 'relaxing_sounds_of_light_rain_falling_on_the_car_trim2',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('failed to load the Rain In A Car AltHD sound', error);
          return;
        }
      }
    ),
    volume: 0.7,
    id: '1',
  },
  {
    videoBackground: {
      uri: `${Config.HLS_SERVER_URL}/RainInACar/master.m3u8`,
    },
    // videoBackground: {
    //   uri: `http://localhost:8080/RainInACar/master.m3u8`,
    // },
    videoPoster: require('../../assets/images/posters/RainInACar540x960.jpg'),
    videoPosterUri: Image.resolveAssetSource(videoPosterPath2).uri,
    timerDialogBackgroundColor: '#4d94ca',
    timerDialogFontColor: '#afb7ad',
    timerControlsFontColor: '#afb7ad',
    playingSound: new Sound(
      'night_rain_on_a_car_trim.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('failed to load the night rain car sound', error);
          return;
        }
      }
    ),
    volume: 0.3,
    id: '2',
  },
  {
    videoBackground: {
      uri: `${Config.HLS_SERVER_URL}/rainInPorchOverlookingForest/master.m3u8`,
    },
    // videoBackground: {
    //   uri: `http://localhost:8080/rainInPorchOverlookingForest/master.m3u8`,
    // },
    videoPoster: require('../../assets/images/posters/rainInPorchOverlookingForest.jpg'),
    videoPosterUri: Image.resolveAssetSource(videoPosterPath1).uri,
    timerDialogBackgroundColor: '#136a53',
    timerDialogFontColor: '#d5e5ea',
    timerControlsFontColor: '#d5e5ea',
    playingSound: new Sound(
      'cozy_cabin_porch_with_heavy_rainstorm_trim.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('failed to load the porch rainstorm sound', error);
          return;
        }
      }
    ),
    volume: 0.7,
    id: '3',
  },
  {
    // videoBackground: {
    //   uri: `http://localhost:8080/rainPouringDown/master.m3u8`,
    // },
    videoBackground: {
      uri: `${Config.HLS_SERVER_URL}/rainPouringDown/master.m3u8`,
    },
    videoPoster: require('../../assets/images/posters/HDerGrassyRain.jpg'),
    videoPosterUri: Image.resolveAssetSource(videoPosterPath4).uri,
    timerDialogBackgroundColor: 'rgb(38, 27, 21)',
    timerDialogFontColor: '#fff',
    timerControlsFontColor: '#fff',
    // ['rgb(38, 27, 21)', 'rgb(25, 26, 29)', 'rgb(9, 21, 39)']
    playingSound: new Sound(
      'rain_hitting_a_campervan_roof_window.mp3',
      // 'relaxing_sounds_of_light_rain_falling_on_the_car_trim2',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('failed to load the Rain In A Car AltHD sound', error);
          return;
        }
      }
    ),
    id: '4',
    volume: 0.5,
  },
  {
    videoBackground: {
      uri: `${Config.HLS_SERVER_URL}/blueSplashes/master.m3u8`,
    },
    // videoBackground: {
    //   uri: `http://localhost:8080/blueSplashes/master.m3u8`,
    // },
    videoPoster: require('../../assets/images/posters/blueSplashes3Reduced1.jpg'),
    videoPosterUri: Image.resolveAssetSource(videoPosterPath5).uri,
    timerDialogBackgroundColor: 'rgb(9, 21, 39)',
    timerDialogFontColor: '#e4af91',
    timerControlsFontColor: '#fff',
    playingSound: new Sound(
      'rain_on_water_swimming_pool_snip.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('failed to load the waves rock beach sound', error);
          return;
        }
      }
    ),
    volume: 0.4,
    id: '5',
  },
];

export default rainSounds;
