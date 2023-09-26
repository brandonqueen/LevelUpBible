import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "../CustomButton/CustomButton";

const SocialSignInButtons = () => {
	const onSignInFacebook = () => {
		console.warn("Facebook");
	};

	const onSignInGoogle = () => {
		console.warn("Google");
	};

	const onSignInApple = () => {
		console.warn("Apple");
	};

	return (
		<>
			<CustomButton
				text="Sign in with Facebook"
				onPress={onSignInFacebook}
				bgColor="#e7eaf4"
				fgColor="#4765a9"
			/>
			<CustomButton
				text="Sign in with Google"
				onPress={onSignInGoogle}
				bgColor="#fae9ea"
				fgColor="#dd4d44"
			/>
			<CustomButton
				text="Sign in with Apple"
				onPress={onSignInApple}
				bgColor="black"
				fgColor="white"
			/>
		</>
	);
};

export default SocialSignInButtons;

const styles = StyleSheet.create({});
