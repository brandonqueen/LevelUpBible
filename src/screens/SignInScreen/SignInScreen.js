import {
	StyleSheet,
	Text,
	View,
	Image,
	useWindowDimensions,
	ScrollView,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../../assets/Images/Level_Up_Bible.png";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { height } = useWindowDimensions();
	const navigation = useNavigation();

	const onSignInPressed = () => {
		//validate user
		navigation.navigate("BottomTabs", { screen: "HOME" });
	};

	const onForgotPasswordPressed = () => {
		navigation.navigate("ResetPassword");
	};

	const onSignupPressed = () => {
		navigation.navigate("SignUp");
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.root}>
				<Image
					source={Logo}
					style={[styles.logo, { height: height * 0.3 }]}
					resizeMode="contain"
				/>

				<CustomInput
					placeholder="Username"
					value={username}
					setValue={setUsername}
					autoCorrect={false}
					autoCapitalize="none"
				/>
				<CustomInput
					placeholder="Password"
					value={password}
					setValue={setPassword}
					secureTextEntry
				/>

				<CustomButton text="Sign In" onPress={onSignInPressed} />
				<CustomButton
					text="Forgot Password?"
					onPress={onForgotPasswordPressed}
					type="TERTIARY"
				/>
				<SocialSignInButtons />
				<CustomButton
					text="Don't have an account? Create one"
					onPress={onSignupPressed}
					type="TERTIARY"
				/>
			</View>
		</ScrollView>
	);
};

export default SignInScreen;

const styles = StyleSheet.create({
	root: {
		padding: 20,
		alignItems: "center",
	},
	logo: {
		width: "70%",
		maxWidth: 400,
		maxHeight: 300,
	},
});
