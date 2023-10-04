import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const QuizSuccess = ({ numOfVerses, newRewards, modalToggle }) => {
	const rewardState = useSelector(
		(state) => state.globalData.userProgress.rewards
	);

	const NewRewards = () => {
		newRewards.map((newReward) => {
			rewardIndex = rewardState.findIndex(
				(rewardObj) => rewardObj.title === newReward
			);
			const newRewardToRender = rewardState[rewardIndex];
			return (
				<View>
					<Text style={styles.modalQuestionText}>
						You've also earned a new Reward!
					</Text>
					<Reward reward={newRewardToRender}></Reward>
				</View>
			);
		});
	};

	return (
		<View>
			<Text style={[styles.heading, { fontSize: 28 }]}>HOORAY! 🥳</Text>
			<View style={styles.pointsContainer}>
				<Text style={styles.points}>+{numOfVerses}pts</Text>
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
				{newRewards && <NewRewards />}
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
		</View>
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
		borderWidth: 3,
		borderRadius: 65,
		borderColor: "#a38b00",
		padding: 12,
		margin: 12,
		width: 130,
		height: 130,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(11,14,29, .6)",
	},
	points: {
		fontWeight: "900",
		fontSize: 23,
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
