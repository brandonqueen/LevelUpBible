import { StyleSheet, Text, Pressable, Image, View } from "react-native";

const Reward = ({ reward, openDescription }) => {
	return (
		<View style={styles.container}>
			<Pressable style={styles.pressable} onPress={openDescription}>
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
});
