import { StyleSheet, Text, ScrollView, TouchableHighlight } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setChapterCompleted,
	updateProgress,
} from "../../features/globalData/globalDataSlice";
import React from "react";
import ModalPopup from "../ModalPopup/ModalPopup";
import QuizSuccess from "../QuizSuccess/QuizSuccess";

const NoQuizModal = ({
	modalOpen,
	modalToggle,
	currentQuizBooks,
	numOfVerses,
	testamentIndex,
	bookIndex,
	bookName,
	chapterIndex,
	rewards,
}) => {
	//state
	const [confirmedRead, setConfirmedRead] = useState(false);
	const [newRewards, setNewRewards] = useState([]);

	//global state setter
	const dispatch = useDispatch();
	const userProgress = useSelector((state) => state.globalData.userProgress);

	const handleConfirmPressed = () => {
		const updatedRewardsArray = userProgress.recentEarnedRewards;
		const newlyEarnedRewards = updatedRewardsArray.filter(
			(item) => !rewards.includes(item)
		);
		if (newlyEarnedRewards) {
			setNewRewards(newlyEarnedRewards);
		}

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
		setConfirmedRead(true);
	};

	const ConfirmPage = () => {
		//to display books for which there are quizes
		const lastBook = currentQuizBooks.slice(-1);
		const otherBooks = currentQuizBooks.slice(0, -1);

		return (
			<ScrollView>
				<Text style={styles.header}>Quiz Coming Soon 🧐</Text>
				<Text style={styles.textDescription}>
					We currently do not have a quiz for {bookName}. We currently have
					quizzes for the following books of the Bible:{"\n"}
				</Text>
				<Text style={[styles.textDescription, { paddingLeft: 24 }]}>
					{currentQuizBooks.length < 3
						? currentQuizBooks.join(" and ")
						: otherBooks.join(", ") + ", and " + lastBook}
					.{"\n"}
				</Text>
				<Text style={styles.textDescription}>
					Until a quiz is available for {bookName} at a later time, please
					simply verify below that you have finished reading this chapter. (On
					the honor system!){"\n"}
				</Text>
				<Text style={styles.confirmation}>
					I confirm that I have read this chapter
				</Text>
				<TouchableHighlight
					style={[styles.button, { backgroundColor: "#695DDA" }]}
					activeOpacity={1}
					underlayColor={"#8073ff"}
					onPress={handleConfirmPressed}>
					<Text style={styles.buttonText}>Confirm</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={[styles.button, { backgroundColor: "rgb(207, 75, 56)" }]}
					activeOpacity={1}
					underlayColor="rgb(232, 91, 70)"
					onPress={modalToggle}>
					<Text style={styles.buttonText}>Cancel</Text>
				</TouchableHighlight>
			</ScrollView>
		);
	};

	const PointsPage = () => {
		return (
			<ScrollView>
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
							You answered all the questions correctly and have added{" "}
							{numOfVerses} points to your overall score! {"\n\n"} Rejoice! 🙌
							🎉
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
			</ScrollView>
		);
	};

	return (
		<ModalPopup modalOpen={modalOpen} modalToggle={modalToggle}>
			{confirmedRead ? (
				<QuizSuccess
					numOfVerses={numOfVerses}
					modalToggle={modalToggle}
					newRewards={newRewards}
				/>
			) : (
				<ConfirmPage />
			)}
		</ModalPopup>
	);
};

export default NoQuizModal;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
	header: {
		fontSize: 25,
		fontWeight: "900",
		textAlign: "center",
		color: "#f5f5f5",
		margin: 24,
		lineHeight: 40,
	},
	optionContainer: {
		paddingVertical: 12,
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	confirmation: {
		color: "rgb(250, 250, 125)",
		fontWeight: "800",
		fontSize: 20,
		textAlign: "center",
		paddingVertical: 10,
		textTransform: "uppercase",
	},
	textDescription: {
		color: "#f5f5f5",
		fontWeight: "400",
		fontSize: 18,
		textAlign: "left",
		paddingHorizontal: 12,
	},
	button: {
		margin: 20,
		borderRadius: 12,
		backgroundColor: "#0f0f0f",
		width: 200,
		alignSelf: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "800",
		textAlign: "center",
		padding: 16,
	},
});
