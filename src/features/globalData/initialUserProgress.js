import RewardsIcons from "../../../assets/Images/RewardsIconsLoader";

const initialUserProgress = {
	stats: {
		numChaptersCompleted: 0,
		numBooksCompleted: 0,
		totalPoints: 0,
	},
	rewards: [
		{
			title: "First Chapter",
			completed: false,
			imageBW: RewardsIcons["Chapter-BW.png"],
			imageColor: RewardsIcons["Chapter-color.png"],
			description: `Earned after completing your first chapter.`,
		},
		{
			title: "First Book",
			completed: false,
			imageBW: RewardsIcons["Book-BW.png"],
			imageColor: RewardsIcons["Book-color.png"],
			description: `Earned after completing your first book of the Bible.`,
		},
		{
			title: "Law",
			completed: false,
			imageBW: RewardsIcons["law-BW.png"],
			imageColor: RewardsIcons["law-color.png"],
			description: `Earned after completing the Law or "Torah", the first five books of the Old Testament: Genesis, Exodus, Leviticus, Numbers, and Deuteronomy.`,
		},
		{
			title: "History",
			completed: false,
			imageBW: RewardsIcons["history-BW.png"],
			imageColor: RewardsIcons["history-color.png"],
			description: `Earned after completing the history books of the Old Testament: Joshua, Judges, 1 Samuel, 2 Samuel, 1 Kings, and 2 Kings.`,
		},
		{
			title: "Poetry",
			completed: false,
			imageBW: RewardsIcons["poetry-BW.png"],
			imageColor: RewardsIcons["poetry-color.png"],
			description: `Earned after completing the poetry books of the Old Testament: Job, Psalms, Proverbs, Ecclesiastes, and Song of Solomon.`,
		},
		{
			title: "Major Prophets",
			completed: false,
			imageBW: RewardsIcons["major-prophets-BW.png"],
			imageColor: RewardsIcons["major-prophets-color.png"],
			description: `Earned after completing the Old Testament's collection of longer prophetical writings: Isaiah, Jeremiah, Lamentations, Ezekiel, and Daniel.`,
		},
		{
			title: "Minor Prophets",
			completed: false,
			imageBW: RewardsIcons["minor-prophets-BW.png"],
			imageColor: RewardsIcons["minor-prophets-color.png"],
			description: `Earned after completing the Old Testament's collection of shorter prophetical writings: Hosea, Joel, Amos, Obadiah, Jonah, Micah, Nahum, Habakkuk, Zephaniah, Haggai, Zechariah, and Malachi.`,
		},
	],
};

export default initialUserProgress;
