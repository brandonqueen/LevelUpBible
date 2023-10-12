import {
	Modal,
	StyleSheet,
	View,
	TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";
import colors from "../../../constants/colors";
import React from "react";

const ModalPopup = ({ children, modalOpen, modalToggle, backgroundColor }) => {
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modalOpen}
			onRequestClose={modalToggle}
			style={styles.root}>
			<TouchableWithoutFeedback onPress={modalToggle}>
				<BlurView
					intensity={30}
					tint="dark"
					style={{ ...StyleSheet.absoluteFill }}
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
	root: {
		justifyContent: "center",
		alignItems: "center",
	},
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
		backgroundColor: colors.primaryDark,
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
