import { StyleSheet, Text, ScrollView, TouchableHighlight } from "react-native";
import ModalPopup from "../ModalPopup";
import StyledTextButton from "../../atoms/StyledTextButton/StyledTextButton";

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
				<Text style={styles.textDescription}>{modalOption.message}</Text>
				{modalOption.option === "readAgain" ? (
					<StyledTextButton
						backgroundColor={"#695DDA"}
						backgroundPressedColor={"#8174fc"}
						borderWidth={0}
						margin={24}
						onPress={handleReadAgain}>
						Read Bible Again
					</StyledTextButton>
				) : (
					<StyledTextButton
						backgroundColor={"#db3537"}
						backgroundPressedColor={"#fc4c4e"}
						margin={24}
						onPress={handleResetAll}>
						Reset All Data
					</StyledTextButton>
				)}
				<StyledTextButton
					textColor={"#1c1b1b"}
					backgroundColor={"#f5f5f5"}
					backgroundPressedColor={"#cbcbcb"}
					margin={15}
					onPress={modalToggle}>
					Cancel
				</StyledTextButton>
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
		fontSize: 20,
		textAlign: "left",
		paddingHorizontal: 16,
	},
});
