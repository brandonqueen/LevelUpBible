import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Pressable,
	Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
	const navigation = useNavigation();
	const handleReadAgainPress = () => {
		alert("read again pressed");
	};
	const handleResetAllPress = () => {
		alert("reset all pressed");
	};

	const handleContactPress = () => {
		Linking.openURL("mailto:levelupbible@gmail.com");
	};

	return (
		<View style={styles.root}>
			<ScrollView
				style={{ width: "100%", flex: 0 }}
				showsVerticalScrollIndicator={false}>
				<Text style={styles.header}>Settings</Text>
				<View
					style={{
						width: "100%",
						alignItems: "flex-start",
						justifyContent: "flex-start",
					}}>
					<View style={styles.optionContainer}>
						<Text style={[styles.optionTitle]}>Read Again</Text>
						<Text style={styles.textDescription}>
							Reset chapter, book and rewards progress but{" "}
							<Text
								style={{
									fontWeight: "800",
									fontSize: 18,
									color: "#7b6efa",
								}}>
								preserve your current overall points
							</Text>
							. (This option is ideal for continuing to gain points with
							multiple re-readings of the Bible.)
						</Text>
						<Pressable
							style={[styles.button, { backgroundColor: "#695DDA" }]}
							onPress={handleReadAgainPress}>
							<Text style={styles.buttonText}>Read Bible Again</Text>
						</Pressable>
					</View>
					<View style={styles.optionContainer}>
						<Text style={[styles.optionTitle]}>Reset All Data</Text>
						<Text style={styles.textDescription}>
							Reset all data. Same as option above but{" "}
							<Text
								style={{
									fontWeight: "800",
									fontSize: 18,
									color: "#db3537",
								}}>
								this will also reset your current points back to zero.
							</Text>
						</Text>
						<Pressable
							style={[styles.button, { backgroundColor: "#db3537" }]}
							onPress={handleResetAllPress}>
							<Text style={styles.buttonText}>Reset All Data</Text>
						</Pressable>
					</View>
					<View style={[styles.optionContainer, { marginBottom: 30 }]}>
						<Text style={styles.optionTitle}>Contact</Text>
						<Text style={styles.textDescription}>
							If you would like to get in touch to report an issue, ask a
							question, or just to say hello, please click the button below.
						</Text>
						<Pressable style={styles.button} onPress={handleContactPress}>
							<Text style={styles.buttonText}>Contact Us</Text>
						</Pressable>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default SettingsScreen;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
	header: {
		fontSize: 30,
		fontWeight: "900",
		textAlign: "center",
		color: "#f5f5f5",
		margin: 24,
	},
	optionContainer: {
		paddingVertical: 12,
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	optionTitle: {
		color: "#f5f5f5",
		fontWeight: "800",
		fontSize: 24,
		textAlign: "left",
		paddingBottom: 12,
		paddingLeft: 10,
	},
	textDescription: {
		color: "#f5f5f5",
		fontWeight: "400",
		fontSize: 16,
		textAlign: "left",
		paddingHorizontal: 16,
	},
	button: {
		margin: 24,
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
