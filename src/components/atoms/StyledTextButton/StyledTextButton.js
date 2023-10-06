import { Text, Pressable } from "react-native";
import { useState } from "react";

const StyledTextButton = ({
	children,
	textColor,
	backgroundColor,
	backgroundPressedColor,
	borderWidth,
	borderColor,
	margin,
	onPress,
}) => {
	const [pressedHighlightColor, setPressedHighlightColor] = useState(null);

	const styles = {
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
	};

	const pressOut = () => {
		setPressedHighlightColor(null);
	};

	return (
		<Pressable
			style={[styles.pressable, { backgroundColor: pressedHighlightColor }]}
			onPress={onPress}
			onPressIn={pressIn}
			onPressOut={pressOut}>
			<Text style={[styles.text, textColor && { color: textColor }]}>
				{children}
			</Text>
		</Pressable>
	);
};

export default StyledTextButton;
