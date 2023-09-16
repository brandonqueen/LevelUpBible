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
		setChapterSelected: (state, action) => {
			const { testamentIndex, bookIndex, chapterNum } = action.payload;
			state.map((testament, testamentMapIndex) => {
				testament.books.map((book, bookMapIndex) => {
					book.chapters.map((chapter, chapterMapIndex) => {
						if (
							testamentMapIndex === testamentIndex &&
							bookMapIndex === bookIndex &&
							chapter.chapter === chapterNum
						) {
							state[testamentMapIndex].books[bookMapIndex].chapters[
								chapterMapIndex
							].selected =
								!state[testamentMapIndex].books[bookMapIndex].chapters[
									chapterMapIndex
								].selected;
						} else {
							state[testamentMapIndex].books[bookMapIndex].chapters[
								chapterMapIndex
							].selected = false;
						}
					});
				});
			});
		},
		clearAllSelected: (state) => {
			state.map((testament, testIndex) => {
				state[testIndex].selected = false;
				state[testIndex].books.map((book, bookIndex) => {
					state[testIndex].books[bookIndex].selected = false;
					state[testIndex].books[bookIndex].chapters.map(
						(chapter, chapIndex) => {
							state[testIndex].books[bookIndex].chapters[
								chapIndex
							].selected = false;
						}
					);
				});
			});
		},
		setChapterCompleted: (state, action) => {},
	},
});

export const {
	setTestamentSelected,
	setBookSelected,
	setChapterSelected,
	clearAllSelected,
} = bibleSlice.actions;
export default bibleSlice.reducer;
