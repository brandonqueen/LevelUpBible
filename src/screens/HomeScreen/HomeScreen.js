import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
	const navigation = useNavigation();

	const onSignInPressed = () => {
		navigation.navigate("SignIn");
	};

	return (
		<View style={styles.root}>
			<Text style={styles.text}>Welcome Home!</Text>
			<CustomButton
				text="Back to sign in"
				type="SECONDARY"
				onPress={onSignInPressed}></CustomButton>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: "center",
		margin: 10,
	},
	text: {
		fontSize: 35,
		fontWeight: "900",
		textAlign: "center",
		marginVertical: 25,
		color: "whitesmoke",
	},
});

export default HomeScreen;
