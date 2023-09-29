import {
	StyleSheet,
	Linking,
	ScrollView,
	View,
	Text,
	ActivityIndicator,
	Pressable,
	TouchableOpacity,
	TouchableHighlight,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { setChapterSelected } from "../../features/globalData/globalDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { ProgressBar } from "react-native-paper";
import axios from "axios";
import QuizModal from "../../components/QuizModal/QuizModal";
import quizJSON from "./test.json";

const BibleScreen = () => {
	//global state getter
	const bibleState = useSelector((state) => state.globalData.bibleData);

	//global state setter
	const dispatch = useDispatch();

	//nav
	const route = useRoute();
	const navigation = useNavigation();

	//receive testament inidex, book index & chapter number from ChooseChapterScreen
	const testamentIndex = route.params?.testamentIndex;
	const bookIndex = route.params?.bookIndex;
	const bookName = route.params?.bookName;
	const chapterNum = route.params?.chapter;
	const chapterIndex = chapterNum - 1;

	//current chapter completed status
	const isCurrentChapterCompleted =
		bibleState[testamentIndex].books[bookIndex].chapters[chapterIndex]
			.completed;

	//local state
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
					"indent-poetry": true,
					"indent-poetry-lines": 3,
					"indent-declares": 3,
					"indent-psalm-doxology": 0,
					"line-length": 0,
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
			//remove extra line breaks in the text:
			const noInnerBreaks = textString.replace(/\n\s+\n/g, "\n\n");
			const modifiedText = noInnerBreaks.replace(/\n+$/, "");

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
			const superScripted = replaceWithSuperscript(modifiedText);
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

	function OpenURLButton({ url }) {
		const handlePress = async () => {
			// Check if the device can open the given URL
			const supported = await Linking.canOpenURL(url);

			if (supported) {
				// Open the URL
				await Linking.openURL(url);
			} else {
				console.error(`Don't know how to open URL: ${url}`);
			}
		};

		return (
			<Pressable onPress={handlePress}>
				<Text
					style={[
						styles.text,
						{
							fontWeight: "700",
							fontSize: 18,
							padding: 0,
							paddingBottom: 30,
							textAlign: "center",
						},
					]}>
					Learn More
				</Text>
			</Pressable>
		);
	}

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
									{ position: "relative", top: 0, left: 0 },
									isCurrentChapterCompleted && { color: "rgb(250, 250, 125)" },
								]}
								onTextLayout={(event) => onTextLayout(event)}>
								{response}
							</Text>
							{!isCurrentChapterCompleted &&
								(highlightedText == [] ? null : (
									<View style={{ position: "absolute", top: 0, left: 0 }}>
										<Text
											style={[styles.text, { color: "rgb(250, 250, 125)" }]}>
											{highlightedText}
										</Text>
									</View>
								))}
						</View>
						<View>
							<Text
								style={{
									color: "grey",
									textAlign: "center",
									fontSize: 12,
									padding: 8,
								}}>
								ESV brought to you by Crossway / Good News Publishers {"\n"}The
								Holy Bible, English Standard Version®(ESV®), copyright © 2001
								by Crossway, a publishing ministry of Good News Publishers. Sign
								up to receive news and updates about the ESV:
							</Text>
							<OpenURLButton url="https://mailchi.mp/23d38157d688/dfka2d5wyd" />
							{isCurrentChapterCompleted ? (
								<Text
									style={[
										styles.completeButtonText,
										{ color: "#DFB01C", marginBottom: 24, fontSize: 20 },
									]}>
									Chapter Completed!
								</Text>
							) : (
								<Pressable
									onPressIn={handleCompletePressIn}
									onPress={shouldRenderPressable ? handleModalToggle : null}
									onPressOut={handleCompletePressOut}
									style={[
										styles.completeButtonPressable,
										completeButtonFinishedStyle,
										completeButtonPressedIn,
									]}>
									<Text style={styles.completeButtonText}>Take Quiz</Text>
								</Pressable>
							)}
							{nextChapterExists && (
								<TouchableHighlight
									style={[styles.completeButtonPressable]}
									activeOpacity={0.8}
									underlayColor="#695DDA"
									onPress={handleNextChapterPress}>
									<Text style={styles.completeButtonText}>Next Chapter</Text>
								</TouchableHighlight>
							)}
						</View>
					</ScrollView>
				)}
			</View>
			{modalOpen && (
				<QuizModal
					modalOpen={modalOpen}
					modalToggle={handleModalToggle}
					QuizData={quizJSON}
					numOfVerses={numOfVerses}
					testamentIndex={testamentIndex}
					bookIndex={bookIndex}
					chapterIndex={chapterIndex}
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
		fontSize: 20,
		fontWeight: "400",
		letterSpacing: 0.3,
		lineHeight: 32,
		padding: 16,
	},
	heading: {
		color: "#f5f5f5",
		textAlign: "center",
		padding: 12,
		fontSize: 24,
		fontWeight: "800",
	},
	completeButtonPressable: {
		marginBottom: 30,
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
