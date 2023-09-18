import { StyleSheet, Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
	const navigation = useNavigation();

	function onSignOutPressed() {
		navigation.navigate("SignIn");
	}

	function onRewardsPressed() {
		navigation.navigate("NotImplemented");
	}

	return (
		<View style={styles.root}>
			<View style={styles.card}>
				<Button title="Sign Out" onPress={onSignOutPressed} />
				<Button title="Rewards" onPress={onRewardsPressed} />
			</View>
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	card: {
		width: "95%",
		height: "95%",
		backgroundColor: "#f5f5f5",
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
	},
});
