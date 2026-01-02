import {createSlice} from '@reduxjs/toolkit'

interface UiState {
  hasSwipedVertical: boolean
}

const initialState: UiState = {
  hasSwipedVertical: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    markVerticalSwipeComplete: state => {
      state.hasSwipedVertical = true
    },
  },
})

export const {markVerticalSwipeComplete} = uiSlice.actions
export default uiSlice.reducer
