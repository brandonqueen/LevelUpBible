import { configureStore } from "@reduxjs/toolkit";
import bibleDataReducer from "./src/features/bibleSlice/bibleSlice";

export const store = configureStore({
	reducer: {
		bibleData: bibleDataReducer,
	},
});
