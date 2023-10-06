import { StyleSheet, Text, ScrollView, TouchableHighlight } from "react-native";
import ModalPopup from "../ModalPopup";

const VerifyResetModal = ({
	modalOpen,
	modalToggle,
	modalOption,
	handleReadAgain,
	handleResetAll,
}) => {
	return (
		<ModalPopup modalOpen={modalOpen} modalToggle={modalToggle}>
			<ScrollView>
				<Text style={styles.header}>WARNING!{"\n"}⚠️</Text>
				<Text style={[styles.textDescription, { fontSize: 20 }]}>
					{modalOption.message}
				</Text>
				{modalOption.option === "readAgain" ? (
					<TouchableHighlight
						style={[styles.button, { backgroundColor: "#695DDA" }]}
						onPress={handleReadAgain}
						activeOpacity={1}
						underlayColor="#8174fc">
						<Text style={styles.buttonText}>Read Bible Again</Text>
					</TouchableHighlight>
				) : (
					<TouchableHighlight
						style={[styles.button, { backgroundColor: "#db3537" }]}
						onPress={handleResetAll}
						activeOpacity={1}
						underlayColor="#fc4c4e">
						<Text style={styles.buttonText}>Reset All Data</Text>
					</TouchableHighlight>
				)}
				<TouchableHighlight
					style={[styles.button, { backgroundColor: "#f5f5f5" }]}
					onPress={modalToggle}>
					<Text style={[styles.buttonText, { color: "#1c1b1b" }]}>Cancel</Text>
				</TouchableHighlight>
			</ScrollView>
		</ModalPopup>
	);
};

export default VerifyResetModal;

const styles = StyleSheet.create({
	header: {
		fontSize: 30,
		fontWeight: "900",
		textAlign: "center",
		color: "#f5f5f5",
		margin: 24,
		lineHeight: 40,
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
