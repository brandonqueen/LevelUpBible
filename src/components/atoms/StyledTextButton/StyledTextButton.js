import { Text, Pressable, View, StyleSheet } from "react-native";
import { useState } from "react";
import colors from "../../../constants/colors";

const StyledTextButton = ({
	children,
	textColor,
	opacity,
	backgroundColor,
	backgroundPressedColor,
	borderWidth,
	borderColor,
	margin,
	width,
	onPress,
}) => {
	//LOCAL STATE
	const [pressedHighlightColor, setPressedHighlightColor] = useState(null);
	const [pressedHighlightColorBorder, setPressedHighlightColorBorder] =
		useState(null);

	const pressIn = () => {
		setPressedHighlightColor(backgroundPressedColor);
		setPressedHighlightColorBorder(backgroundPressedColor);
	};

	const pressOut = () => {
		setPressedHighlightColor(null);
		setPressedHighlightColorBorder(null);
	};

	return (
		<View style={[styles.container, opacity && { opacity: opacity }]}>
			<Pressable
				style={[
					styles.pressable,
					width && { width: width },
					backgroundColor && { backgroundColor: backgroundColor },
					borderWidth && { borderWidth: borderWidth },
					borderColor && { borderColor: borderColor },
					margin && { margin: margin },
					pressedHighlightColor && { backgroundColor: pressedHighlightColor },
					pressedHighlightColorBorder && {
						borderColor: pressedHighlightColorBorder,
					},
				]}
				onPress={onPress}
				onPressIn={pressIn}
				onPressOut={pressOut}>
				<Text style={[styles.text, textColor && { color: textColor }]}>
					{children}
				</Text>
			</Pressable>
		</View>
	);
};

export default StyledTextButton;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "center",
	},
	pressable: {
		borderRadius: 12,
		borderStyle: "solid",
		width: 185,
		alignSelf: "center",
	},
	text: {
		color: colors.text,
		fontSize: 18,
		fontWeight: "800",
		textAlign: "center",
		padding: 16,
	},
});
