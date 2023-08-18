import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";

const NewPasswordScreen = () => {
	const [code, setCode] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const navigation = useNavigation();

	const onSendPressed = () => {
		navigation.navigate("NewPasswordSuccess");
	};

	const onSignInPressed = () => {
		navigation.navigate("SignIn");
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.root}>
				<Text style={styles.title}>Set New Password</Text>

				<CustomInput
					placeholder="Enter your confirmation code"
					value={code}
					setValue={setCode}
				/>
				<CustomInput
					placeholder="Enter your new password"
					value={newPassword}
					setValue={setNewPassword}
					secureTextEntry={true}
				/>

				<CustomButton text="Send" onPress={onSendPressed} />

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
		color: "whitesmoke",
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

export default NewPasswordScreen;
