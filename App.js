import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
	Alert,
	Button,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function App() {
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [isPasswordHidden, setIsPasswordVisible] = useState(false);

	function assignUsername(text) {
		setUserName(text);
	}

	const onLoginPressed = () => {
		console.log(username, password);
	};

	const toggleEye = () => {
		setIsPasswordVisible(!isPasswordHidden);
	};

	return (
		<View style={styles.container}>
			<Feather
				style={styles.bibleIcon}
				name="book-open"
				size={100}
				color="#38F586"
			/>
			<View style={{width: "100%", alignItems: 'center'}}>
				<TextInput
					style={[styles.username]}
					onChangeText={assignUsername}
					value={username}
					placeholder="username"
				/>
				<View style={styles.passwordContainer}>
					<TextInput
						style={[styles.password]}
						secureTextEntry={isPasswordHidden}
						onChangeText={(text) => setPassword(text)}
						value={password}
						placeholder="password"
					/>
					<Pressable onPress={toggleEye}>
						{isPasswordHidden ? (
							<Entypo name="eye-with-line" size={24} color="black" />
						) : (
							<Entypo name="eye" size={24} color="black" />
						)}
					</Pressable>
				</View>
			</View>
			<Pressable style={styles.buttonContainer} onPress={onLoginPressed}>
				<Text style={styles.buttonText}>Log In</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-evenly"
	},
	bibleIcon: {
    marginTop: "20%"
  },
	username: {
		fontSize: 18,
		fontWeight: "300",
		textAlign: "left",
		borderWidth: 1,
		width: "85%",
		padding: 8,
		borderRadius: 8,
		margin: 12,
	},
	passwordContainer: {
		borderWidth: 1,
		width: "85%",
		padding: 8,
		borderRadius: 8,
		margin: 12,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	password: {
		fontSize: 18,
		fontWeight: "300",
		textAlign: "left",
		flex: 1,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "800",
		textAlign: "center",
		textTransform: "uppercase",
		color: "black",
	},
	buttonContainer: {
		width: "60%",
		padding: 16,
		borderRadius: 8,
		margin: 12,
		backgroundColor: "#38F586",
	},
});
