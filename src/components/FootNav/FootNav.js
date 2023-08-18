import { StyleSheet, Text, View, Image } from "react-native";

import glow from "../../../assets/Images/glow.png";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const FootNav = () => {
	return (
		<View style={styles.bottomBar}>
			<View style={styles.bottomIcons}>
				<FontAwesome5 name="users" size={40} color="#f5f5f5" />
				<Text style={styles.bottomIconText}>FRIENDS</Text>
			</View>
			<View style={styles.bottomBibleIcon}>
				<Image source={glow} style={styles.glow} />
				<FontAwesome5 name="bible" size={40} color="#f5f5f5" />
				<Text style={styles.bottomIconText}>READ</Text>
			</View>
			<View style={styles.bottomIcons}>
				<FontAwesome name="star" size={40} color="#F4C01E" />
				<Text style={styles.bottomIconText}>REWARDS</Text>
			</View>
		</View>
	);
};

export default FootNav;

const styles = StyleSheet.create({
	bottomBar: {
		flex: "1.3",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingBottom: 5,
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
	glow: {
		position: "absolute",
		top: -19,
		left: 22,
		height: 38,
		width: 75,
	},
	bottomIconText: {
		color: "#f5f5f5",
		fontWeight: "900",
		paddingTop: 3,
	},
});
