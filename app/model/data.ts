import Sound from 'react-native-sound'
import { Image } from 'react-native'

import videoPosterPath1 from '../../assets/images/posters/rainInPorchOverlookingForest.jpg'
import videoPosterPath2 from '../../assets/images/posters/RainInACar540x960.jpg'
import videoPosterPath3 from '../../assets/images/posters/HeavyRainOnWindowOnTheTrain.jpg'
import videoPosterPath4 from '../../assets/images/posters/RainPouringDown.jpg'
import videoPosterPath5 from '../../assets/images/posters/GentleWavesonaSmallWhiteRockBeach.jpg'

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
          console.log('failed to load the porch rainstorm sound', error)
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
          console.log('failed to load the night rain car sound', error)
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
    timerDialogBackgroundColor: 'rgb(38, 27, 21)',
    timerDialogFontColor: '#fff',
    timerControlsFontColor: '#fff',
    // ['rgb(38, 27, 21)', 'rgb(25, 26, 29)', 'rgb(9, 21, 39)']
    playingSound: new Sound(
      'heavy1_rain_on_window_on_the_train.mp3',
      // 'relaxing_sounds_of_light_rain_falling_on_the_car_trim2',
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log('failed to load the rain on a train sound', error)
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
          console.log('failed to load the campervan roof sound', error)
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
    timerDialogBackgroundColor: 'rgb(9, 21, 39)',
    timerDialogFontColor: '#e4af91',
    timerControlsFontColor: '#fff',
    playingSound: new Sound(
      'gentle_waves_on_a_small_white_rock_beach.mp3',
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log('failed to load the waves rock beach sound', error)
          return
        }
      }
    ),
    id: '5',
  },
]

export default rainSounds
