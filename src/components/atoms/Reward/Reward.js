import { StyleSheet, Text, Pressable, Image, View } from "react-native";
import { useState } from "react";
import RewardDescriptionModal from "../../molecules/RewardDescriptionModal/RewardDescriptionModal";
import colors from "../../../constants/colors";

const Reward = ({ reward }) => {
	//LOCAL STATE
	const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);

	//REWARD PRESS HANDLER
	function modalToggle() {
		setDescriptionModalOpen(!descriptionModalOpen);
	}

	return (
		<View style={styles.container}>
			{descriptionModalOpen && (
				<RewardDescriptionModal
					descriptionModalOpen={descriptionModalOpen}
					modalToggle={modalToggle}
					reward={reward}
				/>
			)}
			<Pressable style={styles.pressable} onPress={modalToggle}>
				<Image
					style={reward.completed ? styles.image : styles.imageIncomplete}
					source={reward.completed ? reward.imageColor : reward.imageBW}
				/>
				<Text style={reward.completed ? styles.text : styles.textIncomplete}>
					{reward.title}
				</Text>
			</Pressable>
		</View>
	);
};

export default Reward;

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
