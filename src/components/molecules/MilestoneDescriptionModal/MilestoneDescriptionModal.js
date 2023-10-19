import { StyleSheet, Text, ScrollView, Image } from "react-native";
import StyledTextButton from "../../atoms/StyledTextButton/StyledTextButton";
import ModalPopup from "../ModalPopup";
import colors from "../../../constants/colors";
import React from "react";

const MilestoneDescriptionModal = ({
	descriptionModalOpen,
	modalToggle,
	milestone,
}) => {
	return (
		<ModalPopup modalOpen={descriptionModalOpen} modalToggle={modalToggle}>
			<ScrollView contentContainerStyle={styles.modalContent}>
				<Text style={styles.modalHeader}>{milestone.title}</Text>
				<Image
					style={styles.modalMilestoneImage}
					source={milestone.imageColor}
				/>
				<Text style={styles.modalMilestoneDescription}>
					{milestone.description}
				</Text>
				{milestone.completed && (
					<Text style={styles.modalMilestoneEarned}>
						Earned on {milestone.earnedDate}
					</Text>
				)}
				<StyledTextButton
					backgroundPressedColor={colors.secondary}
					borderWidth={2}
					borderColor={colors.secondaryLight}
					margin={20}
					onPress={modalToggle}>
					Close
				</StyledTextButton>
			</ScrollView>
		</ModalPopup>
	);
};

export default MilestoneDescriptionModal;

const styles = StyleSheet.create({
	modalContent: {
		flex: 0,
		width: "100%",
		alignItems: "center",
	},
	modalHeader: {
		fontSize: 30,
		textTransform: "uppercase",
		fontWeight: "900",
		textAlign: "center",
		color: colors.text,
		marginVertical: 24,
	},
	modalMilestoneImage: {
		height: 130,
		aspectRatio: 1,
		margin: 18,
	},
	modalMilestoneDescription: {
		color: colors.text,
		fontWeight: "600",
		fontSize: 18,
		padding: 18,
		lineHeight: 26,
	},
	modalMilestoneEarned: {
		color: colors.tertiary,
		fontWeight: "800",
		fontSize: 19,
		alignSelf: "flex-start",
		padding: 18,
	},
	modalButton: {
		margin: 20,
		borderRadius: 12,
		borderStyle: "solid",
		borderWidth: 2,
		borderColor: colors.secondary,
		width: 150,
		alignSelf: "center",
	},
	modalButtonText: {
		color: colors.text,
		fontSize: 18,
		fontWeight: "800",
		textAlign: "center",
		padding: 16,
	},
});
