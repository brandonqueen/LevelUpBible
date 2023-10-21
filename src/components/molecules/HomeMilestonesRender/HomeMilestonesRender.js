import { FlatList, View } from "react-native";
import Milestone from "../../atoms/Milestone/Milestone";
import React from "react";

const HomeMilestonesRender = ({ recentEarnedMilestones, milestones }) => {
	if (recentEarnedMilestones.length < 1) {
		//if no milestones yet, render default (unearned) first milestone, darkened
		return <Milestone milestone={milestones[0]} />;
	} else {
		//take milestones in order of most recent first
		const reversedArray = recentEarnedMilestones.slice().reverse();

		//and if milestones exist, render them!
		return (
			<FlatList
				contentContainerStyle={{
					flex: 0,
					minWidth: "100%",
					justifyContent: "space-evenly",
					padding: 16,
				}}
				horizontal={true}
				data={reversedArray}
				keyExtractor={(item, index) => `${item}: ${index}`}
				renderItem={({ item }) => {
					const milestoneIndex = milestones.findIndex((obj) => obj.title === item);
					return (
						<View style={{ marginHorizontal: 10 }}>
							<Milestone milestone={milestones[milestoneIndex]} />
						</View>
					);
				}}
			/>
		);
	}
};

export default HomeMilestonesRender;
