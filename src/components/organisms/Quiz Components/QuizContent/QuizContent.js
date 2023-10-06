import {
	StyleSheet,
	Text,
	View,
	Pressable,
	TouchableHighlight,
} from "react-native";
import { useDispatch } from "react-redux";
import {
	setChapterCompleted,
	updateProgress,
} from "../../../../features/globalData/globalDataSlice";
import { useState } from "react";
import QuizChoices from "../QuizChoices/QuizChoices";

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
	const [buttonHighlightColor, setButtonHighlightColor] = useState(null);

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

	const handleButtonHighlight = () => {
		if (answeredCorrectly) {
			setButtonHighlightColor({ backgroundColor: "#60c75d" });
		}
		if (answeredIncorrectly) {
			setButtonHighlightColor({ backgroundColor: "#1d1e21" });
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
			<Text style={styles.heading}>
				{" "}
				Quiz 🤓{"\n"}
				<Text style={{ fontWeight: "300", fontSize: 22 }}>{`${bookName} ${
					chapterIndex + 1
				}`}</Text>
			</Text>
			<View style={styles.modalQuestionContainer}>
				<Text
					style={[
						styles.modalQuestionText,
						{ fontWeight: "800", marginBottom: 8 },
					]}>
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
				<TouchableHighlight
					style={styles.cancelButton}
					activeOpacity={1}
					underlayColor="#fc7662"
					onPress={modalToggle}>
					<Text style={styles.modalQuestionText}>Cancel</Text>
				</TouchableHighlight>
				<Pressable
					style={[
						styles.disabledNextButton,
						answeredCorrectly && styles.activeNextButton,
						answeredIncorrectly && styles.startOverButton,
						buttonHighlightColor,
					]}
					onPress={
						answeredCorrectly || answeredIncorrectly
							? () => handleSubmit()
							: null
					}
					onPressIn={handleButtonHighlight}
					onPressOut={() => setButtonHighlightColor(null)}>
					<Text style={styles.modalQuestionText}>
						{answeredIncorrectly ? "Start Over" : "Next"}
					</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default QuizContent;

const styles = StyleSheet.create({
	heading: {
		color: "#f5f5f5",
		textAlign: "center",
		padding: 12,
		fontSize: 26,
		fontWeight: "900",
		lineHeight: 28,
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
	},
	cancelButton: {
		width: "35%",
		paddingHorizontal: 18,
		paddingVertical: 10,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgb(232, 91, 70)",
	},
	disabledNextButton: {
		width: "35%",
		opacity: 0.6,
		paddingHorizontal: 18,
		paddingVertical: 10,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgb(11,14,29)",
		borderColor: "#56b553",
		borderWidth: 2,
	},
	activeNextButton: {
		opacity: 1,
		backgroundColor: "#56b553",
		borderWidth: 0,
	},
	startOverButton: {
		width: "50%",
		backgroundColor: "rgb(11,14,29)",
		opacity: 1,
		borderWidth: 0,
	},
});
