import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	stats: {
		numChaptersCompleted: 0,
		totalPoints: 0,
	},
	rewards: {
		firstChapter: false,
		firstBook: false,
		fourGospels: false,
		oldTestament: false,
		newTestament: false,
	},
};

const userProgressSlice = createSlice({
	name: "userProgress",
	initialState: initialState,
	reducers: {
		updateProgress: (state, action) => {},
	},
});

export const { updateProgress } = userProgressSlice.actions;
export default userProgressSlice.reducer;
