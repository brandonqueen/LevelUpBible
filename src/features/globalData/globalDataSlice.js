import { createSlice } from "@reduxjs/toolkit";
import { initialBibleData } from "./initialBibleData";
import initialUserProgress from "./initialUserProgress";

const globalDataSlice = createSlice({
	name: "globalData",
	initialState: {
		bibleData: initialBibleData,
		userProgress: initialUserProgress,
	},
	reducers: {
		setTestamentSelected: (state, action) => {
			const selectedIndex = action.payload.index;
			state.bibleData.map((testament, index) => {
				if (index === selectedIndex) {
					return (state.bibleData[index].selected =
						!state.bibleData[index].selected);
				} else {
					return (state.bibleData[index].selected = false);
				}
			});
		},
		setBookSelected: (state, action) => {
			const { testamentIndex, bookIndex } = action.payload;
			state.bibleData.map((testament, testamentMapIndex) => {
				testament.books.map((book, bookMapIndex) => {
					if (
						testamentMapIndex === testamentIndex &&
						bookMapIndex === bookIndex
					) {
						state.bibleData[testamentMapIndex].books[bookMapIndex].selected =
							!state.bibleData[testamentMapIndex].books[bookMapIndex].selected;
					} else {
						state.bibleData[testamentMapIndex].books[
							bookMapIndex
						].selected = false;
					}
				});
			});
		},
		setChapterSelected: (state, action) => {
			const { testamentIndex, bookIndex, chapterNum } = action.payload;
			state.bibleData.map((testament, testamentMapIndex) => {
				testament.books.map((book, bookMapIndex) => {
					book.chapters.map((chapter, chapterMapIndex) => {
						if (
							testamentMapIndex === testamentIndex &&
							bookMapIndex === bookIndex &&
							chapter.chapter === chapterNum
						) {
							state.bibleData[testamentMapIndex].books[bookMapIndex].chapters[
								chapterMapIndex
							].selected =
								!state.bibleData[testamentMapIndex].books[bookMapIndex]
									.chapters[chapterMapIndex].selected;
						} else {
							state.bibleData[testamentMapIndex].books[bookMapIndex].chapters[
								chapterMapIndex
							].selected = false;
						}
					});
				});
			});
		},
		resetBibleSelection: (state) => {
			state.bibleData.map((testament, testIndex) => {
				state.bibleData[testIndex].selected = false;
				state.bibleData[testIndex].books.map((book, bookIndex) => {
					state.bibleData[testIndex].books[bookIndex].selected = false;
					state.bibleData[testIndex].books[bookIndex].chapters.map(
						(chapter, chapIndex) => {
							state.bibleData[testIndex].books[bookIndex].chapters[
								chapIndex
							].selected = false;
						}
					);
				});
			});
		},
		setChapterCompleted: (state, action) => {},
		updateProgress: (state, action) => {},
	},
});

export const {
	setTestamentSelected,
	setBookSelected,
	setChapterSelected,
	resetBibleSelection,
} = globalDataSlice.actions;
export default globalDataSlice.reducer;
