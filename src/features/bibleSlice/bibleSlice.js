import { createSlice } from "@reduxjs/toolkit";
import { bibleData as initialState } from "./bibleData";

const bibleSlice = createSlice({
	name: "bibleData",
	initialState: initialState,
	reducers: {
		setTestamentSelected: (state, action) => {
			const selectedIndex = action.payload.index;
			state.map((testament, index) => {
				if (index === selectedIndex) {
					testament[index].selected = !testament[index].selected;
				} else {
					textament[index].selected = false;
				}
			});
		},
		setBookSelected: (state, action) => {},
		setChapterSelected: (state, action) => {},
		setChapterCompleted: (state, action) => {},
	},
});

export const { setTestamentSelected } = bibleSlice.actions;
export default bibleSlice.reducer;
