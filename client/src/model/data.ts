import {Image, Platform} from 'react-native'
// import Config from 'react-native-config'

import videoPosterPath1 from '../../assets/images/posters/rainInPorchOverlookingForest.jpg'
import videoPosterPath2 from '../../assets/images/posters/RainInACar540x960.jpg'
import videoPosterPath3 from '../../assets/images/posters/RainInACarAltHD.jpg'
import videoPosterPath4 from '../../assets/images/posters/HDerGrassyRain.jpg'
import videoPosterPath5 from '../../assets/images/posters/blueSplashes3Reduced1.jpg'

import noisePosterPath1 from '../../assets/images/posters/BigOceanWater.jpg'
import noisePosterPath2 from '../../assets/images/posters/WindowPlaneView.jpg'
import noisePosterPath3 from '../../assets/images/posters/HotAirBalloonatNightTurkey.jpg'
import noisePosterPath4 from '../../assets/images/posters/nightWavesAndSun.jpg'

import * as Assets from './AudioAssets'

const rainSounds = [
  {
    id: '1',
    // Video Data
    videoFile: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/RainInACarAltHD.mp4`,
    },
    hlsPlaylist: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/welcome/RainInACarAltHD.m3u8`,
    },
    videoFileSize: 24724538,
    videoPoster: require('../../assets/images/posters/RainInACarAltHD.jpg'),
    videoPosterUri: Image.resolveAssetSource(videoPosterPath3).uri,

    // UI Colors
    timerDialogBackgroundColor: 'rgb(38, 27, 21)',
    timerDialogFontColor: '#fff',
    timerControlsFontColor: '#fff',

    audioFile: Assets.RainCar,
    remoteAudioUrl:
      'https://d2lxk2a39jwsfn.cloudfront.net/audio/relaxing_sounds_of_light_rain_falling_on_the_car_trim.ogg',
    volume: 0.7,
  },
  {
    id: '2',
    videoFile: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/RainInACar.mp4`,
    },
    hlsPlaylist: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/welcome/RainInACar.m3u8`,
    },
    videoFileSize: 26890517,
    videoPoster: require('../../assets/images/posters/RainInACar540x960.jpg'),
    videoPosterUri: Image.resolveAssetSource(videoPosterPath2).uri,

    timerDialogBackgroundColor: '#4d61ca',
    timerDialogFontColor: '#afb7ad',
    timerControlsFontColor: '#afb7ad',

    audioFile: Assets.RainNight,
    remoteAudioUrl:
      'https://d2lxk2a39jwsfn.cloudfront.net/audio/night_rain_on_a_car_trim.ogg',
    volume: 0.4,
  },
  {
    id: '3',
    videoFile: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/RainCabin_1080_1920_30fps.mp4`,
    },
    hlsPlaylist: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/welcome/rainInPorchOverlookingForest.m3u8`,
    },
    videoFileSize: 6047312,
    videoPoster: require('../../assets/images/posters/rainInPorchOverlookingForest.jpg'),
    videoPosterUri: Image.resolveAssetSource(videoPosterPath1).uri,

    timerDialogBackgroundColor: '#136a53',
    timerDialogFontColor: '#d5e5ea',
    timerControlsFontColor: '#d5e5ea',

    audioFile: Assets.RainPorch,
    remoteAudioUrl:
      'https://d2lxk2a39jwsfn.cloudfront.net/audio/cozy_cabin_porch_with_heavy_rainstorm_trim.ogg',
    volume: 0.8,
  },
  {
    id: '4',
    videoFile: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/RainPuddle_1080_1920_24fps.mp4`,
    },
    hlsPlaylist: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/welcome/rainPouringDown.m3u8`,
    },
    videoFileSize: 12256577,
    videoPoster: require('../../assets/images/posters/HDerGrassyRain.jpg'),
    videoPosterUri: Image.resolveAssetSource(videoPosterPath4).uri,

    timerDialogBackgroundColor: 'rgb(38, 27, 21)',
    timerDialogFontColor: '#fff',
    timerControlsFontColor: '#fff',

    audioFile: Assets.RainCamper,
    remoteAudioUrl:
      'https://d2lxk2a39jwsfn.cloudfront.net/audio/rain_hitting_a_campervan_roof_window.ogg',
    volume: 0.6,
  },
  {
    id: '5',
    videoFile: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/blueSplashes.mp4`,
    },
    hlsPlaylist: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/welcome/blueSplashes.m3u8`,
    },
    videoFileSize: 47086392,
    videoPoster: require('../../assets/images/posters/blueSplashes3Reduced1.jpg'),
    videoPosterUri: Image.resolveAssetSource(videoPosterPath5).uri,

    timerDialogBackgroundColor: '#136a53',
    timerDialogFontColor: '#e4af91',
    timerControlsFontColor: '#fff',

    audioFile: Assets.RainPool,
    remoteAudioUrl:
      'https://d2lxk2a39jwsfn.cloudfront.net/audio/rain_on_water_swimming_pool_snip.ogg',
    volume: 0.3,
  },
]

const noiseSounds = [
  {
    id: 'noise-1',
    // Video Data
    videoFile: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/OceanWater-1080_1920_24fps.mp4`,
    },
    hlsPlaylist: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/welcome/BigOceanWater.m3u8`,
    },
    videoFileSize: 19476185,
    videoPoster: require('../../assets/images/posters/BigOceanWater.jpg'),
    videoPosterUri: Image.resolveAssetSource(noisePosterPath1).uri,

    // UI Colors
    timerDialogBackgroundColor: '#136a53',
    timerDialogFontColor: '#d5e5ea',
    timerControlsFontColor: '#d5e5ea',

    audioFile: Assets.NoisePink,
    remoteAudioUrl:
      'https://d2lxk2a39jwsfn.cloudfront.net/audio/pink_brown_900hz_lc_noise_together_mini.ogg',
    volume: 0.6,
  },
  {
    id: 'noise-2',
    videoFile: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/Airplane_1080_1920_30fps.mp4`,
    },
    hlsPlaylist: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/welcome/WindowPlaneView.m3u8`,
    },
    videoFileSize: 13590068,
    videoPoster: require('../../assets/images/posters/WindowPlaneView.jpg'),
    videoPosterUri: Image.resolveAssetSource(noisePosterPath2).uri,

    timerDialogBackgroundColor: '#47819d',
    timerDialogFontColor: '#afb7ad',
    timerControlsFontColor: '#afb7ad',

    audioFile: Assets.NoiseBrown1,
    remoteAudioUrl:
      'https://d2lxk2a39jwsfn.cloudfront.net/audio/brown_900hz_lc_noise_mini.ogg',
    volume: 0.6,
  },
  {
    id: 'noise-3',
    videoFile: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/bigBalloonDay1080_1920_60fps.mp4`,
    },
    hlsPlaylist: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/welcome/bigBalloonDay1080_1920_60fps.m3u8`,
    },
    videoFileSize: 12057604,
    videoPoster: require('../../assets/images/posters/bigBalloonDay1080_1920_60fps.jpeg'),
    videoPosterUri: Image.resolveAssetSource(noisePosterPath3).uri,

    timerDialogBackgroundColor: '#47819d',
    timerDialogFontColor: '#faaf32',
    timerControlsFontColor: '#faaf32',

    audioFile: Assets.NoiseBrown2,
    remoteAudioUrl:
      'https://d2lxk2a39jwsfn.cloudfront.net/audio/noise_brown_v3_131_600_tighter_slopes_mini.ogg',
    volume: 0.6,
  },
  {
    id: 'noise-4',
    videoFile: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/waves_and_rocks_1080_1920_30fps.mp4`,
    },
    hlsPlaylist: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/welcome/waves_and_rocks_1080_1920_30fps.m3u8`,
    },
    videoFileSize: 9769331,
    videoPoster: require('../../assets/images/posters/waves_and_rocks_1080_1920_30fps.jpeg'),
    videoPosterUri: Image.resolveAssetSource(noisePosterPath4).uri,

    timerDialogBackgroundColor: 'rgb(38, 27, 21)',
    timerDialogFontColor: '#fff',
    timerControlsFontColor: '#fff',

    audioFile: Assets.NoiseBrown3,
    remoteAudioUrl:
      'https://d2lxk2a39jwsfn.cloudfront.net/audio/brown_900hz_lc_noise_mod_mini.ogg',
    volume: 0.6,
  },
]

const thetaSounds = [
  {
    id: 'theta-1',
    title: 'Pure Theta 1',
    type: 'PROCEDURAL',
    orbColor: ['#A0C4FF', '#1c1c1c'], // Cyan/Dark
    audioFile: Assets.ThetaPure2,
    remoteAudioUrl:
      'https://d2lxk2a39jwsfn.cloudfront.net/audio/binaural_beats_pure_theta_high4.ogg',
    volume: 0.8,
    isLocked: true, // <--- Premium Flag
  },
  {
    id: 'theta-2',
    title: 'Cosmic Drift',
    type: 'PROCEDURAL',
    orbColor: ['#7B2CBF', '#10002B'], // Deep Purple
    audioFile: Assets.ThetaCosmic,
    remoteAudioUrl:
      'https://d2lxk2a39jwsfn.cloudfront.net/audio/binaural_beats_cosmic_drift4.ogg',
    volume: 0.8,
    isLocked: true,
  },
  {
    id: 'theta-3',
    title: 'Earth Resonant',
    type: 'PROCEDURAL',
    orbColor: ['#2D6A4F', '#081C15'], // Forest Green
    audioFile: Assets.ThetaEarth,
    remoteAudioUrl:
      'https://d2lxk2a39jwsfn.cloudfront.net/audio/binaural_beats_earth_resonant4.ogg',
    volume: 0.8,
    isLocked: true,
  },
  {
    id: 'theta-4',
    title: 'Pure Theta 2',
    type: 'PROCEDURAL',
    orbColor: ['#FFB703', '#281000'], // Amber to Deep Brown/Black gradient
    audioFile: Assets.ThetaPure1,
    remoteAudioUrl:
      'https://d2lxk2a39jwsfn.cloudfront.net/audio/binaural_beats_pure_theta_low4.ogg',
    volume: 0.8,
    isLocked: true,
  },
]

export {rainSounds, noiseSounds, thetaSounds}
export default rainSounds
