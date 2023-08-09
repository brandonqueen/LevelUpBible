import { StyleSheet, Text, SafeAreaView } from "react-native";
import React from "react";
import Navigation from "./src/navigation";

const App = () => {
	return (
		<SafeAreaView style={styles.root}>
			<Navigation />
		</SafeAreaView>
	);
};

export default App;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: "#F9FBFC",
	},
});
