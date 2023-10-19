/* eslint-disable no-mixed-spaces-and-tabs */
import {
	setChapterCompleted,
	updateProgress,
} from "../../../../features/globalData/globalDataSlice";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import StyledTextButton from "../../../atoms/StyledTextButton/StyledTextButton";
import QuizChoices from "../QuizChoices/QuizChoices";
import colors from "../../../../constants/colors";

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
	//NAVIGATION
	const navigation = useNavigation();

	//GLOBAL STATE
	const dispatch = useDispatch();

	//LOCAL STATE
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(null);
	const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
	const [answeredIncorrectly, setAnsweredIncorrectly] = useState(false);

	//OTHER VARIABLES
	const numberOfQuestions = QuizData?.questions?.length;
	const currentQuestion = QuizData?.questions[currentQuestionIndex];
	const correctAnswerIndex = currentQuestion?.answer?.index;

	//PRESS HANDLERS
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
			navigation.push("Bible", {
				testamentIndex: testamentIndex,
				bookIndex: bookIndex,
				bookName: bookName,
				chapter: chapterIndex + 1,
			});
			modalToggle();
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
					backgroundColor={colors.quarternary}
					backgroundPressedColor={colors.quarternaryLight}
					width={125}
					onPress={modalToggle}>
					Cancel
				</StyledTextButton>
				<StyledTextButton
					opacity={!(answeredCorrectly || answeredIncorrectly) ? 0.6 : 1}
					backgroundColor={
						!(answeredCorrectly || answeredIncorrectly)
							? colors.primaryDark
							: (answeredCorrectly && colors.secondaryLight) ||
							  (answeredIncorrectly && colors.quinary)
					}
					backgroundPressedColor={
						!(answeredCorrectly || answeredIncorrectly)
							? null
							: (answeredCorrectly && colors.secondaryLighter) ||
							  (answeredIncorrectly && colors.quinaryLight)
					}
					borderWidth={2}
					borderColor={
						answeredIncorrectly ? colors.quinary : colors.secondaryLight
					}
					width={!answeredIncorrectly ? 125 : 150}
					onPress={
						!(answeredCorrectly || answeredIncorrectly)
							? null
							: () => handleSubmit()
					}>
					{answeredIncorrectly ? "Read Again" : "Next"}
				</StyledTextButton>
			</View>
		</View>
	);
};

export default QuizContent;

const styles = StyleSheet.create({
	heading: {
		color: colors.text,
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
		color: colors.text,
		fontSize: 20,
		fontWeight: "800",
		marginBottom: 8,
	},
	modalQuestionText: {
		color: colors.text,
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
