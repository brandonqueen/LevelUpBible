import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import NotImplemented from "../futureElements/screens/NotImplemented/NotImplemented";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Profile" component={ProfileScreen} />
			<Stack.Screen name="NotImplemented" component={NotImplemented} />
		</Stack.Navigator>
	);
};

export default ProfileStack;
