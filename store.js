import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import globalDataReducer from "./src/features/globalData/globalDataSlice";

const reducers = combineReducers({
	globalData: globalDataReducer,
});

const persistConfig = {
	key: "root",
	storage: AsyncStorage,
	whitelist: ["globalData"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
});
