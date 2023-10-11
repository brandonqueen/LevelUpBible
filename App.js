import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { PaperProvider } from "react-native-paper";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store } from "./store.js";
import BottomTabs from "./src/navigation/BottomTabs.js";
import colors from "./src/constants/colors.js";
import React from "react";

let persistor = persistStore(store);

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<PaperProvider>
					<SafeAreaView style={styles.root}>
						<BottomTabs />
						<StatusBar backgroundColor="#161e39" barStyle="light-content" />
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
		backgroundColor: colors.primary,
	},
});
