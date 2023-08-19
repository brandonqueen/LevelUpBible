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
				<View style={styles.yourProgressContainer}>
					<Text style={styles.headers}>YOUR PROGRESS</Text>
					<View style={styles.yourProgress}>
						<View style={styles.graphLayout}>
							<View style={styles.progressBarTextContainer}>
								<Text style={styles.progressBarText}>OT{"\n"}NT</Text>
							</View>
							<Image source={bibleMeters} style={styles.progressBars} />
						</View>
						<View style={styles.graphLayout}>
							<Text style={styles.progressCircleText}>WHOLE {"\n"}BIBLE</Text>
							<Image source={progressCircle} style={styles.progressCircle} />
						</View>
					</View>
				</View>
				<View style={styles.topFriendsContainer}>
					<Text style={styles.headers}>TOP FRIENDS</Text>
					<Image source={dummyFriends} style={styles.dummyFriends} />
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
		padding: 5,
	},
	yourProgressContainer: {
		flex: 4,
		paddingTop: 20,
	},
	topFriendsContainer: {
		flex: 3,
		marginBottom: 20,
		overflow: "hidden",
	},
	yourProgress: {
		flex: 8,
		justifyContent: "center",
	},
	graphLayout: {
		flexDirection: "row",
		padding: 5,
	},
	progressBarTextContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: 10,
	},
	headers: {
		fontSize: 30,
		fontWeight: "900",
		textAlign: "center",
		color: "#f5f5f5",
	},
	progressBarText: {
		color: "pink",
		fontWeight: "900",
		fontSize: 23,
	},
	progressBars: {
		height: "100%",
		width: "100%",
		alignSelf: "center",
		resizeMode: "contain",
		flex: 2.2,
	},
	progressCircleText: {
		color: "#695DDA",
		fontWeight: "900",
		fontSize: 25,
		paddingRight: 25,
		flex: 1.8,
		alignSelf: "center",
		textAlign: "right",
	},
	progressCircle: {
		width: 100,
		height: 100,
		resizeMode: "contain",
		alignSelf: "center",
		flex: 1,
	},
	dummyFriends: {
		height: "85%",
		width: "95%",
		left: 22,
		resizeMode: "contain",
		justifyContent: "center",
	},
});

export default HomeScreen;
