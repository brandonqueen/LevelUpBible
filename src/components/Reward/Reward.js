import {
	StyleSheet,
	Text,
	Pressable,
	Image,
	View,
	ScrollView,
	TouchableHighlight,
} from "react-native";
import { useState } from "react";
import ModalPopup from "../ModalPopup/ModalPopup";

const Reward = ({ reward }) => {
	const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
	const [modalReward, setModalReward] = useState(null);

	function modalToggle(reward) {
		setDescriptionModalOpen(!descriptionModalOpen);
		setModalReward(reward);
	}

	const DescriptionModal = () => {
		return (
			<ModalPopup
				modalOpen={descriptionModalOpen}
				modalToggle={() => modalToggle()}>
				<ScrollView contentContainerStyle={styles.modalContent}>
					<Text style={styles.modalHeader}>{reward.title}</Text>
					<Image style={styles.modalRewardImage} source={reward.imageColor} />
					<Text style={styles.modalRewardDescription}>
						{reward.description}
					</Text>
					{reward.completed && (
						<Text style={styles.modalRewardEarned}>
							Earned on {reward.earnedDate}
						</Text>
					)}
					<TouchableHighlight
						style={[styles.modalButton]}
						activeOpacity={1}
						underlayColor="#5d67da"
						onPress={modalToggle}>
						<Text style={styles.modalButtonText}>Close</Text>
					</TouchableHighlight>
				</ScrollView>
			</ModalPopup>
		);
	};

	return (
		<View style={styles.container}>
			{descriptionModalOpen && <DescriptionModal />}
			<Pressable style={styles.pressable} onPress={modalToggle}>
				<Image
					style={[styles.image, !reward.completed && { opacity: 0.25 }]}
					source={reward.completed ? reward.imageColor : reward.imageBW}
				/>
				<Text
					style={[
						styles.text,
						reward.completed ? null : { color: "rgba(245, 245, 245, .6)" },
					]}>
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
	text: {
		marginVertical: 4,
		textAlign: "center",
		color: "#f5f5f5",
		fontWeight: "900",
	},
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
		color: "#f5f5f5",
		margin: 24,
	},
	modalRewardImage: {
		height: 130,
		aspectRatio: 1,
		margin: 18,
	},
	modalRewardDescription: {
		color: "#f5f5f5",
		fontWeight: "600",
		fontSize: 18,
		//textAlign: "center",
		padding: 18,
		lineHeight: 26,
	},
	modalRewardEarned: {
		color: "#DFB01C",
		fontWeight: "800",
		fontSize: 19,
		//textAlign: "center",
		alignSelf: "flex-start",
		padding: 18,
	},
	modalButton: {
		margin: 20,
		borderRadius: 12,
		borderStyle: "solid",
		borderWidth: 2,
		borderColor: "#695DDA",
		width: 150,
		alignSelf: "center",
	},
	modalButtonText: {
		color: "#f5f5f5",
		fontSize: 18,
		fontWeight: "800",
		textAlign: "center",
		padding: 16,
	},
});
