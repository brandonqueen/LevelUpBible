import RewardsIcons from "../../../assets/Images/RewardsIconsLoader.js";

export const initialUserProgress = {
	stats: {
		numChaptersCompleted: 0,
		numBooksCompleted: 0,
		totalPoints: 0,
	},
	rewards: [
		{
			title: "First Chapter",
			complete: false,
			completeImage: RewardsIcons["Chapter-BW.png"],
			incompleteImage: RewardsIcons["Chapter-color.png"],
		},
		{
			title: "First Book",
			complete: false,
			completeImage: RewardsIcons["Book-BW.png"],
			incompleteImage: RewardsIcons["Book-color.png"],
		},
	],
};
