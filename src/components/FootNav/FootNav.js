import { StyleSheet, Text, View, Image } from "react-native";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const FootNav = () => {
	return (
		<View style={styles.bottomBar}>
			<View style={styles.bottomIcons}>
				<FontAwesome5 name="users" size={30} color="#f5f5f5" />
				<Text style={styles.bottomIconText}>FRIENDS</Text>
			</View>
			<View style={styles.bottomIcons}>
				<FontAwesome5 name="bible" size={31} color="#f5f5f5" />
				<Text style={styles.bottomIconText}>READ</Text>
			</View>
			<View style={styles.bottomIcons}>
				<FontAwesome name="star" size={32} color="#F4C01E" />
				<Text style={styles.bottomIconText}>REWARDS</Text>
			</View>
		</View>
	);
};

export default FootNav;

const styles = StyleSheet.create({
	bottomBar: {
		flex: "1",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 5,
		paddingHorizontal: 10,
		alignItems: "flex-end",
		overflow: "hidden",
	},
	bottomIcons: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
	},
	bottomBibleIcon: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
	},
	bottomIconText: {
		color: "#f5f5f5",
		fontWeight: "900",
		paddingTop: 3,
	},
});