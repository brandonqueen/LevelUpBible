import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BibleScreen from "../screens/BibleScreen/BibleScreen";
import ChooseChapterScreen from "../screens/ChooseChapterScreen/ChooseChapterScreen";

const Stack = createNativeStackNavigator();

const BibleStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="ChooseChapter"
				component={ChooseChapterScreen}
				key="ChooseChapterKey"
			/>
			<Stack.Screen name="Bible" component={BibleScreen} />
		</Stack.Navigator>
	);
};

export default BibleStack;
