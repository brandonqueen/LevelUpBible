import { useState } from "react";
import {
	Modal,
	StyleSheet,
	View,
	Image,
	TouchableWithoutFeedback,
	ScrollView,
	Text,
	TouchableHighlight,
	Pressable,
} from "react-native";
import { useDispatch } from "react-redux";
import { BlurView } from "expo-blur";
import correctImg from "../../../assets/Images/CORRECT!!.png";

const QuizModal = ({
	modalOpen,
	modalToggle,
	QuizData,
	numOfVerses,
	testamentIndex,
	bookIndex,
	chapterIndex,
	bookName,
	chapterNum,
}) => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(null);
	const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
	const [answeredIncorrectly, setAnsweredIncorrectly] = useState(false);
	const [quizComplete, setQuizComplete] = useState(false);

	const numberOfQuestions = QuizData?.questions?.length;
	const currentQuestion = QuizData?.questions[currentQuestionIndex];
	const correctAnswerIndex = currentQuestion?.answer?.index;

	const dispatch = useDispatch();

	const QuizContent = () => {
		return (
			<View>
				<Text style={styles.heading}>Quiz 🤓📖</Text>
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
					<Choices />
				</View>
				<View style={styles.bottomButtonsContainer}>
					<TouchableHighlight
						style={styles.cancelButton}
						activeOpacity={1}
						underlayColor="#fc7662"
						onPress={modalToggle}>
						<Text style={styles.modalQuestionText}>Cancel</Text>
					</TouchableHighlight>
					<TouchableHighlight
						style={[
							styles.disabledNextButton,
							answeredCorrectly && styles.activeNextButton,
							answeredIncorrectly && styles.startOverButton,
						]}
						activeOpacity={1}
						underlayColor={answeredCorrectly ? "#60c75d" : "#1d1e21"}
						onPress={
							answeredCorrectly || answeredIncorrectly
								? () => handleSubmit()
								: null
						}>
						<Text style={styles.modalQuestionText}>
							{answeredIncorrectly ? "Start Over" : "Next"}
						</Text>
					</TouchableHighlight>
				</View>
			</View>
		);
	};

	const QuizSuccess = () => {
		return (
			<View>
				<Text style={[styles.heading, { fontSize: 28 }]}>
					HOORAY! 🥳
				</Text>
				<View style={styles.pointsContainer}>
					<Text style={styles.points}>+{numOfVerses}pts</Text>
				</View>
				<View style={styles.modalQuestionContainer}>
					<Text
						style={[
							styles.modalQuestionText,
							{ textAlign: "center", marginVertical: 16 },
						]}>
						You answered all the questions correctly and have added{" "}
						{numOfVerses} points to your overall score! {"\n\n"} Rejoice! 🙌 🎉
					</Text>
					{/* <Text
						style={[
							styles.modalQuestionText,
							{ textAlign: "center", marginVertical: 24, fontWeight: "800" },
						]}>
						Click below to exit the quiz.
					</Text> */}
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

	const Choices = () => {
		return currentQuestion?.options?.map((option, index) => {
			const isSelected = selectedChoiceIndex === index;
			const isCorrect = correctAnswerIndex === index;
			const style = [
				styles.modalChoiceContainer,
				isSelected &&
					(isCorrect ? styles.correctChoice : styles.incorrectChoice),
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
					//dispatch actions as needed here
				setQuizComplete(true);
			} else if (currentQuestionIndex + 1 < numberOfQuestions) {
				setCurrentQuestionIndex(currentQuestionIndex + 1);
				setSelectedChoiceIndex(null);
				setAnsweredCorrectly(false);
				setAnsweredIncorrectly(false);
			}
		}
	};

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modalOpen}
			onRequestClose={modalToggle}
			style={{ justifyContent: "center", alignItems: "center" }}>
			<TouchableWithoutFeedback onPress={modalToggle}>
				<BlurView
					intensity={30}
					tint="dark"
					style={[
						{
							...StyleSheet.absoluteFill,
						},
						{ backgroundColor: "rgba(0,0,0,0.3)" },
					]}
				/>
			</TouchableWithoutFeedback>
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					{quizComplete ? <QuizSuccess /> : <QuizContent />}
				</ScrollView>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		top: "15%",
		left: "2.5%",
		right: "2.5%",
		bottom: "15%",
		padding: 16,
		borderRadius: 20,
		backgroundColor: "#352b8c",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	heading: {
		color: "#f5f5f5",
		textAlign: "center",
		padding: 12,
		fontSize: 24,
		fontWeight: "900",
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
	modalChoiceContainer: {
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "#695DDA",
		backgroundColor: "rgba(11,14,29, .6)",
		borderRadius: 8,
		padding: 12,
		marginVertical: 8,
	},
	modalButtonsContainer: {
		backgroundColor: "yellow",
		flexDirection: "row",
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
		backgroundColor: "rgba(11,14,29, .6)",
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
	completeButtonPressable: {
		borderRadius: 12,
		borderStyle: "solid",
		borderWidth: 2,
		borderColor: "#695DDA",
		backgroundColor: "rgba(11,14,29, .6)",
		width: "50%",
		alignSelf: "center",
	},
	completeButtonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "800",
		textAlign: "center",
		padding: 16,
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
});

export default QuizModal;