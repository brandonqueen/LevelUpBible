import React, { useState, useEffect } from "react";
import {
	Text,
	StyleSheet,
	View,
	FlatList,
	Pressable,
	ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
	setTestamentSelected,
	setBookSelected,
	setChapterSelected,
	resetBibleSelection,
} from "../../features/bibleSlice/bibleSlice";
import { List } from "react-native-paper";
import {
	useNavigation,
	useIsFocused,
	useRoute,
} from "@react-navigation/native";

const ChooseChapterScreen = () => {
	const isFocused = useIsFocused();
	const route = useRoute();
	useEffect(() => {
		if (isFocused && route?.params?.prevScreen !== "BibleScreen") {
			dispatch(resetBibleSelection());
		}
		navigation.setParams({ prevScreen: "" });
	}, [isFocused]);

	//local state
	const [headerTestamentChosen, setHeaderTestamentChosen] = useState(false);
	const [headerBookChosen, setHeaderBookChosen] = useState(false);

	//global state setter
	const dispatch = useDispatch();

	//global state getter
	const bibleState = useSelector((state) => state.bibleData);

	//nav
	const navigation = useNavigation();

	//press handlers
	const handleTestamentPress = (index) => {
		//set global state
		dispatch(setTestamentSelected({ index: index }));

		//set header state of a book chosen to false
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
		//set global state
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

	//Header component
	const Header = () => {
		if (headerBookChosen) {
			return (
				<Pressable onPress={handleHeaderPress}>
					<Text style={styles.header}>Choose Chapter</Text>
				</Pressable>
			);
		} else if (headerTestamentChosen) {
			return (
				<Pressable onPress={handleHeaderPress}>
					<Text style={styles.header}>Choose Book</Text>
				</Pressable>
			);
		} else {
			return (
				<Pressable onPress={handleHeaderPress}>
					<Text style={styles.header}>Choose Testament</Text>
				</Pressable>
			);
		}
	};

	//styles for Accordion lists
	const accordionStyle = {
		header: {
			backgroundColor: "rgb(22,30,57)",
			borderWidth: 0,
			borderColor: "transparent",
		},
		title: {
			color: "rgba(210, 210, 210, 0.80)",
			fontSize: 25,
			fontWeight: "800",
		},
		titleChosen: {
			color: "white",
			fontSize: 25,
			fontWeight: "800",
		},
	};

	//Chapters component
	const Chapters = ({ bookData, testamentIndex, bookIndex }) => {
		const { chapters } = bookData;

		const renderItem = (item) => {
			return (
				<Pressable
					style={{ width: "20%" }}
					onPress={() => handleChapterPress(testamentIndex, bookIndex, item)}>
					<Text
						style={[styles.chapters, item.completed && { color: "#DFB01C" }]}>
						{item.chapter}
					</Text>
				</Pressable>
			);
		};

		return (
			<ScrollView horizontal={true} style={{ padding: 8 }}>
				<View style={styles.chapterNumRow}>
					<FlatList
						data={chapters}
						keyExtractor={(item, index) => item.chapter.toString()}
						renderItem={({ item }) => {
							return renderItem(item);
						}}
						numColumns={5}
					/>
				</View>
			</ScrollView>
		);
	};

	//ChooseChapterScreen main render
	return (
		<View style={styles.root}>
			<Header />
			<FlatList
				data={bibleState}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => (
					<List.Accordion
						//render testaments
						title={item.testamentName}
						style={accordionStyle.header}
						titleStyle={
							item.selected ? accordionStyle.titleChosen : accordionStyle.title
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
								style={accordionStyle.header}
								right={(props) => (props.isExpanded === false ? null : null)}
								titleStyle={
									book.selected
										? accordionStyle.titleChosen
										: accordionStyle.title
								}>
								<Chapters
									bookData={book}
									testamentIndex={index}
									bookIndex={bookIndex}
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
	header: {
		color: "#f5f5f5",
		fontWeight: "800",
		fontSize: 24,
		padding: 24,
		textAlign: "center",
	},
	chapters: {
		color: "#f5f5f5",
		opacity: 0.8,
		fontSize: 24,
		fontWeight: "800",
		paddingVertical: 12,
	},
	chapterNumRow: {
		minWidth: "100%",
		paddingLeft: 10,
	},
});

export default ChooseChapterScreen;
