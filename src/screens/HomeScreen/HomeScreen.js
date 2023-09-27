import { StyleSheet, Text, View, Image } from "react-native";
import progressCircle from "../../../assets/Images/progress_circle.png";
import bibleMeters from "../../../assets/Images/Bible_Meters.png";
import dummyFriends from "../../../assets/Images/dummy_friends.png";
import graphic from "../../../assets/Images/Logo.png";

const HomeScreen = () => {
	return (
		<View style={styles.root}>
			<View style={styles.topBar}>
				<Image source={graphic} style={styles.graphic} />
			</View>
			<View style={styles.mainContent}>
				<View style={styles.progressContainer}>
					<Text style={styles.headers}>YOUR PROGRESS</Text>
				</View>
				<View style={styles.rewardsContainer}>
					<Text style={styles.headers}>REWARDS</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	topBar: {
		height: "12%",
		width: "100%",
		marginVertical: 8,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	graphic: {
		height: "100%",
		flex: 1,
		objectFit: "contain",
	},
	mainContent: {
		flex: 1,
		margin: 8,
	},
	progressContainer: {
		flex: 1,
	},
	rewardsContainer: {
		flex: 3,
		marginBottom: 20,
	},
	headers: {
		fontSize: 30,
		fontWeight: "900",
		textAlign: "center",
		color: "#f5f5f5",
	},
});

export default HomeScreen;
