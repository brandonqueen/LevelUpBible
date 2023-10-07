import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import Reward from "../../../atoms/Reward/Reward";
import StyledTextButton from "../../../atoms/StyledTextButton/StyledTextButton";

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
			<Text style={styles.heading}>HOORAY! 🥳</Text>
			<View style={styles.pointsContainer}>
				<Text style={styles.points}>
					{`+${numOfVerses}`}
					{"\nPOINTS"}
				</Text>
			</View>
			<View style={styles.modalQuestionContainer}>
				<Text style={styles.text}>
					You answered all the questions correctly and have added {numOfVerses}{" "}
					points to your overall score!
				</Text>
				{newlyEarnedRewards.length > 0 && (
					<NewRewards newRewards={newlyEarnedRewards} />
				)}
				<Text style={styles.text}>Rejoice! 🙌 🎉</Text>
			</View>
			<View style={styles.buttonContainer}>
				<StyledTextButton
					backgroundColor={"rgb(207, 75, 56)"}
					backgroundPressedColor={"rgb(232, 91, 70)"}
					margin={12}
					width={160}
					onPress={modalToggle}>
					Exit
				</StyledTextButton>
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
		marginTop: 12,
		fontSize: 28,
		fontWeight: "900",
		lineHeight: 28,
	},
	pointsContainer: {
		height: 65,
		width: 150,
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
		fontSize: 18,
		color: "rgb(255, 198, 99)",
		textAlign: "center",
	},
	modalQuestionContainer: {
		flex: 1,
		padding: 10,
	},
	text: {
		color: "white",
		fontWeight: "600",
		fontSize: 20,
		textAlign: "center",
		marginVertical: 16,
	},
	buttonContainer: {
		flexDirection: "column",
		alignItems: "center",
	},
});
