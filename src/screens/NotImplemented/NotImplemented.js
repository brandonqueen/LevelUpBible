import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Capybara from "../../../assets/Images/Capybara.png";

const NotImplemented = () => {
	return (
		<View style={styles.root}>
			<View style={styles.card}>
				<Text style={styles.text}>Feature Coming Soon! 🎊</Text>
				<Image source={Capybara} style={styles.capybara} />
			</View>
		</View>
	);
};

export default NotImplemented;

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
		borderRadius: "25%",
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 42,
		fontWeight: "900",
		textAlign: "center",
		paddingTop: "10%",
		paddingHorizontal: "5%",
	},
	capybara: {
		width: "100%",
		flex: 1,
		resizeMode: "contain",
	},
});
