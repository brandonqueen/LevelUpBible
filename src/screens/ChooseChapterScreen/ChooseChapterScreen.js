import { useState } from "react";
import { Text, StyleSheet, View, FlatList, Button } from "react-native";
import { List } from "react-native-paper";
import { bibleData } from "../../constants/bibleData";

const ChooseChapterScreen = () => {
	const [list, setList] = useState(bibleData);
	const [isTestamentChosen, setIsTestamentChosen] = useState(false);
	const [isBookChosen, setIsBookChosen] = useState(false);

	const handleTestamentPress = (item) => {
		if (item.testament === "Old Testament") {
			setList((prevState) => {
				const newState = [...prevState];
				newState[0].isExpanded = !newState[0].isExpanded;
				newState[1].isExpanded = false;
				setIsTestamentChosen(!isTestamentChosen);
				return newState;
			});
		} else {
			setList((prevState) => {
				const newState = [...prevState];
				newState[1].isExpanded = !newState[1].isExpanded;
				newState[0].isExpanded = false;
				setIsTestamentChosen(!isTestamentChosen);
				return newState;
			});
		}
	};

	const handleBookPress = (bookIndex, item, index) => {
		let tempList = list.map((testament) => ({
			...testament,
			books: testament.books.map((book) => ({
				...book,
				isExpanded: false,
			})),
		}));
		tempList[index].books[bookIndex].isExpanded =
			!item.books[bookIndex].isExpanded;
		setList(tempList);
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

	return (
		<View style={styles.root}>
			<Header />
			<FlatList
				data={list}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => (
					<List.Accordion
						//testaments
						title={item.testament}
						expanded={item.isExpanded}
						onPress={() => handleTestamentPress(item)}>
						{item.books.map((book, bookIndex) => (
							<List.Accordion
								//books
								title={book.title}
								expanded={book.isExpanded}
								onPress={() => handleBookPress(bookIndex, item, index)}>
								<Text style={styles.chapters}>
									This book has {item.books[bookIndex].numOfChapters} chapters
								</Text>
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
		fontSize: 16,
		fontWeight: "800",
		padding: 16,
	},
});

export default ChooseChapterScreen;
