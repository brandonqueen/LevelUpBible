import {
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import graphic from "../../../assets/Images/Logo.png";
import { useSelector } from "react-redux";
import ProgressCircle from "react-native-progress-circle";
import { useNavigation } from "@react-navigation/native";
import Reward from "../../components/Reward/Reward";

const HomeScreen = () => {
	const navigation = useNavigation();

	const userProgress = useSelector((state) => state.globalData.userProgress);
	const points = userProgress.stats.totalPoints;
	const chapters = userProgress.stats.numChaptersCompleted;
	const books = userProgress.stats.numBooksCompleted;
	const rewards = userProgress.rewards;
	const recentEarnedRewards = userProgress.recentEarnedRewards;

	const bibleChapterNumber = 1189;
	const bibleBookNumber = 66;
	const chapterPercentage = Math.ceil(chapters / bibleChapterNumber);
	const bookPercentage = Math.ceil(books / bibleBookNumber);

	const handleProgressPress = () => {
		navigation.navigate("BIBLE");
	};

	const RewardsRender = () => {
		if (recentEarnedRewards.length < 1) {
			return <Reward reward={rewards[0]} />;
		} else {
			if (recentEarnedRewards.length <= 3) {
				const reversedArray = recentEarnedRewards.slice().reverse();
				return reversedArray.map((recentReward) => {
					const index = rewards.findIndex((obj) => obj.title === recentReward);
					return (
						<Pressable>
							<Reward reward={rewards[index]} />
						</Pressable>
					);
				});
			} else {
				const reversedTrimmedArray = recentEarnedRewards.slice(-3).reverse();
				return reversedTrimmedArray.map((recentReward) => {
					const index = rewards.findIndex((obj) => obj.title === recentReward);
					return <Reward reward={rewards[index]} />;
				});
			}
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.root}>
			<View style={styles.topBar}>
				<Image source={graphic} style={styles.graphic} />
			</View>
			<View style={styles.mainContent}>
				<View style={styles.progressContainer}>
					<Text style={styles.headers}>YOUR PROGRESS</Text>
					<TouchableOpacity
						style={styles.pointsContainer}
						onPress={handleProgressPress}
						activeOpacity={0.7}>
						<Text style={styles.pointsText}>
							{points}
							{"\n"}POINTS
						</Text>
					</TouchableOpacity>
					<View style={styles.percentageContainer}>
						<TouchableOpacity
							style={{ flexDirection: "column", alignItems: "center" }}
							onPress={handleProgressPress}
							activeOpacity={0.7}>
							<ProgressCircle
								percent={chapterPercentage}
								radius={52}
								borderWidth={8}
								color="#6151fc"
								shadowColor="#393091"
								bgColor="rgb(11,14,29)">
								<Text style={styles.chapterPercentageText}>
									{chapterPercentage}%
								</Text>
							</ProgressCircle>
							<Text style={styles.chapterUnderText}>
								{chapters} / 1,189{"\n"}Chapters
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{ flexDirection: "column", alignItems: "center" }}
							onPress={handleProgressPress}
							activeOpacity={0.7}>
							<ProgressCircle
								percent={bookPercentage}
								radius={52}
								borderWidth={8}
								color="#ff383b"
								shadowColor="#7d191b"
								bgColor="rgb(11,14,29)">
								<Text style={styles.bookPercentageText}>{bookPercentage}%</Text>
							</ProgressCircle>
							<Text style={styles.bookUnderText}>
								{books} / 66{"\n"}Books
							</Text>
						</TouchableOpacity>
					</View>
				</View>
				<Text style={[styles.headers, { marginTop: 30 }]}>
					{recentEarnedRewards.length < 1 ? "NEXT REWARD" : "RECENT REWARDS"}
				</Text>
				<TouchableOpacity
					style={styles.rewardsSectionContainer}
					activeOpacity={0.7}
					onPress={() => {
						navigation.navigate("REWARDS");
					}}>
					<View style={styles.rewardsContainer}>
						<View
							style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
							<RewardsRender />
						</View>
					</View>
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => {
							navigation.navigate("REWARDS");
						}}>
						<Text style={styles.viewMore}>view more</Text>
					</TouchableOpacity>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	topBar: {
		height: 90,
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
		flex: 0,
	},
	rewardsSectionContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	headers: {
		fontSize: 30,
		fontWeight: "900",
		textAlign: "center",
		color: "#f5f5f5",
		marginBottom: 10,
	},
	pointsContainer: {
		height: 80,
		width: 160,
		borderWidth: 3,
		borderRadius: 80,
		borderColor: "#a38b00",
		margin: 8,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(11,14,29, .6)",
	},
	pointsText: {
		fontWeight: "900",
		fontSize: 18,
		color: "rgb(255, 198, 99)",
		textAlign: "center",
		padding: 8,
	},
	percentageContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	chapterPercentageText: {
		fontWeight: "900",
		fontSize: 16,
		color: "#695DDA",
		textAlign: "center",
		padding: 8,
	},
	chapterUnderText: {
		fontWeight: "700",
		fontSize: 18,
		color: "#7162fc",
		textAlign: "center",
		padding: 8,
		letterSpacing: 0.9,
	},
	bookPercentageText: {
		fontWeight: "900",
		fontSize: 16,
		color: "#db3537",
		textAlign: "center",
		padding: 8,
	},
	bookUnderText: {
		fontWeight: "700",
		fontSize: 18,
		color: "#db3537",
		textAlign: "center",
		padding: 8,
		letterSpacing: 0.8,
	},
	rewardsContainer: {
		width: "95%",
		flex: 1,
		flexDirection: "column",
		borderWidth: 3,
		borderRadius: 20,
		borderColor: "#428799",
		backgroundColor: "rgba(11,14,29, .7)",
	},
	viewMore: {
		fontWeight: "800",
		fontSize: 18,
		color: "#d9d9d9",
		textAlign: "center",
		padding: 10,
	},
});

export default HomeScreen;
