import { StyleSheet, SafeAreaView, Text, StatusBar } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { PaperProvider } from "react-native-paper";
import InitialStackNavigator from "./src/navigation/InitialStackNavigator.js";
import RewardsScreen from "./src/screens/RewardsScreen/RewardsScreen.js";

const App = () => {
	return (
		<Provider store={store}>
			<PaperProvider>
				<SafeAreaView
					style={styles.root}
					forceInset={{ top: "always", bottom: "never" }}>
					<InitialStackNavigator/>
					{/* <RewardsScreen /> */}
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
