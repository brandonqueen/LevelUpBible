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
			const recentEarnedRewards = state.userProgress.recentEarnedRewards;

			// Get the individual components of the date (month, day, year)
			const currentDate = new Date();
			const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
			const day = String(currentDate.getDate()).padStart(2, "0");
			const year = String(currentDate.getFullYear()).slice(-2); // Get the last two digits of the year
			// Combine the components into MM/DD/YY format
			const formattedDate = `${month}/${day}/${year}`;

			/*  
			~~~ update stats ~~~
			*/

			//add new points to total
			stats.totalPoints += points;

			//add up chapters completed
			let completedChaptersCount = 0;
			bibleData.forEach((testament) => {
				testament.books.forEach((book) => {
					book.chapters.forEach((chapter) => {
						if (chapter.completed === true) {
							completedChaptersCount++;
						}
					});
				});
			});
			stats.numChaptersCompleted = completedChaptersCount;

			//add up books completed
			let completedBooksCount = 0;
			bibleData.forEach((testament) => {
				testament.books.forEach((book) => {
					if (book.completed === true) {
						completedBooksCount++;
					}
				});
			});
			stats.numBooksCompleted = completedBooksCount;

			/*  
			~~~ update rewards ~~~
			*/

			//check first chapter reward, index: [0]
			if (rewards[0].completed === false) {
				if (stats.numChaptersCompleted > 0) {
					rewards[0].completed = true;
					rewards[0].earnedDate = formattedDate;
					if (!recentEarnedRewards.includes(rewards[0].title)) {
						recentEarnedRewards.push(rewards[0].title);
					}
				}
			}

			//check first book book, index: [1]

			if (rewards[1].completed === false) {
				if (stats.numBooksCompleted > 0) {
					rewards[1].completed = true;
					rewards[1].earnedDate = formattedDate;
					if (!recentEarnedRewards.includes(rewards[1].title)) {
						recentEarnedRewards.push(rewards[1].title);
					}
				}
			}
			//check Law reward, index [2]

			if (rewards[2].completed === false) {
				const torahNames = [
					"Genesis",
					"Exodus",
					"Leviticus",
					"Numbers",
					"Deuteronomy",
				];
				const torahBooksArray = bibleData[0].books.filter((book) =>
					torahNames.includes(book.bookName)
				);

				const isTorahCompleted = torahBooksArray.every(
					(book) => book.completed === true
				);
				if (isTorahCompleted) {
					rewards[2].completed = true;
					if (!recentEarnedRewards.includes(rewards[2].title)) {
						recentEarnedRewards.push(rewards[2].title);
					}
				}
			}

			//check History reward, index [3]
			if (rewards[3].completed === false) {
				const historyNames = [
					"Joshua",
					"Judges",
					"1 Samuel",
					"2 Samuel",
					"1 Kings",
					"2 Kings",
				];
				const historyBooksArray = bibleData[0].books.filter((book) =>
					historyNames.includes(book.bookName)
				);

				const isHistoryCompleted = historyBooksArray.every(
					(book) => book.completed === true
				);
				if (isHistoryCompleted) {
					rewards[3].completed = true;
					if (!recentEarnedRewards.includes(rewards[3].title)) {
						recentEarnedRewards.push(rewards[3].title);
					}
				}
			}

			//check Poetry reward, index [4]
			if (rewards[4].completed === false) {
				const poetryNames = [
					"Job",
					"Psalms",
					"Proverbs",
					"Ecclesiastes",
					"Song of Solomon",
				];
				const poetryBooksArray = bibleData[0].books.filter((book) =>
					poetryNames.includes(book.bookName)
				);

				const isPoetryCompleted = poetryBooksArray.every(
					(book) => book.completed === true
				);
				if (isPoetryCompleted) {
					rewards[4].completed = true;
					if (!recentEarnedRewards.includes(rewards[4].title)) {
						recentEarnedRewards.push(rewards[4].title);
					}
				}
			}

			//check Major Prophets reward, index [5]
			if (rewards[5].completed === false) {
				const majorProphetsNames = [
					"Isaiah",
					"Jeremiah",
					"Lamentations",
					"Ezekiel",
					"Daniel",
				];
				const majorProphetsBooksArray = bibleData[0].books.filter((book) =>
					majorProphetsNames.includes(book.bookName)
				);

				const isMajorProphetsCompleted = majorProphetsBooksArray.every(
					(book) => book.completed === true
				);
				if (isMajorProphetsCompleted) {
					rewards[5].completed = true;
					if (!recentEarnedRewards.includes(rewards[5].title)) {
						recentEarnedRewards.push(rewards[5].title);
					}
				}
			}

			//check Minor Prophets reward, index [6]
			if (rewards[6].completed === false) {
				const minorProphetsNames = [
					"Hosea",
					"Joel",
					"Amos",
					"Obadiah",
					"Jonah",
					"Micah",
					"Nahum",
					"Habakkuk",
					"Zephaniah",
					"Haggai",
					"Zechariah",
					"Malachi",
				];
				const minorProphetsBooksArray = bibleData[0].books.filter((book) =>
					minorProphetsNames.includes(book.bookName)
				);

				const isMinorProphetsCompleted = minorProphetsBooksArray.every(
					(book) => book.completed === true
				);
				if (isMinorProphetsCompleted) {
					rewards[6].completed = true;
					if (!recentEarnedRewards.includes(rewards[6].title)) {
						recentEarnedRewards.push(rewards[6].title);
					}
				}
			}

			//check Old Testament reward, index [7]
			if (rewards[7].completed === false) {
				if (bibleData[0].completed) {
					rewards[7].completed = true;
					if (!recentEarnedRewards.includes(rewards[7].title)) {
						recentEarnedRewards.push(rewards[7].title);
					}
				}
			}

			//check Gospels reward, index [8]
			if (rewards[8].completed === false) {
				const gospelsNames = ["Matthew", "Mark", "Luke", "John"];
				const gospelsBooksArray = bibleData[1].books.filter((book) =>
					gospelsNames.includes(book.bookName)
				);

				const isGospelsCompleted = gospelsBooksArray.every(
					(book) => book.completed === true
				);
				if (isGospelsCompleted) {
					rewards[8].completed = true;
					if (!recentEarnedRewards.includes(rewards[8].title)) {
						recentEarnedRewards.push(rewards[8].title);
					}
				}
			}

			//check Paul's Letters reward, index [9]
			if (rewards[9].completed === false) {
				const paulsLettersNames = [
					"Romans",
					"1 Corinthians",
					"2 Corinthians",
					"Galatians",
					"Ephesians",
					"Philippians",
					"Colossians",
					"1 Thessalonians",
					"2 Thessalonians",
					"1 Timothy",
					"2 Timothy",
					"Titus",
					"Philemon",
				];
				const paulsLettersBooksArray = bibleData[1].books.filter((book) =>
					paulsLettersNames.includes(book.bookName)
				);

				const isPaulsLettersCompleted = paulsLettersBooksArray.every(
					(book) => book.completed === true
				);
				if (isPaulsLettersCompleted) {
					rewards[9].completed = true;
					if (!recentEarnedRewards.includes(rewards[9].title)) {
						recentEarnedRewards.push(rewards[9].title);
					}
				}
			}

			//check New Testament reward, index [10]
			if (rewards[10].completed === false) {
				if (bibleData[1].completed) {
					rewards[10].completed = true;
					if (!recentEarnedRewards.includes(rewards[10].title)) {
						recentEarnedRewards.push(rewards[10].title);
					}
				}
			}

			//check Whole Bible reward, index [11]
			if (rewards[11].completed === false) {
				if (bibleData[0].completed && bibleData[1].completed) {
					rewards[11].completed = true;
					if (!recentEarnedRewards.includes(rewards[11].title)) {
						recentEarnedRewards.push(rewards[11].title);
					}
				}
			}
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
