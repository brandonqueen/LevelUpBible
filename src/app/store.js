import { configureStore } from "@reduxjs/toolkit";
import bibleDataReducer from "../features/bibleSlice/bibleSlice";

const store = configureStore({
	reducer: {
		bibleData: bibleDataReducer,
	},
});

export default store;
