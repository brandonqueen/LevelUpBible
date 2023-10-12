import { FlatList, View } from "react-native";
import Reward from "../../atoms/Reward/Reward";
import React from "react";

const HomeRewardsRender = ({ recentEarnedRewards, rewards }) => {
	if (recentEarnedRewards.length < 1) {
		//if no rewards yet, render default (unearned) first reward, darkened
		return <Reward reward={rewards[0]} />;
	} else {
		//take rewards in order of most recent first
		const reversedArray = recentEarnedRewards.slice().reverse();

		//and if rewards exist, render them!
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
					const rewardIndex = rewards.findIndex((obj) => obj.title === item);
					return (
						<View style={{ marginHorizontal: 10 }}>
							<Reward reward={rewards[rewardIndex]} />
						</View>
					);
				}}
			/>
		);
	}
};

export default HomeRewardsRender;
