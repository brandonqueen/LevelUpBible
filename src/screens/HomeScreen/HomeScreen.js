import { StyleSheet, Text, View, Image } from "react-native";
import HeadNav from "../../components/HeadNav";
import FootNav from "../../components/FootNav/FootNav";

import progressCircle from "../../../assets/Images/progress_circle.png";
import bibleMeters from "../../../assets/Images/Bible_Meters.png";
import dummyFriends from "../../../assets/Images/dummy_friends.png";

const HomeScreen = () => {
	return (
		<View style={styles.root}>
			<HeadNav />
			<View style={styles.middleContent}>
				<View style={styles.middleContentContainers}>
					<Text style={styles.headers}>YOUR PROGRESS</Text>
					<View style={styles.yourProgress}>
						<View style={styles.graphLayout}>
							<View style={styles.progressBarTextContainer}>
								<Text style={styles.progressBarText}>OT</Text>
								<Text style={styles.progressBarText}>NT</Text>
							</View>
							<Image source={bibleMeters} style={styles.progressBars} />
						</View>
						<View style={styles.graphLayout}>
							<Text style={styles.progressCircleText}>WHOLE BIBLE</Text>
							<Image source={progressCircle} style={styles.progressCircle} />
						</View>
					</View>
				</View>
				<View style={styles.middleContentContainers}>
					<View style={styles.topFriends}>
						<Text style={styles.headers}>TOP FRIENDS</Text>
					</View>
				</View>
			</View>
			<FootNav />
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		margin: 5,
		flex: 1,
	},
	middleContent: {
		flex: 9,
	},
	middleContentContainers: {
		flex: 1,
		padding: 10,
		paddingTop: 20,
	},
	yourProgress: {
		flex: 1,
		marginTop: 10,
	},
	topFriends: {
		marginTop: 10,
	},
	graphLayout: {
		padding: 10,
		flexDirection: "row",
		flex: 1,
		overflow: "hidden",
	},
	headers: {
		fontSize: 30,
		fontWeight: "900",
		textAlign: "center",
		color: "#f5f5f5",
	},
	progressBarTextContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	progressBarText: {
		color: "lightgray",
		fontWeight: "900",
		fontSize: 23,
	},
	progressBars: {
		height: "100%",
		width: "100%",
		alignItems: "center",
		resizeMode: "contain",
		flex: 3,
	},
	progressCircleText: {
		color: "lightgray",
		fontWeight: "900",
		fontSize: 23,
		padding: 2,
		flex: 2,
		alignSelf: "center",
		textAlign: "center",
	},
	progressCircle: {
		height: "100%",
		width: "100%",
		resizeMode: "contain",
		alignSelf: "center",
		flex: 1,
	},
});

export default HomeScreen;
