import { StyleSheet, Text, Pressable, Image } from "react-native";

const Reward = ({ reward }) => {
	function handleRewardPress() {
		alert(`You pressed ${reward.title}`);
	}

	return (
		<Pressable
			style={styles.container}
			onPress={() => handleRewardPress(reward)}>
			<Image
				style={[styles.image, !reward.completed && { opacity: 0.5 }]}
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
	);
};

export default Reward;

const styles = StyleSheet.create({
	container: {
		width: 80,
		flexDirection: "column",
	},
	image: {
		height: 80,
		aspectRatio: 1,
	},
	text: {
		marginVertical: 8,
		textAlign: "center",
		color: "#f5f5f5",
		fontWeight: "900",
	},
});
