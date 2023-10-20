import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Milestone from "../../components/atoms/Milestone/Milestone";
import colors from "../../constants/colors";
import React from "react";

const MilestonesScreen = () => {
	//GLOBAL STATE
	const userProgress = useSelector((state) => state.globalData.userProgress);
	const milestonesData = userProgress.milestones;

	return (
		<View style={styles.root}>
			<Text style={styles.header}>Milestones</Text>
			<View style={styles.container}>
				<FlatList
					data={milestonesData}
					showsVerticalScrollIndicator={false}
					numColumns={3}
					keyExtractor={(item, index) => `MilestoneIndex${index}`}
					renderItem={({ item }) => {
						return (
							<View style={styles.milestoneContainer}>
								<Milestone style={styles.milestone} milestone={item} />
							</View>
						);
					}}
				/>
			</View>
		</View>
	);
};

export default MilestonesScreen;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		paddingHorizontal: 10,
	},
	header: {
		fontSize: 30,
		fontWeight: "900",
		textAlign: "center",
		color: colors.text,
		margin: 24,
	},
	container: {
		maxWidth: 800,
		flex: 1,
		flexDirection: "row",
		alignSelf: "center"
	},
	milestoneContainer: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		marginVertical: 10,
		justifyContent: "center",
	},
	milestone: {
		alignItems: "center",
		justifyContent: "center",
	},
});
