import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
	const navigation = useNavigation();

	return (
		<View style={styles.root}>
			<View style={styles.card}>
				<ScrollView style={{ width: "100%", flex: 0 }}>
					<Text style={styles.header}>Settings</Text>
					<View
						style={{
							width: "100%",
							alignItems: "flex-start",
							justifyContent: "flex-start",
						}}>
						<View style={styles.optionContainer}>
							<Text style={[styles.optionTitle, { color: "#7b6efa" }]}>
								Read Again
							</Text>
							<Text style={styles.textDescription}>
								Reset your chapter and book progress as well as reset your
								rewards but{" "}
								<Text
									style={{
										fontWeight: "800",
										fontSize: 18,
										color: "#7b6efa",
									}}>
									preserve your current overall points
								</Text>
								. (This option is ideal for multiple re-readings of the Bible.)
							</Text>
							<Pressable
								style={[styles.button, { backgroundColor: "#695DDA" }]}>
								<Text style={styles.buttonText}>Read Bible Again</Text>
							</Pressable>
						</View>
						<View style={styles.optionContainer}>
							<Text style={[styles.optionTitle, { color: "#db3537" }]}>
								Reset All Data
							</Text>
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
								style={[styles.button, { backgroundColor: "#db3537" }]}>
								<Text style={styles.buttonText}>Reset All Data</Text>
							</Pressable>
						</View>
						<View style={styles.optionContainer}>
							<Text style={styles.optionTitle}>Contact</Text>
						</View>
					</View>
				</ScrollView>
			</View>
		</View>
	);
};

export default SettingsScreen;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	card: {
		width: "95%",
		height: "95%",
		padding: 18,
		backgroundColor: "rgb(11,14,29)",
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		color: "#f5f5f5",
		fontWeight: "800",
		fontSize: 30,
		textAlign: "center",
		paddingBottom: 16,
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
		paddingBottom: 16,
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
		backgroundColor: "black",
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
