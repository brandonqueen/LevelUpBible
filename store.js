import { configureStore } from "@reduxjs/toolkit";
import bibleDataReducer from "./src/features/bibleSlice/bibleSlice";
import userProgressReducer from "./src/features/userProgressSlice/userProgressSlice";

export const store = configureStore({
	reducer: {
		bibleData: bibleDataReducer,
		userProgress: userProgressReducer,
	},
});
