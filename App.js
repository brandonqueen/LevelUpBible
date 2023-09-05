import { StyleSheet, SafeAreaView, View } from "react-native";
import React from "react";
import StackNavigator from "./src/navigation/StackNavigator";
import { PaperProvider } from "react-native-paper";
import ChooseChapterScreen from "./src/screens/ChooseChapterScreen/ChooseChapterScreen";

const App = () => {
	return (
		<PaperProvider>
			<SafeAreaView style={styles.root}>
				<ChooseChapterScreen/>
			</SafeAreaView>
		</PaperProvider>
	);
};

export default App;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: "rgb(22,30,57)",
	},
});
