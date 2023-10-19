import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Milestone from "../../../atoms/Milestone/Milestone";
import colors from "../../../../constants/colors";
import React from "react";

const QuizSuccessMilestones = ({ newMilestones }) => {
	const milestoneState = useSelector(
		(state) => state.globalData.userProgress.milestones
	);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				{newMilestones.length > 1
					? "You also earned new milestones!"
					: "You also earned a new milestone!"}
			</Text>
			<View style={styles.milestonesContainer}>
				<FlatList
					scrollEnabled={false}
					data={newMilestones}
					horizontal={true}
					keyExtractor={(item, index) => `New milestone index: ${index}`}
					renderItem={({ item }) => {
						const milestoneIndex = milestoneState.findIndex(
							(milestoneObj) => milestoneObj.title === item
						);
						const newMilestoneToRender = milestoneState[milestoneIndex];
						return (
							<View style={styles.milestone}>
								<Milestone milestone={newMilestoneToRender} />
							</View>
						);
					}}
				/>
			</View>
		</View>
	);
};

export default QuizSuccessMilestones;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: 12,
	},
	text: {
		color: colors.text,
		fontWeight: "600",
		fontSize: 20,
		textAlign: "center",
		marginVertical: 16,
		paddingBottom: 16,
	},
	milestonesContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
	milestone: {
		marginHorizontal: 16,
	},
});
