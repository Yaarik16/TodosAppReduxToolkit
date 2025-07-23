import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import todosReducer from "./todos/todosSlice.ts";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { combineReducers } from "redux";

// Combine reducers
const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["todos"], // only notes slice will be persisted
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Creates store using configureStore function
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist uses non-serializable data
    }),
});

// Create persistor
export const persistor = persistStore(store);

// Essential types for proper development
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
