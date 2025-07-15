import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice"

// Creates store using configureStore function
export const store = configureStore({
    reducer: {
        // Connects counter slice to the store
        counter: counterReducer
    }
})

// Essential types for proper development
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;