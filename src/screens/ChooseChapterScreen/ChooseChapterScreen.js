import {
	useNavigation,
	useIsFocused,
	useRoute,
} from "@react-navigation/native";
import {
	setTestamentSelected,
	setBookSelected,
	setChapterSelected,
	resetBibleSelection,
} from "../../features/globalData/globalDataSlice";
import { StyleSheet, View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { List } from "react-native-paper";
import ChooseChapterHeader from "../../components/molecules/ChooseChapterHeader/ChooseChapterHeader";
import colors from "../../constants/colors";
import ChaptersRender from "../../components/molecules/ChaptersRender/ChaptersRender";

const ChooseChapterScreen = () => {
	//NAVIGATION
	const navigation = useNavigation();

	//GLOBAL STATE
	const dispatch = useDispatch();
	const bibleState = useSelector((state) => state.globalData.bibleData);

	//LOCAL STATE
	const [headerTestamentChosen, setHeaderTestamentChosen] = useState(false);
	const [headerBookChosen, setHeaderBookChosen] = useState(false);

	//logic to avoid reset of selected book when navigating back from the Bible Screen
	const isFocused = useIsFocused();
	const route = useRoute();
	useEffect(() => {
		if (isFocused && route?.params?.prevScreen !== "BibleScreen") {
			dispatch(resetBibleSelection());
			handleHeaderPress(); //sets header back to testament selection
		}
		navigation.setParams({ prevScreen: "" });
	}, [isFocused]);

	//PRESS HANDLERS
	const handleTestamentPress = (index) => {
		dispatch(setTestamentSelected({ index: index }));
		setHeaderBookChosen(false);

		//handle header switching logic
		const otherTestament = bibleState.filter((_, testIndex) => {
			return testIndex !== index;
		});

		function isSelected(array) {
			return array.some((obj) => {
				return obj.selected === true;
			});
		}
		const anotherTestamentSelected = isSelected(otherTestament);

		anotherTestamentSelected
			? setHeaderTestamentChosen(true)
			: setHeaderTestamentChosen(!headerTestamentChosen);
	};

	const handleBookPress = (testamentIndex, bookIndex) => {
		dispatch(
			setBookSelected({ testamentIndex: testamentIndex, bookIndex: bookIndex })
		);

		//header switching logic
		const otherBooks = bibleState[testamentIndex].books.filter(
			(_, filteredBookIndex) => {
				return filteredBookIndex !== bookIndex;
			}
		);
		function isSelected(array) {
			return array.some((obj) => {
				return obj.selected === true;
			});
		}
		const anotherBookSelected = isSelected(otherBooks);
		anotherBookSelected
			? setHeaderBookChosen(true)
			: setHeaderBookChosen(!headerBookChosen);
	};

	const handleChapterPress = (testamentIndex, bookIndex, item) => {
		const book = bibleState[testamentIndex].books[bookIndex].bookName;
		const chapterNum = item.chapter;

		dispatch(
			setChapterSelected({
				testamentIndex: testamentIndex,
				bookIndex: bookIndex,
				chapterNum: chapterNum,
			})
		);
		navigation.navigate("Bible", {
			testamentIndex: testamentIndex,
			bookIndex: bookIndex,
			bookName: book,
			chapter: chapterNum,
		});
	};

	const handleHeaderPress = () => {
		dispatch(resetBibleSelection());
		setHeaderTestamentChosen(false);
		setHeaderBookChosen(false);
	};

	//MAIN RENDER/RETURN
	return (
		<View style={styles.root}>
			<ChooseChapterHeader
				headerBookChosen={headerBookChosen}
				headerTestamentChosen={headerTestamentChosen}
				handleHeaderPress={handleHeaderPress}
			/>
			<FlatList
				data={bibleState}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => (
					<List.Accordion
						//render testaments
						title={item.testamentName}
						style={styles.accordionHeader}
						titleStyle={
							!item.completed
								? item.selected
									? styles.accordionTitleChosen
									: styles.accordionTitle
								: styles.accordionTitleComplete
						}
						expanded={item.selected}
						key={item.testamentName.toString()}
						onPress={() => handleTestamentPress(index)}
						right={(props) => (props.isExpanded === false ? null : null)}>
						{item.books.map((book, bookIndex) => (
							<List.Accordion
								//render books
								title={book.bookName}
								key={book.bookName.toString()}
								expanded={book.selected}
								onPress={() => handleBookPress(index, bookIndex)}
								style={styles.accordionHeader}
								right={(props) => (props.isExpanded === false ? null : null)}
								titleStyle={
									!book.completed
										? book.selected
											? styles.accordionTitleChosen
											: styles.accordionTitle
										: styles.accordionTitleComplete
								}>
								<ChaptersRender
									bookData={book}
									testamentIndex={index}
									bookIndex={bookIndex}
									handleChapterPress={handleChapterPress}
								/>
							</List.Accordion>
						))}
					</List.Accordion>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		padding: 10,
	},
	accordionHeader: {
		backgroundColor: colors.primary,
		borderWidth: 0,
		borderColor: "transparent",
	},
	accordionTitle: {
		color: colors.textGrey,
		fontSize: 25,
		fontWeight: "800",
	},
	accordionTitleChosen: {
		color: colors.text,
		fontSize: 25,
		fontWeight: "800",
	},
	accordionTitleComplete: {
		color: colors.tertiary,
		fontSize: 25,
		fontWeight: "800",
	},
});

export default ChooseChapterScreen;
