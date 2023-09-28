import { configureStore } from "@reduxjs/toolkit";
import globalDataReducer from "./src/features/globalData/globalDataSlice";

export const store = configureStore({
	reducer: {
		globalData: globalDataReducer,
	},
});
