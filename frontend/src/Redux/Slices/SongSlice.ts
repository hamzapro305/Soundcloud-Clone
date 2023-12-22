import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitState = {};

const initialState: InitState = {};

const Slice = createSlice({
    name: "song",
    initialState: initialState,
    reducers: {
        init: (state) => {},
        playNewSong: (state, action: PayloadAction<any>) => {},

        toggleSong: (state) => {},
        setVolume: (state, action: PayloadAction<number>) => {},
    },
});

export const SongActions = Slice.actions;
export default Slice.reducer;
