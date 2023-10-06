import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Reward from "../../components/atoms/Reward/Reward";

const RewardsScreen = () => {
	//access global state
	const userProgress = useSelector((state) => state.globalData.userProgress);
	const rewardsData = userProgress.rewards;

	return (
		<View style={styles.root}>
			<Text style={styles.header}>Rewards</Text>
			<FlatList
				data={rewardsData}
				showsVerticalScrollIndicator={false}
				numColumns={3}
				keyExtractor={(item, index) => `RewardIndex${index}`}
				renderItem={({ item }) => {
					return (
						<View style={styles.rewardContainer}>
							<Reward style={styles.reward} reward={item} />
						</View>
					);
				}}
			/>
		</View>
	);
};

export default RewardsScreen;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		padding: 10,
	},
	header: {
		fontSize: 30,
		fontWeight: "900",
		textAlign: "center",
		color: "#f5f5f5",
		margin: 24,
	},
	rewardContainer: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		marginVertical: 10,
		justifyContent: "center",
	},
	reward: {
		alignItems: "center",
		justifyContent: "center",
	},
});
