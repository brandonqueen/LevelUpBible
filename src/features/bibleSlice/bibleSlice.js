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
					return (state[index].selected = !state[index].selected);
				} else {
					return (state[index].selected = false);
				}
			});
		},
		setBookSelected: (state, action) => {
			const { testamentIndex, bookIndex } = action.payload;
			state.map((testament, testamentMapIndex) => {
				testament.books.map((book, bookMapIndex) => {
					if (
						testamentMapIndex === testamentIndex &&
						bookMapIndex === bookIndex
					) {
						state[testamentMapIndex].books[bookMapIndex].selected =
							!state[testamentMapIndex].books[bookMapIndex].selected;
					} else {
						state[testamentMapIndex].books[bookMapIndex].selected = false;
					}
				});
			});
		},
		setChapterSelected: (state, action) => {},
		setChapterCompleted: (state, action) => {},
	},
});

export const { setTestamentSelected, setBookSelected } = bibleSlice.actions;
export default bibleSlice.reducer;
