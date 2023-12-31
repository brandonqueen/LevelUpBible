/* eslint-disable react/prop-types */
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	FlatList,
} from "react-native";
import colors from "../../../constants/colors";
import React from "react";

const ChaptersRender = ({
	bookData,
	testamentIndex,
	bookIndex,
	handleChapterPress,
}) => {
	//GET CHAPTER DATA FROM BOOKDATA
	const { chapters } = bookData;

	return (
		<View style={styles.root}>
			<View style={styles.chapterNumRow}>
				<FlatList
					data={chapters}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.chapter.toString()}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								style={styles.chapterPressable}
								onPress={() =>
									handleChapterPress(testamentIndex, bookIndex, item)
								}>
								<Text
									style={
										item.completed ? styles.chaptersCompleted : styles.chapters
									}>
									{item.chapter}
								</Text>
							</TouchableOpacity>
						);
					}}
					numColumns={5}
				/>
			</View>
		</View>
	);
};

export default ChaptersRender;

const styles = StyleSheet.create({
	root: {
		padding: 8,
		maxWidth: 500
	},
	chapterNumRow: {
		minWidth: "100%",
		paddingLeft: 15,
	},
	chapterPressable: {
		width: "20%",
		aspectRatio: 1,
	},
	chapters: {
		color: colors.text,
		opacity: 0.8,
		fontSize: 24,
		fontWeight: "800",
		paddingVertical: 12,
	},
	chaptersCompleted: {
		color: colors.tertiary,
		opacity: 0.8,
		fontSize: 24,
		fontWeight: "800",
		paddingVertical: 12,
	},
});
