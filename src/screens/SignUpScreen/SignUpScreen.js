import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../.expo/firebaseConfig";

const SignUpScreen = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordRepeat, setPasswordRepeat] = useState("");

	const navigation = useNavigation();
	const handleSignUp = () => {
		auth
			.createUserWithUsernameEmailAndPassword(username, email, password)
			.then((userCredentials) => {
				const user = userCredentials.user;
				console.log(user.email);
			})
			.catch((error) => alert(error.message));
	};

	const onRegisterPressed = () => {
		navigation.navigate("ConfirmEmail");
	};

	const onTermsOfUsePressed = () => {
		console.warn("Show Terms of Use");
	};

	const onPrivacyPolicyPressed = () => {
		console.warn("Show Privacy Policy");
	};

	const onSignInPressed = () => {
		navigation.navigate("SignIn");
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.root}>
				<Text style={styles.title}>Create Account</Text>

				<CustomInput
					placeholder="Username"
					value={username}
					setValue={setUsername}
					autoCorrect={false}
					autoCapitalize="none"
				/>
				<CustomInput
					placeholder="Email"
					value={email}
					setValue={setEmail}
					autoCorrect={false}
					autoCapitalize="none"
				/>
				<CustomInput
					placeholder="Password"
					value={password}
					setValue={setPassword}
					secureTextEntry
				/>
				<CustomInput
					placeholder="Repeat Password"
					value={passwordRepeat}
					setValue={setPasswordRepeat}
					secureTextEntry
				/>

				<CustomButton text="Register" onPress={onRegisterPressed} />

				<Text style={styles.text}>
					By registering, you confirm that you accept our{" "}
					<Text style={styles.link} onPress={onTermsOfUsePressed}>
						Terms of Use
					</Text>{" "}
					and{" "}
					<Text style={styles.link} onPress={onPrivacyPolicyPressed}>
						Privacy Policy
					</Text>
					.
				</Text>

				<SocialSignInButtons />

				<CustomButton
					text="Have an account? Sign in"
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

export default SignUpScreen;
