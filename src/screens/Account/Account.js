import { StyleSheet, Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Account = () => {
	const navigation = useNavigation();

	function onSignOutPressed() {
		navigation.navigate("SignIn");
	}

	return (
		<View style={styles.root}>
			<View style={styles.card}>
				<Button title="Sign Out" onPress={onSignOutPressed} />
			</View>
		</View>
	);
};

export default Account;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	card: {
		width: "90%",
		height: "80%",
		backgroundColor: "#f5f5f5",
		borderRadius: "25%",
		justifyContent: "center",
		alignItems: "center",
	},
});
