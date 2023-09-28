import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import graphic from "../../../assets/Images/Logo.png";
import { useSelector } from "react-redux";

const HomeScreen = () => {
	const userProgress = useSelector((state) => state.globalData.userProgress);
	const points = userProgress.stats.totalPoints;
	const chapters = userProgress.stats.numChaptersCompleted;

	return (
		<View style={styles.root}>
			<View style={styles.topBar}>
				<Image source={graphic} style={styles.graphic} />
			</View>
			<ScrollView style={styles.mainContent}>
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
			</ScrollView>
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
		flexDirection: "column",
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
