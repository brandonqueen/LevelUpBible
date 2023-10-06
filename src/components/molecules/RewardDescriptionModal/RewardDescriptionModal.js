import {
	StyleSheet,
	Text,
	ScrollView,
	Image,
	TouchableHighlight,
} from "react-native";
import ModalPopup from "../ModalPopup";

const RewardDescriptionModal = ({
	descriptionModalOpen,
	modalToggle,
	reward,
}) => {
	return (
		<ModalPopup modalOpen={descriptionModalOpen} modalToggle={modalToggle}>
			<ScrollView contentContainerStyle={styles.modalContent}>
				<Text style={styles.modalHeader}>{reward.title}</Text>
				<Image style={styles.modalRewardImage} source={reward.imageColor} />
				<Text style={styles.modalRewardDescription}>{reward.description}</Text>
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

export default RewardDescriptionModal;

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
