import {
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import {
	useSharedValue,
	withTiming,
	Easing,
	useDerivedValue,
} from "react-native-reanimated";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { ReText } from "react-native-redash";
import HomeRewardsRender from "../../components/molecules/HomeRewardsRender/HomeRewardsRender";
import CircularProgress from "react-native-circular-progress-indicator";
import graphic from "../../../assets/Images/Logo.png";
import colors from "../../constants/colors";

const HomeScreen = () => {
	//NAVIGATION
	const navigation = useNavigation();
	const isFocused = useIsFocused();

	//GLOBAL STATE
	const userProgress = useSelector((state) => state.globalData.userProgress);
	const points = userProgress.stats.totalPoints;
	const chapters = userProgress.stats.numChaptersCompleted;
	const books = userProgress.stats.numBooksCompleted;
	const rewards = userProgress.rewards;
	const recentEarnedRewards = userProgress.recentEarnedRewards;

	//DATA TO CALCULATE BIBLE READING PROGRESS
	const bibleChapterNumber = 1189;
	const bibleBookNumber = 66;
	const chapterPercentage = Math.ceil((chapters / bibleChapterNumber) * 100);
	const bookPercentage = Math.ceil((books / bibleBookNumber) * 100);

	///BEGIN ANIMATION LOGIC (chapter percentages and points ticker)
	const chapProgressRef = useRef(0);
	const bookProgressRef = useRef(0);
	const pointsValueAnim = useSharedValue(0);
	const pointsText = useDerivedValue(() => {
		return Math.ceil(pointsValueAnim.value).toLocaleString();
	});

	//start animation on screen focus
	useEffect(() => {
		if (isFocused) {
			chapProgressRef.current.reAnimate();
			bookProgressRef.current.reAnimate();
			pointsValueAnim.value = 0;
			pointsValueAnim.value = withTiming(points, {
				duration: 1100,
				easing: Easing.inOut(Easing.quad),
			});
		} else {
			pointsValueAnim.value = 0;
		}
	}, [isFocused, pointsValueAnim]);
	/// END ANIMATION LOGIC

	//PRESS HANDLERS
	const handleProgressPress = () => {
		navigation.navigate("BIBLE");
	};

	const handleRewardPressed = () => {
		navigation.navigate("REWARDS");
	};

	return (
		<ScrollView contentContainerStyle={styles.root}>
			<View style={styles.topBar}>
				<Image source={graphic} style={styles.graphic} />
			</View>
			<View style={styles.mainContent}>
				<View style={styles.progressSectionContainer}>
					<Text style={styles.progressHeader}>YOUR PROGRESS</Text>
					<TouchableOpacity
						style={styles.pointsContainer}
						onPress={handleProgressPress}
						activeOpacity={0.7}>
						<ReText style={styles.pointsText} text={pointsText} />
						<Text style={styles.pointsText}>POINTS</Text>
					</TouchableOpacity>
					<View style={styles.progressCirclesContainer}>
						<TouchableOpacity
							style={styles.progressCircleContainer}
							onPress={handleProgressPress}
							activeOpacity={0.7}>
							<CircularProgress
								ref={chapProgressRef}
								value={chapterPercentage}
								radius={52}
								duration={900}
								progressValueColor={colors.secondary}
								activeStrokeColor={colors.secondaryLight}
								inActiveStrokeColor={colors.secondaryDark}
								circleBackgroundColor={colors.primaryDark}
								maxValue={100}
								valueSuffix={"%"}
							/>
							<Text style={styles.chapterInfoUnderCircle}>
								{chapters} / 1,189{"\n"}Chapters
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.progressCircleContainer}
							onPress={handleProgressPress}
							activeOpacity={0.7}>
							<CircularProgress
								ref={bookProgressRef}
								value={bookPercentage}
								radius={52}
								duration={900}
								progressValueColor={colors.quarternary}
								activeStrokeColor={colors.quarternaryLight}
								inActiveStrokeColor={colors.quarternaryDark}
								circleBackgroundColor={colors.primaryDark}
								maxValue={100}
								valueSuffix={"%"}
							/>
							<Text style={styles.bookInfoUnderCircle}>
								{books} / 66{"\n"}Books
							</Text>
						</TouchableOpacity>
					</View>
				</View>
				<Text style={styles.rewardsHeader}>
					{recentEarnedRewards.length < 1 ? "NEXT REWARD" : "RECENT REWARDS"}
				</Text>
				<View style={styles.rewardsSectionContainer}>
					<View style={styles.rewardsContainer}>
						<HomeRewardsRender
							recentEarnedRewards={recentEarnedRewards}
							rewards={rewards}
						/>
					</View>
					<TouchableOpacity activeOpacity={0.7} onPress={handleRewardPressed}>
						<Text style={styles.viewMore}>view more</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 0,
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
	progressSectionContainer: {
		flex: 0,
	},
	progressHeader: {
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
		borderColor: colors.tertiaryDark,
		margin: 8,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.primaryDarkTranslucent,
	},
	pointsText: {
		fontWeight: "900",
		fontSize: 20,
		color: colors.tertiaryLight,
		textAlign: "center",
	},
	progressCirclesContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	progressCircleContainer: {
		flexDirection: "column",
		alignItems: "center",
	},
	chapterPercentageText: {
		fontWeight: "900",
		fontSize: 16,
		color: "#695DDA",
		textAlign: "center",
		padding: 8,
	},
	chapterInfoUnderCircle: {
		fontWeight: "700",
		fontSize: 18,
		color: colors.secondaryLighter,
		textAlign: "center",
		padding: 8,
		letterSpacing: 0.1,
	},
	bookPercentageText: {
		fontWeight: "900",
		fontSize: 16,
		color: colors.quarternary,
		textAlign: "center",
		padding: 8,
	},
	bookInfoUnderCircle: {
		fontWeight: "700",
		fontSize: 18,
		color: colors.quarternary,
		textAlign: "center",
		padding: 8,
		letterSpacing: 0.1,
	},
	rewardsHeader: {
		fontSize: 30,
		fontWeight: "900",
		textAlign: "center",
		color: colors.text,
		marginBottom: 10,
		marginTop: 30,
	},
	rewardsSectionContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	rewardsContainer: {
		width: "95%",
		flex: 0.95,
		flexDirection: "column",
		borderWidth: 2,
		borderRadius: 20,
		borderColor: colors.tertiaryDark,
		backgroundColor: colors.primaryDarkTranslucent,
	},
	viewMore: {
		fontWeight: "800",
		fontSize: 18,
		color: colors.textGrey,
		textAlign: "center",
		padding: 10,
	},
});

export default HomeScreen;
