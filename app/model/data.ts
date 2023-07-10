import Sound from 'react-native-sound'
import { Image } from 'react-native'

import videoPosterPath1 from '../../assets/images/posters/rainInPorchOverlookingForest.jpg'
import videoPosterPath2 from '../../assets/images/posters/RainInACar540x960.jpg'
import videoPosterPath3 from '../../assets/images/posters/HeavyRainOnWindowOnTheTrain.jpg'
import videoPosterPath4 from '../../assets/images/posters/RainPouringDown.jpg'
import videoPosterPath5 from '../../assets/images/posters/RainPouringDown.jpg'

const rainSounds = [
  {
    videoBackground: require('../../assets/videos/rainInPorchOverlookingForest.mp4'),
    videoPoster: require('../../assets/images/posters/rainInPorchOverlookingForest.jpg'),
    videoPosterUri: Image.resolveAssetSource(videoPosterPath1).uri,
    timerDialogBackgroundColor: '#136a53',
    timerDialogFontColor: '#d5e5ea',
    timerControlsFontColor: '#d5e5ea',
    playingSound: new Sound(
      'cozy_cabin_porch_with_heavy_rainstorm_trim.mp3',
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log('failed to load the ocean water sound', error)
          return
        }
      }
    ),
    id: '1',
  },
  {
    videoBackground: require('../../assets/videos/RainInACar540x960.mp4'),
    videoPoster: require('../../assets/images/posters/RainInACar540x960.jpg'),
    videoPosterUri: Image.resolveAssetSource(videoPosterPath2).uri,
    timerDialogBackgroundColor: '#4d94ca',
    timerDialogFontColor: '#afb7ad',
    timerControlsFontColor: '#afb7ad',
    playingSound: new Sound(
      'night_rain_on_a_car_trim.mp3',
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log('failed to load the plane window sound', error)
          return
        }
      }
    ),
    id: '2',
  },
  {
    videoBackground: require('../../assets/videos/HeavyRainOnWindowOnTheTrain.mp4'),
    videoPoster: require('../../assets/images/posters/HeavyRainOnWindowOnTheTrain.jpg'),
    videoPosterUri: Image.resolveAssetSource(videoPosterPath3).uri,
    timerDialogBackgroundColor: '#47819d',
    timerDialogFontColor: '#faaf32',
    timerControlsFontColor: '#faaf32',
    playingSound: new Sound(
      'heavy1_rain_on_window_on_the_train.mp3',
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log('failed to load the night in Turkey sound', error)
          return
        }
      }
    ),
    id: '3',
  },
  {
    videoBackground: require('../../assets/videos/RainPouringDown.mp4'),
    videoPoster: require('../../assets/images/posters/RainPouringDown.jpg'),
    videoPosterUri: Image.resolveAssetSource(videoPosterPath4).uri,
    timerDialogBackgroundColor: '#2c5056',
    timerDialogFontColor: '#e4af91',
    timerControlsFontColor: '#e4af91',
    playingSound: new Sound(
      'rain_hitting_a_campervan_roof_window.mp3',
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log('failed to load the night waves sound', error)
          return
        }
      }
    ),
    id: '4',
  },
  {
    videoBackground: require('../../assets/videos/GentleWavesonaSmallWhiteRockBeach.mp4'),
    videoPoster: require('../../assets/images/posters/GentleWavesonaSmallWhiteRockBeach.jpg'),
    videoPosterUri: Image.resolveAssetSource(videoPosterPath5).uri,
    timerDialogBackgroundColor: '#2c5056',
    timerDialogFontColor: '#e4af91',
    timerControlsFontColor: '#e4af91',
    playingSound: new Sound(
      'gentle_waves_on_a_small_white_rock_beach.mp3',
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log('failed to load the night waves sound', error)
          return
        }
      }
    ),
    id: '5',
  },
]

export default rainSounds
