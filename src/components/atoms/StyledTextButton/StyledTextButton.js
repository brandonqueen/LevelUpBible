import { Text, Pressable, View } from "react-native";
import { useState } from "react";

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
	const [pressedHighlightColor, setPressedHighlightColor] = useState(null);
	const [pressedHighlightColorBorder, setPressedHighlightColorBorder] =
		useState(null);

	const styles = {
		container: {
			alignItems: "center",
			justifyContent: "center",
			alignSelf: "center",
			opacity: opacity,
		},
		pressable: {
			borderRadius: 12,
			borderStyle: "solid",
			backgroundColor: backgroundColor,
			borderWidth: borderWidth,
			borderColor: borderColor,
			margin: margin,
			width: 185,
			alignSelf: "center",
		},
		text: {
			color: "white",
			fontSize: 18,
			fontWeight: "800",
			textAlign: "center",
			padding: 16,
		},
	};

	const pressIn = () => {
		setPressedHighlightColor(backgroundPressedColor);
		setPressedHighlightColorBorder(backgroundPressedColor);
	};

	const pressOut = () => {
		setPressedHighlightColor(null);
		setPressedHighlightColorBorder(null);
	};

	return (
		<View style={styles.container}>
			<Pressable
				style={[
					styles.pressable,
					width && { width: width },
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
