import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const CustomButton = ({
	onPress,
	text,
	type = "PRIMARY",
	bgColor,
	fgColor,
}) => {
	return (
		<Pressable
			onPress={onPress}
			style={[
				styles.container,
				styles[`container_${type}`],
				bgColor ? { backgroundColor: bgColor } : {},
			]}>
			<Text
				style={[
					styles.text,
					styles[`text_${type}`],
					fgColor ? { color: fgColor } : {},
				]}>
				{text}
			</Text>
		</Pressable>
	);
};

export default CustomButton;

const styles = StyleSheet.create({
	container: {
		width: "100%",

		padding: 16,
		marginVertical: 6,

		alignItems: "center",

		borderRadius: 5,
	},
	container_PRIMARY: {
		backgroundColor: "#695DDA",
	},
	container_SECONDARY: {
		borderColor: "#695DDA",
		borderWidth: 2,
	},
	container_TERTIARY: {},
	text: {
		fontWeight: "bold",
		color: "white",
	},
	text_SECONDARY: {
		color: "whitesmoke",
	},
	text_TERTIARY: {
		color: "lightgray",
	},
});
