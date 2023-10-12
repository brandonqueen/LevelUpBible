import { createSlice } from "@reduxjs/toolkit";
import initialBibleData from "../../constants/initialStateConstants/initialBibleData";
import initialUserProgress from "../../constants/initialStateConstants/initialUserProgress";

const globalDataSlice = createSlice({
	name: "globalData",
	initialState: {
		bibleData: initialBibleData,
		userProgress: initialUserProgress,
	},
	reducers: {
		readBibleAgain: (state) => {
			const currentPoints = state.userProgress.stats.totalPoints;
			state.bibleData = initialBibleData;
			state.userProgress = {
				...initialUserProgress,
				stats: { ...initialUserProgress.stats, totalPoints: currentPoints },
			};
		},
		resetAllData: (state) => {
			state.bibleData = initialBibleData;
			state.userProgress = initialUserProgress;
		},
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
			const { bibleData } = state;
			const { stats } = state.userProgress;
			const { rewards } = state.userProgress;
			const { recentEarnedRewards } = state.userProgress;

			// Get the individual components of the date (month, day, year)
			const currentDate = new Date();
			const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
			const day = String(currentDate.getDate()).padStart(2, "0");
			const year = String(currentDate.getFullYear()).slice(-2); // Get the last two digits of the year
			// Combine the components into MM/DD/YY format
			const formattedDate = `${month}/${day}/${year}`;

			//////////////
			//////////////

			/*
			~~~ update STATS ~~~
			*/

			//////////////
			//////////////

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

			//////////////
			//////////////

			/*
			~~~ update REWARDS ~~~
			*/

			//////////////
			//////////////

			//push reward to recent earned rewards array
			function pushRewardToRecents(rewardIndex) {
				if (!recentEarnedRewards.includes(rewards[rewardIndex].title)) {
					recentEarnedRewards.push(rewards[rewardIndex].title);
				}
			}

			//section rewards update function
			function updateSectionRewards(
				bookNamesArray,
				rewardIndex,
				testamentIndex
			) {
				if (rewards[rewardIndex].completed === false) {
					const sectionArray = bibleData[testamentIndex].books.filter((book) =>
						bookNamesArray.includes(book.bookName)
					);

					const isSectionCompleted = sectionArray.every(
						(book) => book.completed === true
					);

					if (isSectionCompleted) {
						rewards[rewardIndex].completed = true;
						rewards[rewardIndex].earnedDate = formattedDate;
						pushRewardToRecents(rewardIndex);
					}
				}
			}

			//check first chapter reward, index: [0]
			if (rewards[0].completed === false) {
				if (stats.numChaptersCompleted > 0) {
					rewards[0].completed = true;
					rewards[0].earnedDate = formattedDate;
					pushRewardToRecents(0);
				}
			}

			//check first book book, index: [1]

			if (rewards[1].completed === false) {
				if (stats.numBooksCompleted > 0) {
					rewards[1].completed = true;
					rewards[1].earnedDate = formattedDate;
					pushRewardToRecents(1);
				}
			}
			//check Law reward, index [2]
			const torahBookNames = [
				"Genesis",
				"Exodus",
				"Leviticus",
				"Numbers",
				"Deuteronomy",
			];
			const lawRewardIndex = 2;
			updateSectionRewards(torahBookNames, lawRewardIndex, 0);

			//check History reward, index [3]
			const historyBookNames = [
				"Joshua",
				"Judges",
				"1 Samuel",
				"2 Samuel",
				"1 Kings",
				"2 Kings",
			];
			const historyRewardIndex = 3;
			updateSectionRewards(historyBookNames, historyRewardIndex, 0);

			//check Poetry reward, index [4]
			const poetryBookNames = [
				"Job",
				"Psalms",
				"Proverbs",
				"Ecclesiastes",
				"Song of Solomon",
			];
			const poetryRewardIndex = 4;
			updateSectionRewards(poetryBookNames, poetryRewardIndex, 0);

			//check Major Prophets reward, index [5]
			const majorProphetsBookNames = [
				"Isaiah",
				"Jeremiah",
				"Lamentations",
				"Ezekiel",
				"Daniel",
			];
			const majorProphetsRewardIndex = 5;
			updateSectionRewards(majorProphetsBookNames, majorProphetsRewardIndex, 0);

			//check Minor Prophets reward, index [6]
			const minorProphetsBookNames = [
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
			const minorProphetsRewardIndex = 6;
			updateSectionRewards(minorProphetsBookNames, minorProphetsRewardIndex, 0);

			//check Old Testament reward, index [7]
			if (rewards[7].completed === false) {
				if (bibleData[0].completed) {
					rewards[7].completed = true;
					rewards[7].earnedDate = formattedDate;
					pushRewardToRecents(7);
				}
			}

			//check Gospels reward, index [8]
			const gospelsBookNames = ["Matthew", "Mark", "Luke", "John"];
			const gospelsRewardIndex = 8;
			updateSectionRewards(gospelsBookNames, gospelsRewardIndex, 1);

			//check Paul's Letters reward, index [9]
			const paulsLettersBookNames = [
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
			const paulsLettersIndex = 9;
			updateSectionRewards(paulsLettersBookNames, paulsLettersIndex, 1);

			//check New Testament reward, index [10]
			if (rewards[10].completed === false) {
				if (bibleData[1].completed) {
					rewards[10].completed = true;
					rewards[10].earnedDate = formattedDate;
					pushRewardToRecents(10);
				}
			}

			//check Whole Bible reward, index [11]
			if (rewards[11].completed === false) {
				if (bibleData[0].completed && bibleData[1].completed) {
					rewards[11].completed = true;
					rewards[11].earnedDate = formattedDate;
					pushRewardToRecents(11);
				}
			}
		},
	},
});

export const {
	readBibleAgain,
	resetAllData,
	setTestamentSelected,
	setBookSelected,
	setChapterSelected,
	resetBibleSelection,
	setChapterCompleted,
	updateProgress,
} = globalDataSlice.actions;
export default globalDataSlice.reducer;
