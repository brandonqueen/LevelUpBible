import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../../constants/colors";

function LearnMoreButton({ url }) {
	const handlePress = async () => {
		// Check if the device can open the given URL
		const supported = await Linking.canOpenURL(url);

		if (supported) {
			// Open the URL
			await Linking.openURL(url);
		} else {
			console.error(`Don't know how to open URL: ${url}`);
		}
	};

	return (
		<TouchableOpacity onPress={handlePress}>
			<Text style={styles.learnMoreText}>Learn More</Text>
		</TouchableOpacity>
	);
}

export default LearnMoreButton;

const styles = StyleSheet.create({
	learnMoreText: {
		color: colors.text,
		letterSpacing: 0.3,
		lineHeight: 32,
		fontWeight: "700",
		fontSize: 18,
		padding: 0,
		paddingBottom: 30,
		textAlign: "center",
	},
});
