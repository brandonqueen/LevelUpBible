import { StyleSheet, Text, View, ScrollView } from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";

const NewPasswordSuccessScreen = () => {
	const navigation = useNavigation();

	const onConfirmPressed = () => {
		console.warn("Confirmed!");
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
				<Text style={styles.title}>
					Your password has been successfully reset! 🥳🎉
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
		color: "#051c60",
		margin: 20,
		textAlign: "center",
	},
	text: {
		color: "gray",
		marginVertical: 10,
	},
	link: {
		color: "#fdb075",
	},
});

export default NewPasswordSuccessScreen;
