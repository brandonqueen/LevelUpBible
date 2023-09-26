import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoadScreen from "../screens/AppLoadScreen/AppLoadScreen";
import BottomTabs from "./BottomTabs";

const Stack = createNativeStackNavigator();

const InitialStackNavigator = () => {
	const MyTheme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			background: "rgb(22,30,57)",
		},
	};

	return (
		<NavigationContainer theme={MyTheme}>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="AppLoad" component={AppLoadScreen} />
				<Stack.Screen name="BottomTabs" component={BottomTabs} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default InitialStackNavigator;
