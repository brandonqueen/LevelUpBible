import { StyleSheet, Text, ScrollView } from "react-native";
import StyledTextButton from "../../atoms/StyledTextButton/StyledTextButton";
import ModalPopup from "../ModalPopup";
import colors from "../../../constants/colors";
import React from "react";

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
						borderColor={colors.secondaryLight}
						borderWidth={2}
						backgroundPressedColor={colors.secondaryLighter}
						margin={24}
						onPress={handleReadAgain}>
						Read Bible Again
					</StyledTextButton>
				) : (
					<StyledTextButton
						borderColor={colors.quarternary}
						borderWidth={2}
						backgroundPressedColor={colors.quarternaryLight}
						margin={24}
						onPress={handleResetAll}>
						Reset All Data
					</StyledTextButton>
				)}
				<StyledTextButton
					textColor={colors.text}
					backgroundColor={colors.quarternaryDark}
					backgroundPressedColor={colors.quarternary}
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
		color: colors.text,
		margin: 24,
		lineHeight: 40,
	},
	textDescription: {
		color: colors.text,
		fontWeight: "400",
		fontSize: 20,
		textAlign: "left",
		paddingHorizontal: 16,
	},
});
