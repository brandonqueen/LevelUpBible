import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import graphic from "../../../assets/Images/Logo.png";
import Reward from "../../components/Reward/Reward";
import { useSelector } from "react-redux";

const HomeScreen = () => {
	const userProgress = useSelector((state) => state.globalData);
	console.log(userProgress);
	const points = userProgress.stats.totalPoints;
	const chapters = userProgress.stats.numChaptersCompleted;

	return (
		<ScrollView style={styles.root}>
			<View style={styles.topBar}>
				<Image source={graphic} style={styles.graphic} />
			</View>
			<View style={styles.mainContent}>
				<View style={styles.progressContainer}>
					<Text style={styles.headers}>YOUR PROGRESS</Text>
					<Text
						style={{
							fontSize: 20,
							fontWeight: "800",
							color: "white",
							textAlign: "center",
							margin: 20,
						}}>
						You have {points} points
					</Text>
					<Text
						style={{
							fontSize: 20,
							fontWeight: "800",
							color: "white",
							textAlign: "center",
							margin: 20,
						}}>
						You have read {chapters} chapters
					</Text>
				</View>
				<Text style={styles.headers}>REWARDS</Text>
				<View style={styles.rewardsContainer}>{/* Rewards go here! */}</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	topBar: {
		height: "12%",
		width: "100%",
		marginTop: 8,
		marginBottom: 16,
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
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		marginBottom: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	headers: {
		fontSize: 30,
		fontWeight: "900",
		textAlign: "center",
		color: "#f5f5f5",
	},
});

export default HomeScreen;
