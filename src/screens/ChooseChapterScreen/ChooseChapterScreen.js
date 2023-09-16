import { useState, useEffect } from "react";
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
	clearAllSelected,
} from "../../features/bibleSlice/bibleSlice";
import { List } from "react-native-paper";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const ChooseChapterScreen = () => {
	const [headerTestament, setHeaderTestament] = useState(false);
	const [headerBook, setHeaderBook] = useState(false);

	//state setter
	const dispatch = useDispatch();

	//state getter
	const bibleState = useSelector((state) => state.bibleData);

	//nav
	const navigation = useNavigation();
	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused) {
			dispatch(clearAllSelected());
			setHeaderBook(false);
			setHeaderTestament(false);
		}
	}, [isFocused]);

	//press handlers
	const handleTestamentPress = (index) => {
		dispatch(setTestamentSelected({ index: index }));
		setHeaderTestament(!headerTestament);
	};

	const handleBookPress = (testamentIndex, bookIndex) => {
		dispatch(
			setBookSelected({ testamentIndex: testamentIndex, bookIndex: bookIndex })
		);
		setHeaderBook(!headerBook);
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
			book: book,
			chapterNum: chapterNum,
		});
	};

	const Header = () => {
		if (headerBook) {
			return <Text style={styles.header}>Choose Chapter</Text>;
		} else if (headerTestament) {
			return <Text style={styles.header}>Choose Book</Text>;
		} else {
			return <Text style={styles.header}>Choose Testament</Text>;
		}
	};

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

	const Chapters = ({ bookData, testamentIndex, bookIndex }) => {
		const { chapters } = bookData;

		const renderItem = (item) => {
			return (
				<Pressable
					style={{ width: "20%" }}
					onPress={() => handleChapterPress(testamentIndex, bookIndex, item)}>
					<Text style={[styles.chapters]}>{item.chapter}</Text>
				</Pressable>
			);
		};

		return (
			<ScrollView horizontal={true} style={{ padding: 8 }}>
				<View style={styles.chapterNumRow}>
					<FlatList
						data={chapters}
						keyExtractor={(item) => item.chapter.toString()}
						renderItem={({ item }) => {
							return renderItem(item);
						}}
						numColumns={5}
					/>
				</View>
			</ScrollView>
		);
	};

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
						onPress={() => handleTestamentPress(index)}>
						{item.books.map((book, bookIndex) => (
							<List.Accordion
								//render books
								title={book.bookName}
								expanded={book.selected}
								onPress={() => handleBookPress(index, bookIndex)}
								style={accordionStyle.header}
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
		fontSize: 25,
		fontWeight: "800",
		padding: 15,
	},
	chapterNumRow: {
		minWidth: "100%",
	},
});

export default ChooseChapterScreen;
