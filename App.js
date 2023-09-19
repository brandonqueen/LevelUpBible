import { StyleSheet, SafeAreaView, Text, StatusBar } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { PaperProvider } from "react-native-paper";
import StackNavigator from "./src/navigation/StackNavigator.js";
import BibleScreen from "./src/screens/BibleScreen/BibleScreen.js";

const App = () => {
	return (
		<Provider store={store}>
			<PaperProvider>
				<SafeAreaView
					style={styles.root}
					forceInset={{ top: "always", bottom: "never" }}>
					<StackNavigator />
					<StatusBar barStyle="light-content" />
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
