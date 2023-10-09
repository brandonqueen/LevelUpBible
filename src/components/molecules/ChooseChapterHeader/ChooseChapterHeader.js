import { StyleSheet, Text, Pressable } from "react-native";
import colors from "../../../constants/colors";

const ChooseChapterHeader = ({
	headerBookChosen,
	headerTestamentChosen,
	handleHeaderPress,
}) => {
	if (headerBookChosen) {
		return (
			<Pressable onPress={handleHeaderPress}>
				<Text style={styles.header}>Choose Chapter</Text>
			</Pressable>
		);
	} else if (headerTestamentChosen) {
		return (
			<Pressable onPress={handleHeaderPress}>
				<Text style={styles.header}>Choose Book</Text>
			</Pressable>
		);
	} else {
		return (
			<Pressable onPress={handleHeaderPress}>
				<Text style={styles.header}>Choose Testament</Text>
			</Pressable>
		);
	}
};

export default ChooseChapterHeader;

const styles = StyleSheet.create({
	header: {
		color: colors.text,
		fontWeight: "800",
		fontSize: 30,
		padding: 24,
		textAlign: "center",
	},
});
