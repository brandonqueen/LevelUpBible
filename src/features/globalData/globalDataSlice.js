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
		setChapterCompleted: (state, action) => {
			const { testamentIndex, bookIndex, chapterIndex } = action.payload;
			const testament = state.bibleData[testamentIndex];
			const book = testament.books[bookIndex];
			const chapter = book.chapters[chapterIndex];
			//set chapter complete
			chapter.completed = true;

			// * * iterate other Bible state updates * *
			//check for book completion
			const allChaptersComplete = book.chapters.every(
				(chapter) => chapter.completed === true
			);

			if (allChaptersComplete) {
				book.completed = true;
			}
			//check for testament completion
			const allBooksComplete = testament.books.every(
				(book) => book.completed === true
			);

			if (allBooksComplete) {
				testament.completed = true;
			}
		},
		updateProgress: (state, action) => {
			const { points } = action.payload;
			const bibleData = state.bibleData;
			const stats = state.userProgress.stats;
			const rewards = state.userProgress.rewards;
			/*  
			~~~ update stats ~~~
			*/
			//add new points to total
			stats.totalPoints += points;

			//add up chapters completed
			let completedChaptersCount = 0;
			BibleData.forEach((testament) => {
				testament.books.forEach((book) => {
					book.chapters.forEach((chapter) => {
						if (chapter.completed === "true") {
							completedChaptersCount++;
						}
					});
				});
			});
			stats.numChaptersCompleted = completedChaptersCount;

			//add up books completed
			let completedBooksCount = 0;
			BibleData.forEach((testament) => {
				testament.books.forEach((book) => {
					if (book.completed === "true") {
						completedBooksCount++;
					}
				});
			});
			stats.numBooksCompleted = completedBooksCount;
			//update rewards
			//first chapter
			//first book
			//Law
			//History
			//Poetry
			//Major Prophets
			//Minor Prophets
			//Old Testament
			//Gospels
			//Paul's Letters
			//New Testament
			//Whole Bible
		},
	},
});

export const {
	setTestamentSelected,
	setBookSelected,
	setChapterSelected,
	resetBibleSelection,
	setChapterCompleted,
	updateProgress,
} = globalDataSlice.actions;
export default globalDataSlice.reducer;
