import { StyleSheet, View, Image } from "react-native";
import React from "react";

import graphic from "../../../assets/Images/LUB_Icon.png";
import LUBWords from "../../../assets/Images/LUB_WORDS_ONLY.png";

import MaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";

const HeadNav = () => {
	return (
		<View style={styles.topBar}>
			<View style={styles.topBarContainer}>
				<Image source={graphic} style={styles.graphic} />
			</View>
			<View style={styles.topBarContainer}>
				<Image source={LUBWords} style={styles.LUBWords} />
			</View>
			<View style={styles.topBarContainer}>
				<MaterialCommunity
					name="account"
					size={45}
					color="#f5f5f5"
					style={{ alignSelf: "flex-end" }}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	topBar: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 5,
		paddingHorizontal: 20,
	},
	topBarContainer: {
		flex: 1,
		alignSelf: "center",
	},
	graphic: {
		width: 45,
		height: 45,
		alignSelf: "flex-start",
	},
	LUBWords: {
		maxHeight: "100%",
		maxWidth: "100%",
		alignSelf: "center",
	},
});

export default HeadNav;
