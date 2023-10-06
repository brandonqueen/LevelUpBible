import {
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	ScrollView,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Reward from "../../../atoms/Reward/Reward";

const NewRewards = ({ newRewards }) => {
	return (
		<View style={{ flex: 1, marginVertical: 12 }}>
			<Text style={[styles.modalQuestionText, { paddingBottom: 16 }]}>
				{newRewards.length > 1
					? "You also earned new Rewards!"
					: "You also earned a new Reward!"}
			</Text>
			<View style={{ flexDirection: "row", flex: 1 }}>
				<NewRewardsRender newRewards={newRewards} />
			</View>
		</View>
	);
};

const NewRewardsRender = ({ newRewards }) => {
	const rewardState = useSelector(
		(state) => state.globalData.userProgress.rewards
	);
	return (
		<>
			{newRewards?.map((newReward, index) => {
				const rewardIndex = rewardState.findIndex(
					(rewardObj) => rewardObj.title === newReward
				);
				const newRewardToRender = rewardState[rewardIndex];

				return (
					<Reward key={"New Reward Index" + index} reward={newRewardToRender} />
				);
			})}
		</>
	);
};

const QuizSuccess = ({ numOfVerses, rewards, modalToggle }) => {
	const userProgress = useSelector((state) => state.globalData.userProgress);
	const updatedRewardsArray = userProgress.recentEarnedRewards;
	const newlyEarnedRewards = updatedRewardsArray.filter(
		(item) => !rewards.includes(item)
	);

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<Text style={[styles.heading, { fontSize: 28 }]}>HOORAY! 🥳</Text>
			<View style={styles.pointsContainer}>
				<Text style={styles.points}>
					{`+${numOfVerses}`}
					{"\nPOINTS"}
				</Text>
			</View>
			<View style={styles.modalQuestionContainer}>
				<Text
					style={[
						styles.modalQuestionText,
						{ textAlign: "center", marginVertical: 16 },
					]}>
					You answered all the questions correctly and have added {numOfVerses}{" "}
					points to your overall score!
				</Text>
				{newlyEarnedRewards.length > 0 && (
					<NewRewards newRewards={newlyEarnedRewards} />
				)}
				<Text
					style={[
						styles.modalQuestionText,
						{ textAlign: "center", marginVertical: 16 },
					]}>
					Rejoice! 🙌 🎉
				</Text>
			</View>
			<View style={styles.bottomButtonsCompleteContainer}>
				<TouchableHighlight
					key={"exit button"}
					style={styles.exitButton}
					activeOpacity={1}
					underlayColor="rgb(232, 91, 70)"
					onPress={modalToggle}>
					<Text style={styles.completeButtonText}>Exit</Text>
				</TouchableHighlight>
			</View>
		</ScrollView>
	);
};

export default QuizSuccess;

const styles = StyleSheet.create({
	heading: {
		color: "#f5f5f5",
		textAlign: "center",
		padding: 12,
		fontSize: 26,
		fontWeight: "900",
		lineHeight: 28,
	},
	pointsContainer: {
		height: 80,
		width: 160,
		borderWidth: 3,
		borderRadius: 80,
		borderColor: "#a38b00",
		margin: 8,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(11,14,29, .6)",
	},
	points: {
		fontWeight: "900",
		fontSize: 20,
		color: "rgb(255, 198, 99)",
		textAlign: "center",
	},
	modalQuestionContainer: {
		flex: 1,
		padding: 10,
	},
	modalQuestionText: {
		color: "white",
		fontWeight: "600",
		fontSize: 20,
	},
	bottomButtonsCompleteContainer: {
		flexDirection: "column",
		alignItems: "center",
	},
	exitButton: {
		width: "50%",
		marginBottom: 35,
		borderRadius: 12,
		backgroundColor: "rgb(207, 75, 56)",
	},
	completeButtonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "800",
		textAlign: "center",
		padding: 16,
	},
});
