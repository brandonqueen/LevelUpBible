import {
	StyleSheet,
	ScrollView,
	View,
	Text,
	ActivityIndicator,
	TouchableOpacity,
	Image,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setChapterSelected } from "../../features/globalData/globalDataSlice";
import { FontAwesome5 } from "@expo/vector-icons";
import { ProgressBar } from "react-native-paper";
import { useNetInfo } from "@react-native-community/netinfo";
import { quizMap } from "../../constants/quizData/quizMap";
import StyledTextButton from "../../components/atoms/StyledTextButton/StyledTextButton";
import LearnMoreButton from "../../components/molecules/LearnMoreButton/LearnMoreButton";
import NoQuizModal from "../../components/organisms/Quiz Components/NoQuizModal/NoQuizModal";
import QuizModal from "../../components/organisms/Quiz Components/QuizModal/QuizModal";
import capybara from "../../../assets/Images/capybara.png";
import colors from "../../constants/colors";
import axios from "axios";

const BibleScreen = () => {
	//NAVIGATION
	const route = useRoute();
	const navigation = useNavigation();

	//receive testament inidex, book index & chapter number from ChooseChapterScreen
	const testamentIndex = route.params?.testamentIndex;
	const bookIndex = route.params?.bookIndex;
	const bookName = route.params?.bookName;
	const chapterNum = route.params?.chapter;
	const chapterIndex = chapterNum - 1;

	//GLOBAL STATE
	const bibleState = useSelector((state) => state.globalData.bibleData);
	const userProgress = useSelector((state) => state.globalData.userProgress);
	const dispatch = useDispatch();

	//LOCAL STATE
	const [nextChapterExists, setNextChapterExists] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const [isConnected, setIsConnected] = useState(true);
	const [error, setError] = useState("");
	const [response, setResponse] = useState("");
	const [numOfVerses, setNumOfVerses] = useState(null);
	const [highlightedText, setHighlightedText] = useState([]);
	const [linesData, setLinesData] = useState([]);
	const [scrollY, setScrollY] = useState(0);
	const [shouldRenderPressable, setShouldRenderPressable] = useState(false);
	const [quizModalOpen, setQuizModalOpen] = useState(false);
	const [noQuizModalOpen, setNoQuizModalOpen] = useState(false);

	//OTHER VARIABLES

	//get quiz data for current book and chapter
	const quizData = quizMap?.[bookName]?.chapters?.[chapterIndex] ?? null;

	//current chapter completed status
	const isCurrentChapterCompleted =
		bibleState[testamentIndex].books[bookIndex].chapters[chapterIndex]
			.completed;

	//current awards array
	const rewardsArray = userProgress.recentEarnedRewards;
	const currentRewardsArray = useRef(
		JSON.parse(JSON.stringify(rewardsArray))
	).current;

	//Get current Bible books for which quiz data exists
	const currentQuizBooks = Object.keys(quizMap).filter((bookName) => {
		const bookData = quizMap[bookName];
		return (
			bookData &&
			Array.isArray(bookData.chapters) &&
			bookData.chapters.length > 0
		);
	});

	//Variables for scroll logic (highlighting, progress bar onScroll, etc.)
	const onTextLayout = (event) => {
		const lines = event?.nativeEvent.lines;
		setLinesData(lines);
	};
	const scrollViewRef = useRef(null);

	//Check network connection
	const netInfo = useNetInfo();

	useEffect(() => {
		const timerId = setTimeout(() => {
			setIsConnected(netInfo.isConnected);
			setIsLoading(false);
		}, 1000);
		return () => clearTimeout(timerId);
	}, [netInfo]);

	///////
	/////	API CALL TO FETCH BIBLE TEXT
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

	//Load Bible text on chapter set
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
	/////
	/////// END API CALL LOGIC

	//SCROLL HANDLER
	const handleScroll = (event) => {
		// Progress Bar Logic

		//offsetY - dynamic: how far, in pixels, you have scrolled vertically
		const offsetY = event.nativeEvent.contentOffset.y;
		//contentHeight - static: size, in pixels, of the content (visible and invisible) contained in the ScrollView
		const contentHeight = event.nativeEvent.contentSize.height;
		//scrollViewHeight - static: visible height, in pixels, of ScrollView container
		const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;

		const scrollProgress = offsetY / (contentHeight - scrollViewHeight);
		setScrollY(scrollProgress);

		if (contentHeight - offsetY - scrollViewHeight > 15) {
			setShouldRenderPressable(false);
		} else if (contentHeight - offsetY - scrollViewHeight <= 15) {
			setTimeout(() => {
				setShouldRenderPressable(true);
			}, 500);
		}

		//Take lines data and find which are out of view
		const linesOutOfViewRaw = linesData.filter((line) => {
			const lineYStart = line.y;
			const lineYEnd = lineYStart + line.height;
			return line && lineYEnd < offsetY;
		});

		//extract the text (from the raw data) for lines out of view
		linesOutOfViewText = linesOutOfViewRaw.map((line) => line.text);

		//function to compare array in state with array of text "out of view"
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
	//END SCROLL HANDLER

	//Press handler functions
	const handleGoBack = () => {
		navigation.navigate("ChooseChapter", { prevScreen: "BibleScreen" });
	};

	const handleQuizModalToggle = () => {
		setQuizModalOpen(!quizModalOpen);
	};

	const handleNoQuizModalToggle = () => {
		setNoQuizModalOpen(!noQuizModalOpen);
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
				<TouchableOpacity onPress={handleGoBack} style={styles.goBackArrow}>
					<FontAwesome5 name="chevron-left" size={24} color={colors.text} />
				</TouchableOpacity>
				<View style={styles.progressBarContainer}>
					<ProgressBar
						animatedValue={scrollY}
						color={colors.secondary}
						style={styles.progressBar}
					/>
				</View>
				<View style={styles.emptyView}></View>
			</View>
			<View style={styles.card}>
				{error || !isConnected ? (
					<View style={styles.noConnectionContainer}>
						<Image source={capybara} style={styles.capybara}></Image>
						<Text style={styles.heading}>
							Please check your internet connection and try again.
						</Text>
					</View>
				) : isLoading ? (
					<ActivityIndicator size="large" style={{ alignSelf: "center" }} />
				) : (
					<ScrollView
						ref={scrollViewRef}
						style={styles.scroll}
						onScroll={handleScroll}
						showsVerticalScrollIndicator={false}
						scrollEventThrottle={16}>
						<Text style={styles.heading}>{`${bookName} ${chapterNum}`}</Text>
						<View style={styles.passageContainer}>
							<Text
								style={
									isCurrentChapterCompleted ? styles.textFinal : styles.text
								}
								onTextLayout={(event) => onTextLayout(event)}>
								{response}
							</Text>
							{!isCurrentChapterCompleted &&
								(highlightedText == [] ? null : (
									<View style={styles.highlightTextContainer}>
										<Text style={styles.highlightText}>{highlightedText}</Text>
									</View>
								))}
						</View>
						<View style={styles.bottomSection}>
							<Text style={styles.copyrightText}>
								ESV brought to you by Crossway / Good News Publishers {"\n"}The
								Holy Bible, English Standard Version®(ESV®), copyright © 2001
								by Crossway, a publishing ministry of Good News Publishers. Sign
								up to receive news and updates about the ESV:
							</Text>
							<LearnMoreButton url="https://mailchi.mp/23d38157d688/dfka2d5wyd" />
							{isCurrentChapterCompleted ? (
								<Text style={styles.completeText}>Chapter Completed!</Text>
							) : (
								<View>
									<StyledTextButton
										backgroundColor={
											shouldRenderPressable ? colors.tertiary : null
										}
										backgroundPressedColor={
											shouldRenderPressable ? colors.tertiaryLight : null
										}
										borderWidth={2}
										borderColor={
											shouldRenderPressable
												? colors.tertiary
												: colors.secondaryLight
										}
										margin={12}
										onPress={
											shouldRenderPressable
												? quizData
													? handleQuizModalToggle
													: handleNoQuizModalToggle
												: null
										}>
										Take Quiz
									</StyledTextButton>
								</View>
							)}
							{nextChapterExists && (
								<StyledTextButton
									backgroundPressedColor={colors.secondary}
									borderWidth={2}
									borderColor={colors.secondaryLight}
									margin={30}
									onPress={handleNextChapterPress}>
									Next Chapter
								</StyledTextButton>
							)}
						</View>
					</ScrollView>
				)}
			</View>
			{noQuizModalOpen && (
				<NoQuizModal
					modalOpen={noQuizModalOpen}
					modalToggle={handleNoQuizModalToggle}
					currentQuizBooks={currentQuizBooks}
					numOfVerses={numOfVerses}
					testamentIndex={testamentIndex}
					bookIndex={bookIndex}
					bookName={bookName}
					chapterIndex={chapterIndex}
					rewards={currentRewardsArray}
				/>
			)}
			{quizModalOpen && (
				<QuizModal
					modalOpen={quizModalOpen}
					modalToggle={handleQuizModalToggle}
					QuizData={quizData}
					numOfVerses={numOfVerses}
					testamentIndex={testamentIndex}
					bookIndex={bookIndex}
					bookName={bookName}
					chapterIndex={chapterIndex}
					rewards={currentRewardsArray}
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
	goBackArrow: {
		flex: 1,
		height: "100%",
		alignItems: "flex-start",
		justifyContent: "center",
		paddingLeft: 8,
	},
	text: {
		color: colors.text,
		fontSize: 20,
		fontWeight: "400",
		letterSpacing: 0.3,
		lineHeight: 32,
		padding: 16,
		position: "relative",
		top: 0,
		left: 0,
	},
	progressBarContainer: {
		flex: 5,
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
	},
	progressBar: {
		height: 8,
		width: 250,
		borderRadius: 12,
	},
	emptyView: {
		flex: 1,
		height: "100%",
	},
	card: {
		width: "95%",
		height: "95%",
		backgroundColor: colors.primaryDark,
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 20,
		justifyContent: "center",
		alignItems: "center",
		flex: 9,
		marginVertical: 12,
	},
	noConnectionContainer: {
		width: "100%",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	capybara: {
		width: 300,
		height: 300,
	},
	heading: {
		color: colors.text,
		textAlign: "center",
		padding: 12,
		fontSize: 24,
		fontWeight: "800",
	},
	scroll: {
		flex: 1,
	},
	passageContainer: {
		width: "100%",
		flex: 0,
	},
	textFinal: {
		color: colors.textHighlight,
		fontSize: 20,
		fontWeight: "400",
		letterSpacing: 0.3,
		lineHeight: 32,
		padding: 16,
		position: "relative",
		top: 0,
		left: 0,
	},
	highlightTextContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		height: "100%",
		width: "100%",
		overflow: "hidden",
	},
	highlightText: {
		color: colors.textHighlight,
		fontSize: 20,
		fontWeight: "400",
		letterSpacing: 0.3,
		lineHeight: 32,
		padding: 16,
	},
	bottomSection: {
		marginBottom: 45,
	},
	copyrightText: {
		color: colors.textGrey,
		textAlign: "center",
		fontSize: 12,
		padding: 8,
	},
	completeText: {
		fontWeight: "800",
		textAlign: "center",
		padding: 16,
		color: colors.tertiary,
		marginBottom: 24,
		fontSize: 20,
	},
});
