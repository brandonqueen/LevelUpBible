/* eslint-disable react/prop-types */
import { StyleSheet, Text, Pressable, Image, View } from "react-native";
import { useState } from "react";
import MilestoneDescriptionModal from "../../molecules/MilestoneDescriptionModal/MilestoneDescriptionModal";
import colors from "../../../constants/colors";
import React from "react";

const Milestone = ({ milestone }) => {
	//LOCAL STATE
	const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);

	//REWARD PRESS HANDLER
	function modalToggle() {
		setDescriptionModalOpen(!descriptionModalOpen);
	}

	return (
		<View style={styles.container}>
			{descriptionModalOpen && (
				<MilestoneDescriptionModal
					descriptionModalOpen={descriptionModalOpen}
					modalToggle={modalToggle}
					milestone={milestone}
				/>
			)}
			<Pressable style={styles.pressable} onPress={modalToggle}>
				<Image
					style={milestone.completed ? styles.image : styles.imageIncomplete}
					source={
						milestone.completed ? milestone.imageColor : milestone.imageBW
					}
				/>
				<Text style={milestone.completed ? styles.text : styles.textIncomplete}>
					{milestone.title}
				</Text>
			</Pressable>
		</View>
	);
};

export default Milestone;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	pressable: {
		width: 80,
		flexDirection: "column",
	},
	image: {
		height: 80,
		aspectRatio: 1,
	},
	imageIncomplete: {
		height: 80,
		aspectRatio: 1,
		opacity: 0.25,
	},
	text: {
		marginVertical: 4,
		textAlign: "center",
		color: colors.text,
		fontWeight: "900",
	},
	textIncomplete: {
		marginVertical: 4,
		textAlign: "center",
		color: colors.textGrey,
		fontWeight: "900",
	},
});
