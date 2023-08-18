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
				<View style={styles.middleContentContainers}>
					<View style={styles.topFriends}>
						<Text style={styles.headers}>TOP FRIENDS</Text>
						<Image source={dummyFriends} style={styles.dummyFriends} />
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
		flex: 8,
		marginTop: 10,
	},
	topFriends: {
		marginTop: 10,
		overflow: "hidden",
	},
	graphLayout: {
		padding: 10,
		flexDirection: "row",
		flex: 1,
		overflow: "hidden",
	},
	progressBarTextContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	headers: {
		fontSize: 30,
		fontWeight: "900",
		textAlign: "center",
		color: "#f5f5f5",
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
		flex: 1.5,
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
	dummyFriends: {
		height: "85%",
		width: "95%",
		left: 22,
		resizeMode: "contain",
		justifyContent: "center"
	},
});

export default HomeScreen;
