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
import { StyleSheet, View, FlatList, Text, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { List } from "react-native-paper";
import ChaptersRender from "../../components/molecules/ChaptersRender/ChaptersRender";
import colors from "../../constants/colors";
import React from "react";

const ChooseChapterScreen = () => {
	//NAVIGATION
	const navigation = useNavigation();

	//GLOBAL STATE
	const dispatch = useDispatch();
	const bibleState = useSelector((state) => state.globalData.bibleData);

	//LOCAL STATE

	//logic to avoid reset of selected book when navigating back from the Bible Screen
	const isFocused = useIsFocused();
	const route = useRoute();
	useEffect(() => {
		if (isFocused && route?.params?.prevScreen !== "BibleScreen") {
			dispatch(resetBibleSelection());
		}
		navigation.setParams({ prevScreen: "" });
	}, [isFocused]);

	//PRESS HANDLERS
	const handleTestamentPress = (index) => {
		dispatch(setTestamentSelected({ index: index }));
	};

	const handleBookPress = (testamentIndex, bookIndex) => {
		dispatch(
			setBookSelected({ testamentIndex: testamentIndex, bookIndex: bookIndex })
		);
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
	};

	//MAIN RENDER/RETURN
	return (
		<View style={styles.root}>
			<Pressable onPress={handleHeaderPress}>
				<Text style={styles.header}>Choose Chapter</Text>
			</Pressable>
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
		paddingHorizontal: 10,
	},
	header: {
		color: colors.text,
		fontWeight: "800",
		fontSize: 30,
		padding: 24,
		textAlign: "center",
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
