import {
	StyleSheet,
	Text,
	View,
	Pressable,
	ScrollView,
	FlatList,
} from "react-native";
import colors from "../../../constants/colors";

const ChaptersRender = ({
	bookData,
	testamentIndex,
	bookIndex,
	handleChapterPress,
}) => {
	const { chapters } = bookData;

	return (
		<ScrollView horizontal={true} style={styles.root}>
			<View style={styles.chapterNumRow}>
				<FlatList
					data={chapters}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item, index) => item.chapter.toString()}
					renderItem={({ item }) => {
						return (
							<Pressable
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
							</Pressable>
						);
					}}
					numColumns={5}
				/>
			</View>
		</ScrollView>
	);
};

export default ChaptersRender;

const styles = StyleSheet.create({
	root: {
		padding: 8,
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
