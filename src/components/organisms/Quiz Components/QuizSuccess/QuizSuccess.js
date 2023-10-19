import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import QuizSuccessMilestones from "../QuizSuccessMilestones/QuizSuccessMilestones";
import StyledTextButton from "../../../atoms/StyledTextButton/StyledTextButton";
import colors from "../../../../constants/colors";
import React from "react";

const QuizSuccess = ({ numOfVerses, milestones, modalToggle }) => {
	const userProgress = useSelector((state) => state.globalData.userProgress);
	const updatedMilestonesArray = userProgress.recentEarnedMilestones;
	const newMilestones = updatedMilestonesArray.filter(
		(item) => !milestones.includes(item)
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
					You have added {numOfVerses} points to your total score!
				</Text>
				{newMilestones.length > 0 && (
					<QuizSuccessMilestones newMilestones={newMilestones} />
				)}
				<Text style={styles.text}>Rejoice! 🙌 🎉</Text>
			</View>
			<View style={styles.buttonContainer}>
				<StyledTextButton
					backgroundColor={colors.quarternary}
					backgroundPressedColor={colors.quarternaryLight}
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
		color: colors.text,
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
		borderColor: colors.tertiaryDark,
		margin: 8,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.primaryDarkTranslucent,
	},
	points: {
		fontWeight: "900",
		fontSize: 18,
		color: colors.tertiaryLight,
		textAlign: "center",
	},
	modalQuestionContainer: {
		flex: 1,
		padding: 10,
	},
	text: {
		color: colors.text,
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
