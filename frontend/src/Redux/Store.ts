import { configureStore } from "@reduxjs/toolkit";
import GlobalVariablesSlice from "./Slices/GlobalVariablesSlice";
import SongSlice from "./Slices/SongSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            SongInfo: SongSlice,
            GlobalVariable: GlobalVariablesSlice,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
