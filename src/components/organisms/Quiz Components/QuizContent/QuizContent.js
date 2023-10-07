import {
	setChapterCompleted,
	updateProgress,
} from "../../../../features/globalData/globalDataSlice";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { useState } from "react";
import QuizChoices from "../QuizChoices/QuizChoices";
import StyledTextButton from "../../../atoms/StyledTextButton/StyledTextButton";

const QuizContent = ({
	modalToggle,
	bookName,
	chapterIndex,
	testamentIndex,
	bookIndex,
	QuizData,
	setQuizComplete,
	numOfVerses,
}) => {
	//global state setter
	const dispatch = useDispatch();

	//local state
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(null);
	const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
	const [answeredIncorrectly, setAnsweredIncorrectly] = useState(false);

	const numberOfQuestions = QuizData?.questions?.length;
	const currentQuestion = QuizData?.questions[currentQuestionIndex];
	const correctAnswerIndex = currentQuestion?.answer?.index;

	//Press handler functions
	const handleChoicePress = (index) => {
		setSelectedChoiceIndex(index);
		if (index === correctAnswerIndex) {
			setAnsweredCorrectly(true);
			setAnsweredIncorrectly(false);
		} else {
			setAnsweredCorrectly(false);
			setAnsweredIncorrectly(true);
		}
	};

	const handleSubmit = () => {
		if (answeredIncorrectly) {
			setCurrentQuestionIndex(0);
			setSelectedChoiceIndex(null);
			setAnsweredCorrectly(false);
			setAnsweredIncorrectly(false);
		}
		if (answeredCorrectly) {
			if (currentQuestionIndex + 1 === numberOfQuestions) {
				//Quiz completed!
				dispatch(
					setChapterCompleted({
						testamentIndex: testamentIndex,
						bookIndex: bookIndex,
						chapterIndex: chapterIndex,
					})
				);
				dispatch(
					updateProgress({
						points: numOfVerses,
					})
				);
				setQuizComplete(true);
			} else if (currentQuestionIndex + 1 < numberOfQuestions) {
				setSelectedChoiceIndex(null);
				setAnsweredCorrectly(false);
				setAnsweredIncorrectly(false);
				setCurrentQuestionIndex(currentQuestionIndex + 1);
			}
		}
	};

	return (
		<View>
			<Text style={styles.heading}> Quiz 🤓</Text>
			<Text style={styles.bookName}>{`${bookName} ${chapterIndex + 1}`}</Text>
			<View style={styles.modalQuestionContainer}>
				<Text style={styles.modalQuestionNumber}>
					Question{" "}
					{currentQuestionIndex + 1 <= numberOfQuestions
						? currentQuestionIndex + 1
						: currentQuestionIndex}
					/{numberOfQuestions}
				</Text>
				<Text style={styles.modalQuestionText}>
					{QuizData?.questions[currentQuestionIndex]?.question}
				</Text>
			</View>
			<View style={styles.modalChoicesContainer}>
				<QuizChoices
					currentQuestion={currentQuestion}
					selectedChoiceIndex={selectedChoiceIndex}
					correctAnswerIndex={correctAnswerIndex}
					answeredCorrectly={answeredCorrectly}
					answeredIncorrectly={answeredIncorrectly}
					handleChoicePress={(selectedChoiceIndex) =>
						handleChoicePress(selectedChoiceIndex)
					}
				/>
			</View>
			<View style={styles.bottomButtonsContainer}>
				<StyledTextButton
					backgroundColor={"#e85b46"}
					backgroundPressedColor={"#fc7662"}
					width={125}
					onPress={modalToggle}>
					Cancel
				</StyledTextButton>
				<StyledTextButton
					opacity={!(answeredCorrectly || answeredIncorrectly) ? 0.6 : 1}
					backgroundColor={
						!(answeredCorrectly || answeredIncorrectly)
							? "rgb(11,14,29)"
							: (answeredCorrectly && "#56b553") ||
							  (answeredIncorrectly && "rgb(11,14,29)")
					}
					backgroundPressedColor={
						!(answeredCorrectly || answeredIncorrectly)
							? null
							: (answeredCorrectly && "#60c75d") ||
							  (answeredIncorrectly && "#1d1e21")
					}
					borderWidth={2}
					borderColor={answeredIncorrectly ? "rgb(11,14,29)" : "#56b553"}
					width={!answeredIncorrectly ? 125 : 150}
					onPress={
						!(answeredCorrectly || answeredIncorrectly)
							? null
							: () => handleSubmit()
					}>
					{answeredIncorrectly ? "Start Over" : "Next"}
				</StyledTextButton>
			</View>
		</View>
	);
};

export default QuizContent;

const styles = StyleSheet.create({
	heading: {
		color: "#f5f5f5",
		textAlign: "center",
		paddingTop: 12,
		fontSize: 26,
		fontWeight: "900",
	},
	bookName: {
		color: "#e8e7e7",
		textAlign: "center",
		paddingBottom: 12,
		paddingTop: 8,
		fontWeight: "300",
		fontSize: 22,
	},
	modalQuestionContainer: {
		flex: 1,
		padding: 10,
	},
	modalQuestionNumber: {
		color: "white",
		fontSize: 20,
		fontWeight: "800",
		marginBottom: 8,
	},
	modalQuestionText: {
		color: "white",
		fontWeight: "600",
		fontSize: 20,
	},
	modalChoicesContainer: {
		flex: 1,
		padding: 10,
	},
	bottomButtonsContainer: {
		marginVertical: 16,
		flex: 1,
		flexDirection: "row",
		padding: 10,
		justifyContent: "space-between",
		marginBottom: 25,
	},
});
