import { StyleSheet, SafeAreaView, View } from "react-native";
import React from "react";
import StackNavigator from "./src/navigation/StackNavigator";
import NotImplemented from "./src/screens/NotImplemented/NotImplemented";

const App = () => {
	return (
		<SafeAreaView style={styles.root}>
			<StackNavigator />
		</SafeAreaView>
	);
};

export default App;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: "rgb(22,30,57)",
	},
});
