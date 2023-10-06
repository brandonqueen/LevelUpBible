import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import correctImg from "../../../../../assets/Images/CORRECT!!.png";

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
		const style = [
			styles.modalChoiceContainer,
			isSelected && (isCorrect ? styles.correctChoice : styles.incorrectChoice),
		];
		return (
			<View key={"mainview" + index}>
				<Pressable
					key={"press" + index}
					style={style}
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
								style={{ height: 90, width: 180, alignSelf: "center" }}
							/>
							<Text
								key={"correctVerse" + index}
								style={[
									styles.feedbackText,
									{ fontWeight: "500", fontSize: 14 },
								]}>{`(see ${currentQuestion.answer.verse})`}</Text>
						</View>
					) : (
						<View key={"incorrectdropdown" + index}>
							<Text
								key={"incorrectFeedback" + index}
								style={styles.feedbackText}>
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
		borderColor: "#695DDA",
		backgroundColor: "rgba(11,14,29, .6)",
		borderRadius: 8,
		padding: 12,
		marginVertical: 8,
	},
	modalQuestionText: {
		color: "white",
		fontWeight: "600",
		fontSize: 20,
	},
	incorrectChoice: {
		backgroundColor: "rgba(110, 29, 24, .8)",
		borderColor: "rgb(227, 62, 52)",
	},
	correctChoice: {
		backgroundColor: "rgba(25, 110, 24, .7)",
		borderColor: "rgb(37, 171, 36)",
	},
	feedbackText: {
		color: "#f5f5f5",
		margin: 5,
		fontSize: 18,
		fontWeight: "800",
		textAlign: "center",
	},
});
