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
			earnedDate: "",
		},
		{
			title: "First Book",
			completed: false,
			imageBW: RewardsIcons["Book-BW.png"],
			imageColor: RewardsIcons["Book-color.png"],
			description: `Earned after completing your first book of the Bible.`,
			earnedDate: "",
		},
		{
			title: "Law",
			completed: false,
			imageBW: RewardsIcons["law-BW.png"],
			imageColor: RewardsIcons["law-color.png"],
			description: `Earned after completing the Law or "Torah", the first five books of the Old Testament:  Genesis, Exodus, Leviticus, Numbers, and Deuteronomy.`,
			earnedDate: "",
		},
		{
			title: "History",
			completed: false,
			imageBW: RewardsIcons["history-BW.png"],
			imageColor: RewardsIcons["history-color.png"],
			description: `Earned after completing the history books of the Old Testament:  Joshua, Judges, 1 Samuel, 2 Samuel, 1 Kings, and 2 Kings.`,
			earnedDate: "",
		},
		{
			title: "Poetry",
			completed: false,
			imageBW: RewardsIcons["poetry-BW.png"],
			imageColor: RewardsIcons["poetry-color.png"],
			description: `Earned after completing the poetry books of the Old Testament:  Job, Psalms, Proverbs, Ecclesiastes, and Song of Solomon.`,
			earnedDate: "",
		},
		{
			title: "Major Prophets",
			completed: false,
			imageBW: RewardsIcons["major-prophets-BW.png"],
			imageColor: RewardsIcons["major-prophets-color.png"],
			description: `Earned after completing the Old Testament's collection of longer prophetical writings:  Isaiah, Jeremiah, Lamentations, Ezekiel, and Daniel.`,
			earnedDate: "",
		},
		{
			title: "Minor Prophets",
			completed: false,
			imageBW: RewardsIcons["minor-prophets-BW.png"],
			imageColor: RewardsIcons["minor-prophets-color.png"],
			description: `Earned after completing the Old Testament's collection of shorter prophetical writings:  Hosea, Joel, Amos, Obadiah, Jonah, Micah, Nahum, Habakkuk, Zephaniah, Haggai, Zechariah, and Malachi.`,
			earnedDate: "",
		},
		{
			title: "Old Testament",
			completed: false,
			imageBW: RewardsIcons["OT-BW.png"],
			imageColor: RewardsIcons["OT-color.png"],
			description: `Earned after completing the entire Old Testament! 👏`,
			earnedDate: "",
		},
		{
			title: "Gospels",
			completed: false,
			imageBW: RewardsIcons["gospels-BW.png"],
			imageColor: RewardsIcons["gospels-color.png"],
			description: `Earned after completing the four books of the New Testament's gospel account:  Matthew, Mark, Luke, and John.`,
			earnedDate: "9/30/23",
		},
		{
			title: "Paul's Letters",
			completed: false,
			imageBW: RewardsIcons["pauline-epistles-BW.png"],
			imageColor: RewardsIcons["pauline-epistles-color.png"],
			description: `Earned after completing all the letters from the Apostle Paul in the New Testament:  Romans, 1 Corinthians, 2 Corinthians, Galatians, Ephesians, Philippians, Colossians, 1 Thessalonians, 2 Thessalonians, 1 Timothy, 2 Timothy, Titus, and Philemon.`,
			earnedDate: "9/30/23",
		},
		{
			title: "New Testament",
			completed: false,
			imageBW: RewardsIcons["NT-BW.png"],
			imageColor: RewardsIcons["NT-color.png"],
			description: `Earned after completing all the of the New Testament! 🙌`,
			earnedDate: "",
		},
		{
			title: "Whole Bible",
			completed: false,
			imageBW: RewardsIcons["WholeBible-BW.png"],
			imageColor: RewardsIcons["WholeBible-color.png"],
			description: `The most prestigious of all awards. 🤩 Earned after completing all the books of the Bible, both Old and New Testaments! 🥳 🎊 🎉`,
			earnedDate: "",
		},
	],
	recentEarnedRewards: [],
};

export default initialUserProgress;
