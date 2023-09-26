import {
	StyleSheet,
	ScrollView,
	View,
	Text,
	ActivityIndicator,
	Pressable,
	TouchableOpacity,
	Button,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { setChapterSelected } from "../../features/bibleSlice/bibleSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { ProgressBar } from "react-native-paper";
import axios from "axios";
import AIQuizModal from "../../components/AIQuizModal/AIQuizModal";
import quizJSON from "./test.json";

const BibleScreen = () => {
	//global state getter
	const bibleState = useSelector((state) => state.bibleData);

	//global state setter
	const dispatch = useDispatch();

	//nav
	const route = useRoute();
	const navigation = useNavigation();

	//receive testament inidex, book index & chapter number from ChooseChapterScreen
	const testamentIndex = route.params?.testamentIndex;
	const bookIndex = route.params?.bookIndex;
	const bookName = route.params?.bookName;
	const chapterNumInitial = route.params?.chapter;

	//local state
	const [chapterNum, setChapterNum] = useState(chapterNumInitial);
	const [nextChapterExists, setNextChapterExists] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	const [response, setResponse] = useState("");
	const [numOfVerses, setNumOfVerses] = useState(null);
	const [highlightedText, setHighlightedText] = useState([]);
	const [linesData, setLinesData] = useState([]);
	const [scrollY, setScrollY] = useState(0);
	const [shouldRenderPressable, setShouldRenderPressable] = useState(false);
	const [completeButtonFinishedStyle, setCompleteButtonFinishedStyle] =
		useState({});
	const [completeButtonPressedIn, setCompleteButtonPressedIn] = useState({});
	const [modalOpen, setModalOpen] = useState(false);

	//API call
	const fetchData = async () => {
		try {
			const passage = () => {
				if (
					bibleState[testamentIndex]?.books[bookIndex]?.chapters.length === 1
				) {
					return bookName;
				} else {
					return `${bookName}${chapterNum}`;
				}
			};
			const response = await axios({
				method: "get",
				url: "https://api.esv.org/v3/passage/text/",
				params: {
					q: passage(),
					"include-passage-references": false,
					"include-short-copyright": false,
					"include-verse-numbers": true,
					"include-footnotes": false,
					"include-headings": false,
					"indent-paragraphs": 0,
				},
				headers: {
					Authorization: "Token f636017b5f40767318894388ecec11f031f2efc6",
				},
			});

			const verseRange = response?.data?.passage_meta[0]?.chapter_end;

			if (verseRange && verseRange.length > 1) {
				const endVerseArray = verseRange[1];
				const last3Digits = parseInt(String(endVerseArray).slice(-3), 10);
				setNumOfVerses(last3Digits);
			}

			setIsLoading(false);
			const textString = response?.data?.passages.toString();

			//superscripting logic
			function replaceWithSuperscript(inputString) {
				// Use regular expression to find and replace text within brackets
				const result = inputString.replace(/\[(\d+)\]/g, (_, number) => {
					// Convert the matched number to a superscripted Unicode version
					const superscriptedNumber = number
						.split("")
						.map((digit) => {
							const superscriptDigits = "⁰¹²³⁴⁵⁶⁷⁸⁹";
							return superscriptDigits[digit];
						})
						.join("");
					return superscriptedNumber;
				});

				return result;
			}
			const superScripted = replaceWithSuperscript(textString);
			setResponse(superScripted);
		} catch (error) {
			setIsLoading(false);
			setError(error);
			error && console.log(error);
		}
	};

	// //Update onChange
	useEffect(() => {
		const nextChapterNumIndex = chapterNum;
		if (
			bibleState[testamentIndex]?.books[bookIndex]?.chapters[
				nextChapterNumIndex
			]
		) {
			setNextChapterExists(true);
		} else {
			setNextChapterExists(false);
		}
		fetchData();
	}, [chapterNum]);

	const onTextLayout = (event) => {
		const lines = event?.nativeEvent.lines;
		setLinesData(lines);
	};

	const scrollViewRef = useRef(null);

	const handleScroll = (event) => {
		// Progress Bar Logic
		const offsetY = event.nativeEvent.contentOffset.y; //dynamic: how far, in pixels, you have scrolled vertically
		const contentHeight = event.nativeEvent.contentSize.height; //static: size, in pixels, of the content (visible and invisible) contained in the ScrollView
		const scrollViewHeight = event.nativeEvent.layoutMeasurement.height; //static: visible height, in pixels, of ScrollView container

		const scrollProgress = offsetY / (contentHeight - scrollViewHeight);
		setScrollY(scrollProgress);

		if (contentHeight - offsetY - scrollViewHeight > 15) {
			setShouldRenderPressable(false);
			setCompleteButtonFinishedStyle({});
		} else if (contentHeight - offsetY - scrollViewHeight <= 15) {
			setTimeout(() => {
				setShouldRenderPressable(true);
				setCompleteButtonFinishedStyle({
					backgroundColor: "#DFB01C",
					borderColor: "#DFB01C",
				});
			}, 500);
		}

		//Take lines data and find which are out of view
		const linesOutOfViewRaw = linesData.filter((line) => {
			const lineYStart = line.y;
			const lineYEnd = lineYStart + line.height;
			return line && lineYEnd < offsetY;
		});

		//extract just the text from the raw data for lines out of view
		linesOutOfViewText = linesOutOfViewRaw.map((line) => line.text);

		//function to compare array in state with array of text out of view
		function isArrayContained(array1, array2) {
			// Convert both arrays to sets for efficient comparison
			const set1 = new Set(array1);
			const set2 = new Set(array2);
			// Check if all elements in array1 are present in array2
			for (const item of set1) {
				if (!set2.has(item)) {
					return false;
				}
			}
			return true;
		}

		// Highlighted Text Logic
		if (scrollProgress < 1) {
			if (!highlightedText) {
				setHighlightedText(linesOutOfViewText);
			} else if (isArrayContained(highlightedText, linesOutOfViewText)) {
				setHighlightedText(linesOutOfViewText);
			} else {
				return;
			}
		}
		if (contentHeight - offsetY - scrollViewHeight <= 15) {
			setHighlightedText(response);
		}
	};

	const handleCompletePressIn = () => {
		setCompleteButtonPressedIn({
			backgroundColor: "#f0cd51",
			borderColor: "#f0cd51",
		});
	};

	const handleCompletePressOut = () => {
		setCompleteButtonPressedIn(null);
	};

	const handleModalToggle = () => {
		setModalOpen(!modalOpen);
	};

	const handleNextChapterPress = () => {
		const nextChapterNum = chapterNum + 1;

		if (nextChapterExists) {
			dispatch(
				setChapterSelected({
					testamentIndex: testamentIndex,
					bookIndex: bookIndex,
					chapterNum: nextChapterNum,
				})
			);
			navigation.replace("Bible", {
				testamentIndex: testamentIndex,
				bookIndex: bookIndex,
				bookName: bookName,
				chapter: nextChapterNum,
			});
		}
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
						ref={scrollViewRef}
						style={styles.scroll}
						onScroll={handleScroll}
						scrollEventThrottle={16}>
						<Text style={styles.heading}>{`${bookName} ${chapterNum}`}</Text>
						<View>
							<Text
								style={[
									styles.text,
									{ position: "relative", flex: 1, top: 0, left: 0 },
								]}
								onTextLayout={(event) => onTextLayout(event)}>
								{response}
							</Text>
							{highlightedText == [] ? null : (
								<View
									style={{ position: "absolute", flex: 1, top: 0, left: 0 }}>
									<Text
										style={[styles.text, { color: "rgba(250, 250, 125, .7)" }]}>
										{highlightedText}
									</Text>
								</View>
							)}
						</View>
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
						{nextChapterExists && (
							<Button
								title="Next Chapter"
								onPress={() => handleNextChapterPress()}
							/>
						)}
					</ScrollView>
				)}
			</View>
			{modalOpen && (
				<AIQuizModal
					modalOpen={modalOpen}
					modalToggle={handleModalToggle}
					QuizData={quizJSON}
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
		paddingHorizontal: 8,
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
		padding: 16,
		flexDirection: "row",
		flexWrap: "wrap",
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
