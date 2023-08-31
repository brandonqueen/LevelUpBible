import { StyleSheet, ScrollView, View, Text } from "react-native";
import React from "react";

const BibleScreen = () => {
	return (
		<View style={styles.root}>
			<View style={styles.card}>
				<ScrollView style={styles.scroll}>
					<Text style={styles.text}>This is where the Bible goes. Yeah, yeah. This is where the Bible GOES!</Text>
				</ScrollView>
			</View>
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
	card: {
		width: "95%",
		height: "95%",
		backgroundColor: "rgb(11,14,29)",
		borderRadius: 12,
		padding: 20,
		justifyContent: "center",
	},
	scroll: {
		flex: 1,
	},
	text: {
		color: "#f5f5f5",
		textAlign: "center",
		fontSize: 24,
		fontWeight: "600",
	},
});
