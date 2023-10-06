import {
	Modal,
	StyleSheet,
	View,
	TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";

const ModalPopup = ({ children, modalOpen, modalToggle, backgroundColor }) => {
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modalOpen}
			onRequestClose={modalToggle}
			style={{ justifyContent: "center", alignItems: "center" }}>
			<TouchableWithoutFeedback onPress={modalToggle}>
				<BlurView
					intensity={30}
					tint="dark"
					style={[
						{
							...StyleSheet.absoluteFill,
						},
						// { backgroundColor: "rgba(0,0,0,0.3)" },
					]}
				/>
			</TouchableWithoutFeedback>
			<View
				style={[
					styles.container,
					backgroundColor && { backgroundColor: backgroundColor },
				]}>
				{children}
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		top: "13%",
		left: "2.5%",
		right: "2.5%",
		bottom: "13%",
		padding: 16,
		borderRadius: 20,
		backgroundColor: "rgb(11,14,29)",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
});

export default ModalPopup;
