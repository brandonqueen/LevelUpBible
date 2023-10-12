import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import correctImg from "../../../../../assets/Images/CORRECT!!.png";
import colors from "../../../../constants/colors";
import React from "react";

const QuizChoices = ({
	currentQuestion,
	selectedChoiceIndex,
	correctAnswerIndex,
	answeredCorrectly,
	answeredIncorrectly,
	handleChoicePress,
}) => {
	return currentQuestion?.options?.map((option, index) => {
		const isSelected = selectedChoiceIndex === index;
		const isCorrect = correctAnswerIndex === index;

		return (
			<View key={"mainview" + index}>
				<Pressable
					key={"press" + index}
					style={[
						styles.modalChoiceContainer,
						isSelected &&
							(isCorrect
								? styles.correctChoiceText
								: styles.incorrectChoiceText),
					]}
					onPress={
						answeredCorrectly || answeredIncorrectly
							? null
							: () => handleChoicePress(index)
					}>
					<Text style={styles.modalQuestionText}>{option}</Text>
				</Pressable>
				{isSelected &&
					(isCorrect ? (
						<View key={"correct dropdown" + index}>
							<Image
								key={"image" + index}
								source={correctImg}
								style={styles.image}
							/>
							<Text
								key={"correctVerse" + index}
								style={
									styles.feedbackTextCorrect
								}>{`(see ${currentQuestion.answer.verse})`}</Text>
						</View>
					) : (
						<View key={"incorrectdropdown" + index}>
							<Text
								key={"incorrectFeedback" + index}
								style={styles.feedbackTextIncorrect}>
								Please Try Again 🤔
							</Text>
						</View>
					))}
			</View>
		);
	});
};

export default QuizChoices;

const styles = StyleSheet.create({
	modalChoiceContainer: {
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: colors.secondary,
		backgroundColor: colors.primaryDarkTranslucent,
		borderRadius: 8,
		padding: 12,
		marginVertical: 8,
	},
	modalQuestionText: {
		color: colors.text,
		fontWeight: "600",
		fontSize: 20,
	},
	incorrectChoiceText: {
		backgroundColor: colors.quarternaryDarkTranslucent,
		borderColor: colors.quarternaryLight,
	},
	correctChoiceText: {
		backgroundColor: "rgba(25, 110, 24, .7)",
		borderColor: "rgb(37, 171, 36)",
	},
	image: {
		height: 90,
		width: 180,
		alignSelf: "center",
	},
	feedbackTextCorrect: {
		color: colors.text,
		margin: 5,
		textAlign: "center",
		fontWeight: "500",
		fontSize: 14,
	},
	feedbackTextIncorrect: {
		color: colors.text,
		margin: 5,
		fontSize: 18,
		fontWeight: "800",
		textAlign: "center",
	},
});
