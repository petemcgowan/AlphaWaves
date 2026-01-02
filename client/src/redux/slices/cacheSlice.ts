import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CacheState {
  downloadedFiles: Record<string, boolean>; // Key: Remote URI, Value: true/false
}

const initialState: CacheState = {
  downloadedFiles: {},
};

const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    setFileDownloaded: (state, action: PayloadAction<string>) => {
      // We use the remote URI as the key
      state.downloadedFiles[action.payload] = true;
    },
    // Optional: Load initial state from disk checks
    setInitialCacheState: (
      state,
      action: PayloadAction<Record<string, boolean>>,
    ) => {
      state.downloadedFiles = action.payload;
    },
  },
});

export const { setFileDownloaded, setInitialCacheState } = cacheSlice.actions;
export default cacheSlice.reducer;
