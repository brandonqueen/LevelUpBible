import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import StyledTextButton from "../../../atoms/StyledTextButton/StyledTextButton";
import colors from "../../../../constants/colors";
import QuizSuccessRewards from "../QuizSuccessRewards/QuizSuccessRewards";

const QuizSuccess = ({ numOfVerses, rewards, modalToggle }) => {
	const userProgress = useSelector((state) => state.globalData.userProgress);
	const updatedRewardsArray = userProgress.recentEarnedRewards;
	const newRewards = updatedRewardsArray.filter(
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
					You have added {numOfVerses} points to your total score!
				</Text>
				{newRewards.length > 0 && (
					<QuizSuccessRewards newRewards={newRewards} />
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
