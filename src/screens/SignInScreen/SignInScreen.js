import {
	StyleSheet,
	Text,
	View,
	Image,
	useWindowDimensions,
	ScrollView,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../../assets/Images/BibleTogether.png";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";

const SignInScreen = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { height } = useWindowDimensions();
	const onSignInPressed = () => {
		console.warn("sign in");
	};

	const onForgotPasswordPressed = () => {
		console.warn("forgot password");
	};

	const onSignInFacebook = () => {
		console.warn("Facebook");
	};

	const onSignInGoogle = () => {
		console.warn("Google");
	};

	const onSignInApple = () => {
		console.warn("Apple");
	};

	const onSignupPressed = () => {
		console.warn("Sign up");
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
				<CustomButton
					text="Sign In with Facebook"
					onPress={onSignInFacebook}
					bgColor="#e7eaf4"
					fgColor="#4765a9"
				/>
				<CustomButton
					text="Sign In with Google"
					onPress={onSignInGoogle}
					bgColor="#fae9ea"
					fgColor="#dd4d44"
				/>
				<CustomButton
					text="Sign In with Apple"
					onPress={onSignInApple}
					bgColor="#e3e3e3"
					fgColor="#363636"
				/>
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
