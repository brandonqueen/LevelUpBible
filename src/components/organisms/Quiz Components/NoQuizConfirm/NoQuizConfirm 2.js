import { StyleSheet, Text, ScrollView } from "react-native";
import StyledTextButton from "../../../atoms/StyledTextButton/StyledTextButton";
import colors from "../../../../constants/colors";
import React from "react";

const NoQuizConfirm = ({
	bookName,
	currentQuizBooks,
	modalToggle,
	handleConfirmPressed,
}) => {
	//BOOKS THAT HAVE QUIZ DATA
	const lastBook = currentQuizBooks.slice(-1);
	const otherBooks = currentQuizBooks.slice(0, -1);

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<Text style={styles.header}>Quiz Coming Soon{"\n"}🧐</Text>
			<Text style={styles.textDescription}>
				We currently do not have a quiz for {bookName}. We currently have
				quizzes for the following books of the Bible:{"\n"}
			</Text>
			<Text style={styles.currentBooks}>
				{currentQuizBooks.length < 3
					? currentQuizBooks.join(" and ")
					: otherBooks.join(", ") + ", and " + lastBook}
				.{"\n"}
			</Text>
			<Text style={styles.textDescription}>
				Until a quiz is available for {bookName} at a later time, please simply
				verify below that you have finished reading this chapter. (On the honor
				system!){"\n"}
			</Text>
			<Text style={styles.confirmation}>
				I confirm that I have read this chapter
			</Text>
			<StyledTextButton
				backgroundColor={colors.secondaryLight}
				backgroundPressedColor={colors.secondaryLighter}
				margin={20}
				onPress={handleConfirmPressed}>
				Confirm
			</StyledTextButton>
			<StyledTextButton
				backgroundColor={colors.quarternary}
				backgroundPressedColor={colors.quarternaryLight}
				margin={20}
				onPress={modalToggle}>
				Cancel
			</StyledTextButton>
		</ScrollView>
	);
};

export default NoQuizConfirm;

const styles = StyleSheet.create({
	header: {
		fontSize: 30,
		fontWeight: "900",
		textAlign: "center",
		color: colors.text,
		marginVertical: 24,
		lineHeight: 40,
	},
	textDescription: {
		color: colors.text,
		fontWeight: "400",
		fontSize: 18,
		textAlign: "left",
		paddingHorizontal: 12,
		letterSpacing: 0.2,
	},
	currentBooks: {
		color: colors.text,
		fontWeight: "700",
		fontSize: 19,
		textAlign: "left",
		paddingHorizontal: 12,
		paddingLeft: 28,
		letterSpacing: 0.3,
	},
	confirmation: {
		color: colors.tertiary,
		fontWeight: "800",
		fontSize: 20,
		textAlign: "center",
		paddingVertical: 10,
		textTransform: "uppercase",
		letterSpacing: 0.3,
	},
});
