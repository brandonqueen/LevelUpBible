import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";

const ConfirmEmailScreen = () => {
	const [code, setCode] = useState("");

	const navigation = useNavigation();

	const onConfirmPressed = () => {
		navigation.navigate("EmailConfirmSuccess");
	};

	const onResendPressed = () => {
		console.warn("Code Resent");
	};

	const onSignInPressed = () => {
		navigation.navigate("SignIn");
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.root}>
				<Text style={styles.title}>Confirm Your Email</Text>

				<CustomInput
					placeholder="Enter your confirmation code"
					value={code}
					setValue={setCode}
				/>

				<CustomButton text="Confirm" onPress={onConfirmPressed} />

				<CustomButton
					text="Resend Code"
					onPress={onResendPressed}
					type="SECONDARY"
				/>

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
		color: "#051c60",
		margin: 20,
	},
	text: {
		color: "gray",
		marginVertical: 10,
	},
	link: {
		color: "#fdb075",
	},
});

export default ConfirmEmailScreen;
