import {
	StyleSheet,
	ScrollView,
	View,
	Text,
	ActivityIndicator,
	Pressable,
	TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ProgressBar } from "react-native-paper";

const BibleScreen = () => {
	//nav
	const route = useRoute();
	const navigation = useNavigation();

	//receive book & chapter number from ChooseChapterScreen
	const book = route.params?.book;
	const chapterNum = route.params?.chapterNum;

	//state
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [response, setResponse] = useState("");
	const [selectedPassage, setSelectedPassage] = useState("Genesis 1");
	const [scrollY, setScrollY] = useState(0);
	const [shouldRenderPressable, setShouldRenderPressable] = useState(false);
	const [completeButtonFinishedStyle, setCompleteButtonFinishedStyle] =
		useState({});

	useEffect(() => {
		setSelectedPassage(book + " " + chapterNum);
		if (selectedPassage != "") {
			axios({
				method: "get",
				url: "https://api.esv.org/v3/passage/text/",
				params: {
					q: selectedPassage,
					"include-passage-references": false,
					"include-short-copyright": false,
					"include-verse-numbers": false,
					"include-footnotes": false,
					"include-headings": false,
				},
				headers: {
					Authorization: "Token f636017b5f40767318894388ecec11f031f2efc6",
				},
			})
				.then((res) => {
					setIsLoading(false);
					setResponse(res?.data?.passages);
				})
				.catch((error) => {
					setIsLoading(false);
					setError(error);
				});
		}
	}, [selectedPassage]);

	const handleScroll = (event) => {
		const offsetY = event.nativeEvent.contentOffset.y;
		const contentHeight = event.nativeEvent.contentSize.height;
		const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;

		const scrollProgress = offsetY / (contentHeight - scrollViewHeight);
		setScrollY(scrollProgress);

		if (scrollProgress < 0.01) {
			setShouldRenderPressable(false);
			setCompleteButtonFinishedStyle({});
		} else if (scrollProgress >= 1) {
			setTimeout(() => {
				setShouldRenderPressable(true);
				setCompleteButtonFinishedStyle({
					backgroundColor: "#DFB01C",
					borderColor: "#DFB01C",
				});
			}, 500);
		}
	};

	const handleCompletePress = () => {
		alert(`AI Quiz Goes Here To Verify Chapter Completion`);
	};

	return (
		<View style={styles.root}>
			<View style={styles.header}>
				<TouchableOpacity
					onPress={navigation.goBack}
					style={{
						flex: 1,
						height: "100%",
						alignItems: "flex-start",
						justifyContent: "center",
						paddingLeft: 8,
					}}>
					<FontAwesome5 name="chevron-left" size={24} color="#f5f5f5" />
				</TouchableOpacity>
				<View
					style={{
						flex: 5,
						alignItems: "center",
						justifyContent: "center",
						height: "100%",
					}}>
					<ProgressBar
						animatedValue={scrollY}
						color="#695DDA"
						style={styles.progressBar}
					/>
				</View>
				<View
					style={{
						flex: 1,
						height: "100%",
					}}>
				</View>
			</View>
			<View style={styles.card}>
				{isLoading ? (
					<ActivityIndicator size="large" style={{ alignSelf: "center" }} />
				) : (
					<ScrollView
						style={styles.scroll}
						onScroll={handleScroll}
						scrollEventThrottle={8}>
						<Text style={styles.heading}>{selectedPassage}</Text>
						<Text style={styles.text}>{response}</Text>
						<Pressable
							onPress={shouldRenderPressable ? handleCompletePress : null}
							style={[
								styles.completeButtonPressable,
								completeButtonFinishedStyle,
							]}>
							<Text style={styles.completeButtonText}>Complete</Text>
						</Pressable>
					</ScrollView>
				)}
			</View>
		</View>
	);
};

export default BibleScreen;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		width: "95%",
		flex: 0.5,
		flexDirection: "row",
	},
	progressBar: {
		height: 8,
		width: 250,
		borderRadius: 12,
	},
	card: {
		width: "95%",
		height: "95%",
		backgroundColor: "rgb(11,14,29)",
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 20,
		justifyContent: "center",
		alignItems: "center",
		flex: 9,
		marginVertical: 12,
	},
	scroll: {
		flex: 1,
	},
	text: {
		color: "#f5f5f5",
		fontSize: 22,
		fontWeight: "400",
		letterSpacing: 0.2,
		lineHeight: 30,
		marginBottom: 60,
	},
	heading: {
		color: "#f5f5f5",
		textAlign: "center",
		padding: 12,
		fontSize: 24,
		fontWeight: "800",
	},
	completeButtonPressable: {
		marginBottom: 50,
		borderRadius: 12,
		borderStyle: "solid",
		borderWidth: 2,
		borderColor: "#695DDA",
		width: "50%",
		alignSelf: "center",
	},
	completeButtonPressableCrossed: {
		backgroundColor: "#F4C01E",
		borderColor: "#F4C01E",
	},
	completeButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "800",
		textAlign: "center",
		padding: 18,
	},
});
