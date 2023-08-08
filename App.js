import { StyleSheet, Text, SafeAreaView } from "react-native";
import React from "react";
import SignInScreen from "./src/screens/SignInScreen/SignInScreen";

const App = () => {
	return (
		<SafeAreaView style={styles.root}>
			<SignInScreen />
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
