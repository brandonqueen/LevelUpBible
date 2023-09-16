import { StyleSheet, SafeAreaView, View } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store.js";
import StackNavigator from "./src/navigation/StackNavigator";
import { PaperProvider } from "react-native-paper";
import ChooseChapterScreen from "./src/screens/ChooseChapterScreen/ChooseChapterScreen.js";

const App = () => {
	return (
		<Provider store={store}>
			<PaperProvider>
				<SafeAreaView style={styles.root}>
					<StackNavigator />
				</SafeAreaView>
			</PaperProvider>
		</Provider>
	);
};

export default App;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: "rgb(22,30,57)",
	},
});
