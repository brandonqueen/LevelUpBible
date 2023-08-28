import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BibleScreen from "../screens/BibleScreen/BibleScreen";
import SignInScreen from "../screens/SignInScreen/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen/SignUpScreen";
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen";
import EmailConfirmSuccessScreen from "../screens/EmailConfirmSuccessScreen";
import NewPasswordSuccessScreen from "../screens/NewPasswordSuccessScreen/NewPasswordSuccessScreen";
import Account from "../screens/Account/Account";
import BottomTabs from "./BottomTabs";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
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
				<Stack.Screen name="SignIn" component={SignInScreen} />
				<Stack.Screen name="SignUp" component={SignUpScreen} />
				<Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
				<Stack.Screen
					name="EmailConfirmSuccess"
					component={EmailConfirmSuccessScreen}
				/>
				<Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
				<Stack.Screen
					name="NewPasswordSuccess"
					component={NewPasswordSuccessScreen}
				/>
				<Stack.Screen name="NewPassword" component={NewPasswordScreen} />
				<Stack.Screen name="Account" component={Account} />
				<Stack.Screen name="BottomTabs" component={BottomTabs} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default StackNavigator;

<Stack.Screen name="BibleScreen" component={BibleScreen} />;
