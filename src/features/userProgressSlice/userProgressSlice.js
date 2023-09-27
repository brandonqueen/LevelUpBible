import { createSlice } from "@reduxjs/toolkit";
import RewardsIcons from "../../../assets/Images/RewardsIcons/RewardsIconsLoader.js";

const initialState = {
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

const userProgressSlice = createSlice({
	name: "userProgress",
	initialState: initialState,
	reducers: {
		updateProgress: (state, action) => {
			//update numChaptersCompleted
			//update numBooksCompleted
			//update totalPoints
			//update Rewards
		},
	},
});

export const { updateProgress } = userProgressSlice.actions;
export default userProgressSlice.reducer;
