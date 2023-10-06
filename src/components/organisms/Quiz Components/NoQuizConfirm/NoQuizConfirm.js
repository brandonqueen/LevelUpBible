import { StyleSheet, Text, ScrollView } from "react-native";
import StyledTextButton from "../../../atoms/StyledTextButton/StyledTextButton";

const NoQuizConfirm = ({
	bookName,
	currentQuizBooks,
	modalToggle,
	handleConfirmPressed,
}) => {
	const lastBook = currentQuizBooks.slice(-1);
	const otherBooks = currentQuizBooks.slice(0, -1);

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<Text style={styles.header}>Quiz Coming Soon 🧐</Text>
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
				backgroundColor={"#695DDA"}
				backgroundPressedColor={"#8073ff"}
				margin={20}
				onPress={handleConfirmPressed}>
				Confirm
			</StyledTextButton>
			<StyledTextButton
				backgroundColor={"#cf4b38"}
				backgroundPressedColor={"#e85b46"}
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
		fontSize: 25,
		fontWeight: "900",
		textAlign: "center",
		color: "#f5f5f5",
		margin: 24,
		lineHeight: 40,
	},
	textDescription: {
		color: "#f5f5f5",
		fontWeight: "400",
		fontSize: 18,
		textAlign: "left",
		paddingHorizontal: 12,
	},
	currentBooks: {
		color: "#f5f5f5",
		fontWeight: "400",
		fontSize: 18,
		textAlign: "left",
		paddingHorizontal: 12,
		paddingLeft: 24,
	},
	confirmation: {
		color: "rgb(250, 250, 125)",
		fontWeight: "800",
		fontSize: 20,
		textAlign: "center",
		paddingVertical: 10,
		textTransform: "uppercase",
	},
});
