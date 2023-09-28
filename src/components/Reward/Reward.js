import { StyleSheet, Text, View, Image } from "react-native";

const Reward = ({ image, title, complete }) => {
	return (
		<View style={styles.container}>
			<Image style={styles.image} source={image} />
			<Text
				style={[
					styles.text,
					complete ? null : { color: "rgba(245, 245, 245, .6)" },
				]}>
				{title}
			</Text>
		</View>
	);
};

export default Reward;

const styles = StyleSheet.create({
	container: {
		width: "24%",
		margin: 16,
		flexDirection: "column",
	},
	image: {
		height: 90,
		aspectRatio: 1,
	},
	text: {
		textAlign: "center",
		color: "#f5f5f5",
		fontWeight: "900",
	},
});
