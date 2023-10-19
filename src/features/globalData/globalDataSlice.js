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
			const { index } = action.payload;
			state.bibleData[index].selected = !state.bibleData[index].selected;
		},
		setBookSelected: (state, action) => {
			const { testamentIndex, bookIndex } = action.payload;
			state.bibleData[testamentIndex].books[bookIndex].selected =
				!state.bibleData[testamentIndex].books[bookIndex].selected;
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
			const { milestones } = state.userProgress;
			const { recentEarnedMilestones } = state.userProgress;

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
			~~~ update MILESTONES ~~~
			*/

			//////////////
			//////////////

			//push milestone to recent earned milestones array
			function pushMilestoneToRecents(milestoneIndex) {
				if (
					!recentEarnedMilestones.includes(milestones[milestoneIndex].title)
				) {
					recentEarnedMilestones.push(milestones[milestoneIndex].title);
				}
			}

			//section milestones update function
			function updateSectionMilestones(
				bookNamesArray,
				milestoneIndex,
				testamentIndex
			) {
				if (milestones[milestoneIndex].completed === false) {
					const sectionArray = bibleData[testamentIndex].books.filter((book) =>
						bookNamesArray.includes(book.bookName)
					);

					const isSectionCompleted = sectionArray.every(
						(book) => book.completed === true
					);

					if (isSectionCompleted) {
						milestones[milestoneIndex].completed = true;
						milestones[milestoneIndex].earnedDate = formattedDate;
						pushMilestoneToRecents(milestoneIndex);
					}
				}
			}

			//check first chapter milestone, index: [0]
			if (milestones[0].completed === false) {
				if (stats.numChaptersCompleted > 0) {
					milestones[0].completed = true;
					milestones[0].earnedDate = formattedDate;
					pushMilestoneToRecents(0);
				}
			}

			//check first book book, index: [1]

			if (milestones[1].completed === false) {
				if (stats.numBooksCompleted > 0) {
					milestones[1].completed = true;
					milestones[1].earnedDate = formattedDate;
					pushMilestoneToRecents(1);
				}
			}
			//check Law milestone, index [2]
			const torahBookNames = [
				"Genesis",
				"Exodus",
				"Leviticus",
				"Numbers",
				"Deuteronomy",
			];
			const lawMilestoneIndex = 2;
			updateSectionMilestones(torahBookNames, lawMilestoneIndex, 0);

			//check History milestone, index [3]
			const historyBookNames = [
				"Joshua",
				"Judges",
				"1 Samuel",
				"2 Samuel",
				"1 Kings",
				"2 Kings",
			];
			const historyMilestoneIndex = 3;
			updateSectionMilestones(historyBookNames, historyMilestoneIndex, 0);

			//check Poetry milestone, index [4]
			const poetryBookNames = [
				"Job",
				"Psalms",
				"Proverbs",
				"Ecclesiastes",
				"Song of Solomon",
			];
			const poetryMilestoneIndex = 4;
			updateSectionMilestones(poetryBookNames, poetryMilestoneIndex, 0);

			//check Major Prophets milestone, index [5]
			const majorProphetsBookNames = [
				"Isaiah",
				"Jeremiah",
				"Lamentations",
				"Ezekiel",
				"Daniel",
			];
			const majorProphetsMilestoneIndex = 5;
			updateSectionMilestones(
				majorProphetsBookNames,
				majorProphetsMilestoneIndex,
				0
			);

			//check Minor Prophets milestone, index [6]
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
			const minorProphetsMilestoneIndex = 6;
			updateSectionMilestones(
				minorProphetsBookNames,
				minorProphetsMilestoneIndex,
				0
			);

			//check Old Testament milestone, index [7]
			if (milestones[7].completed === false) {
				if (bibleData[0].completed) {
					milestones[7].completed = true;
					milestones[7].earnedDate = formattedDate;
					pushMilestoneToRecents(7);
				}
			}

			//check Gospels milestone, index [8]
			const gospelsBookNames = ["Matthew", "Mark", "Luke", "John"];
			const gospelsMilestoneIndex = 8;
			updateSectionMilestones(gospelsBookNames, gospelsMilestoneIndex, 1);

			//check Paul's Letters milestone, index [9]
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
			updateSectionMilestones(paulsLettersBookNames, paulsLettersIndex, 1);

			//check New Testament milestone, index [10]
			if (milestones[10].completed === false) {
				if (bibleData[1].completed) {
					milestones[10].completed = true;
					milestones[10].earnedDate = formattedDate;
					pushMilestoneToRecents(10);
				}
			}

			//check Whole Bible milestone, index [11]
			if (milestones[11].completed === false) {
				if (bibleData[0].completed && bibleData[1].completed) {
					milestones[11].completed = true;
					milestones[11].earnedDate = formattedDate;
					pushMilestoneToRecents(11);
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
