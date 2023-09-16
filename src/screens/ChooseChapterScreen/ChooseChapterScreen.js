import { useState } from "react";
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
} from "../../features/bibleSlice/bibleSlice";
import { List } from "react-native-paper";

const ChooseChapterScreen = () => {
	const [isTestamentChosen, setIsTestamentChosen] = useState(false);
	const [isBookChosen, setIsBookChosen] = useState(false);
	const [chapterIsPressed, setChapterIsPressed] = useState(false);

	//state setter
	const dispatch = useDispatch();

	//state getter
	const bibleState = useSelector((state) => state.bibleData);

	//press handlers
	const handleTestamentPress = (index) => {
		dispatch(setTestamentSelected({ index: index }));
		setIsTestamentChosen(!isTestamentChosen);
	};

	const handleBookPress = (testamentIndex, bookIndex) => {
		dispatch(
			setBookSelected({ testamentIndex: testamentIndex, bookIndex: bookIndex })
		);
		setIsBookChosen(!isBookChosen);
	};

	const Header = () => {
		if (isBookChosen) {
			return <Text style={styles.header}>Choose Chapter</Text>;
		} else if (isTestamentChosen) {
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

	const Chapters = ({ bookData }) => {
		const { chapters } = bookData;

		const handleChapterPressIn = () => {
			setChapterIsPressed(true);
		};

		const handleChapterPressOut = () => {
			setChapterIsPressed(false);
		};

		const renderItem = (item) => {
			<Pressable
				style={{ width: "20%" }}
				onPressIn={handleChapterPressIn}
				onPressOut={handleChapterPressOut}>
				<Text
					style={[styles.chapters, { opacity: chapterIsPressed ? 1 : 0.8 }]}>
					{item.chapter}
				</Text>
			</Pressable>;
		};

		return (
			<ScrollView horizontal={true} style={{ padding: 8 }}>
				<View style={styles.chapterNumRow}>
					<FlatList
						data={chapters}
						keyExtractor={(item) => `${bookData.bookName} ${item.chapter}`}
						renderItem={({ item }) => {
							renderItem(item);
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
								<Chapters bookData={book} />
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
		fontSize: 25,
		fontWeight: "800",
		padding: 15,
	},
	chapterNumRow: {
		minWidth: "100%",
	},
});

export default ChooseChapterScreen;
