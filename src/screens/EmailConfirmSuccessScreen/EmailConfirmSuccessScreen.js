import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";

const EmailConfirmSuccessScreen = () => {
	const navigation = useNavigation();

	const onSignInPressed = () => {
		navigation.navigate("SignIn");
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.root}>
				<Text style={styles.title}>
					Your account has been successfully created! 🥳🎉
				</Text>

				<CustomButton
					text="Back to Sign in"
					onPress={onSignInPressed}
					type="TERTIARY"
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	root: {
		padding: 20,
		alignItems: "center",
	},
	title: {
		fontSize: 30,
		fontWeight: "bold",
		color: "#f5f5f5",
		margin: 20,
		textAlign: "center",
	},
});

export default EmailConfirmSuccessScreen;
