import { useState } from "react";
import { Text, StyleSheet, View, FlatList, Button } from "react-native";
import { List } from "react-native-paper";
import { bibleData } from "../../constants/bibleData";

const MyComponent = () => {
	const [list, setList] = useState(bibleData);

	const handleTestamentPress = (item) => {
		if (item.testament === "Old Testament") {
			setList((prevState) => {
				const newState = [...prevState];
				newState[0].isExpanded = !newState[0].isExpanded;
				newState[1].isExpanded = false;
				return newState;
			});
		} else {
			setList((prevState) => {
				const newState = [...prevState];
				newState[1].isExpanded = !newState[1].isExpanded;
				newState[0].isExpanded = false;
				return newState;
			});
		}
	};

	const handleBookPress = (book, index, item) => {
		testamentClicked = item.testament;
		const testamentIndex = testamentClicked === "Old Testament" ? 0 : 1;
	};

	return (
		<View style={styles.root}>
			<Text style={styles.header}>Choose Testament</Text>
			<FlatList
				data={list}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => (
					<List.Accordion
						//testaments
						title={item.testament}
						expanded={item.isExpanded}
						onPress={() => handleTestamentPress(item)}>
						{item.books.map((book, index) => (
							<List.Accordion
								//books
								title={book.title}
								expanded={book.isExpanded}
								onPress={() => handleBookPress(book, index, item)}>
								<Text style={{ color: "white" }}>Number of Chapters</Text>
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
		padding: 16,
		textAlign: "center",
	},
});

export default MyComponent;
