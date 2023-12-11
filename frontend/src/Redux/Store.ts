import { configureStore } from '@reduxjs/toolkit'
import GlobalVariablesSlice from './Slices/GlobalVariablesSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            GlobalVariable: GlobalVariablesSlice
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']