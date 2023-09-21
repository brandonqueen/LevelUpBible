import {
	StyleSheet,
	ScrollView,
	View,
	Text,
	ActivityIndicator,
	Pressable,
	TouchableOpacity,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import OpenAI from "openai";
import AIQuizModal from "../../components/AIQuizModal/AIQuizModal";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ProgressBar } from "react-native-paper";
import QuizData from "./test.json";

const BibleScreen = () => {
	//nav
	const route = useRoute();
	const navigation = useNavigation();

	//receive book & chapter number from ChooseChapterScreen
	const book = route.params?.book;
	const chapterNum = route.params?.chapterNum;

	// refs
	const scrollPosition = useRef({}).current;

	//local state
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [response, setResponse] = useState([]);
	const [selectedPassage, setSelectedPassage] = useState("Genesis 1");
	const [scrollY, setScrollY] = useState(0);
	const [shouldRenderPressable, setShouldRenderPressable] = useState(false);
	const [completeButtonFinishedStyle, setCompleteButtonFinishedStyle] =
		useState({});
	const [completeButtonPressedIn, setCompleteButtonPressedIn] = useState({});
	const [modalOpen, setModalOpen] = useState(false);
	const [highlightedId, setHighlightedId] = useState(null);

	let quizJSON;

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
					const textString = res?.data?.passages.toString();
					const wordArray = textString.split(/(\w+\s+)/g).filter(Boolean);
					setResponse(wordArray);
				})
				.catch((error) => {
					setIsLoading(false);
					setError(error);
				});
		}
	}, [selectedPassage]);

	///attempt to get AI Quiz Responses
	// useEffect(() => {
	// 	const openAiApiKey = "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";
	// 	const openai = new OpenAI({ apiKey: openAiApiKey });
	// 	const prompt = `Generate 3 easy multiple-choice  questions, each with 4 possible answers, to check for reading comprehension for ${selectedPassage}. Return the response in JSON in the following shape: {"questions":[{"question":QUESTION,"options":["A) [OPTION 1]","B) [OPTION 2]","C) [OPTION 3]","D) [OPTION 4]"]},],"correct_answer":{"text": "C) [CORRECT ANSWER TEXT]","verse": "[VERSE FROM WHICH ANSWER WAS TAKEN]"}},`;

	// 	// async function chat() {
	// 	// 	const completion = await openai.chat.completions.create({
	// 	// 		model: "gpt-3.5-turbo",
	// 	// 		temperature: 0.5,
	// 	// 		max_tokens: 1024,
	// 	// 		messages: [{ role: "user", content: "Say this is a test" }],
	// 	// 	});
	// 	// 	console.log(completion);
	// 	// }

	// 	async function callOpenAI() {
	// 		if (selectedPassage !== "")
	// 			try {
	// 				const response = await axios({
	// 					method: "POST",
	// 					url: "https://api.openai.com/v1/chat/completions",
	// 					data: {
	// 						model: "gpt-3.5-turbo",
	// 						messages: [
	// 							{
	// 								role: "user",
	// 								content: prompt,
	// 							},
	// 						],
	// 						temperature: 0.2,
	// 					},
	// 					headers: {
	// 						"Content-Type": "application/json",
	// 						Authorization: `Bearer ${openAiApiKey}`,
	// 					},
	// 				});

	// 				quizJSON = response.data.choices[0].message.content;
	// 				console.log(quizJSON);
	// 			} catch (error) {
	// 				console.error("Axios error: ", error);

	// 				if (error.response) {
	// 					console.error("HTTP Status: ", error.response.status);
	// 					console.error("Response Data: ", error.response.data);
	// 				}
	// 			}
	// 	}

	// 	callOpenAI();
	// }, [selectedPassage]);

	const handleScroll = (event) => {
		// Progress Bar Logic
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

		// // Highlighting Logic
		// const scrollOffset = event.nativEvent.contentOffset.y;
		// let idToHighlight = null;
		// for (const id in scrollPosition) {
		// 	const position = scrollPosition[id];
		// 	if (
		// 		scrollOffset >= position.y &&
		// 		scrollOffset < position.y + position.height
		// 	) {
		// 		idToHighlight = id;
		// 		break;
		// 	}
		// }
		// setHighlightedId(idToHighlight);
	};

	// const onTextLayout = (event) => {
	// 	const lines = event?.nativeEvent.lines;
	// 	console.log("Text event", lines);
	// };

	const handleCompletePressIn = () => {
		setCompleteButtonPressedIn({
			backgroundColor: "#f0cd51",
			borderColor: "#f0cd51",
		});
	};

	const handleCompletePressOut = () => {
		setCompleteButtonPressedIn(null);
	};

	const handleCompletePress = () => {
		alert(`AI Quiz Goes Here To Verify Chapter Completion`);
	};

	const handleModalToggle = () => {
		setModalOpen(!modalOpen);
	};

	return (
		<View style={styles.root}>
			<View style={styles.header}>
				<TouchableOpacity
					onPress={() =>
						navigation.navigate("ChooseChapter", { prevScreen: "BibleScreen" })
					}
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
					}}></View>
			</View>
			<View style={styles.card}>
				{isLoading ? (
					<ActivityIndicator size="large" style={{ alignSelf: "center" }} />
				) : (
					<ScrollView
						style={styles.scroll}
						onScroll={handleScroll}
						scrollEventThrottle={16}>
						<Text style={styles.heading}>{selectedPassage}</Text>
						{/* <View style={styles.passageContainer}>
							{response.map((word) => {
								return (
									<Text
										style={styles.text}
										onTextLayout={(event) => onTextLayout(event)}>
										{word}
									</Text>
								);
							})}
						</View> */}
						<Text
							style={styles.text}
							// onTextLayout={(event) => onTextLayout(event)}
						>
							{response}
						</Text>
						<Pressable
							onPressIn={handleCompletePressIn}
							onPress={shouldRenderPressable ? handleModalToggle : null}
							onPressOut={handleCompletePressOut}
							style={[
								styles.completeButtonPressable,
								completeButtonFinishedStyle,
								completeButtonPressedIn,
							]}>
							<Text style={styles.completeButtonText}>Complete</Text>
						</Pressable>
					</ScrollView>
				)}
			</View>
			{modalOpen && (
				<AIQuizModal
					modalOpen={modalOpen}
					modalToggle={handleModalToggle}
					QuizData={QuizData}
				/>
			)}
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
	passageContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	text: {
		color: "#f5f5f5",
		fontSize: 22,
		fontWeight: "400",
		letterSpacing: 0.3,
		lineHeight: 32,
		//marginBottom: 60,
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
	completeButtonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "800",
		textAlign: "center",
		padding: 16,
	},
	modalQuestionContainer: {
		flex: 1,
		padding: 10,
	},
	modalQuestionText: {
		color: "#f5f5f5",
		fontWeight: "600",
		fontSize: 22,
	},
	modalChoicesContainer: {
		flex: 1,
		padding: 10,
	},
	modalChoiceContainer: {
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "#695DDA",
		backgroundColor: "rgba(11,14,29, .6)",
		borderRadius: 8,
		padding: 12,
		marginVertical: 8,
	},
	modalButtonsContainer: {
		backgroundColor: "yellow",
		flexDirection: "row",
	},
});
