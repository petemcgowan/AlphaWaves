import {NativeModules, Platform} from 'react-native'

const {GaplessAudio} = NativeModules

interface GaplessAudioType {
  prepare(path: string, volume: number): Promise<boolean>
  play(): void
  pause(): void
  setVolume(vol: number): void
  stop(): void
}

export default GaplessAudio as GaplessAudioType
