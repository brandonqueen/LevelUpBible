import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { PaperProvider } from "react-native-paper";
import BottomTabs from "./src/navigation/BottomTabs.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<PaperProvider>
					<SafeAreaView style={styles.root}>
						<BottomTabs />
						<StatusBar barStyle="light-content" />
					</SafeAreaView>
				</PaperProvider>
			</PersistGate>
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
