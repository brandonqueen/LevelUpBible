import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen/SignUpScreen";
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import EmailConfirmSuccessScreen from "../screens/EmailConfirmSuccessScreen";
import NewPasswordSuccessScreen from "../screens/NewPasswordSuccessScreen/NewPasswordSuccessScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
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
				<Stack.Screen name="Home" component={HomeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Navigation;

/*				<Stack.Screen name="SignIn" component={SignInScreen} />
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
				<Stack.Screen name="NewPassword" component={NewPasswordScreen} /> */
