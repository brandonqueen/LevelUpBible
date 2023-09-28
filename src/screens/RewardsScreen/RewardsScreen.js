import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Reward from "../../components/Reward/Reward";

const RewardsScreen = () => {
	const userProgress = useSelector((state) => state.globalData.userProgress);
	const rewardsData = userProgress.rewards;

	function handleRewardPress(item) {
		alert(`You Pressed ${item.title}`);
	}

	const rewardRender = (item) => {
		return (
			<View style={styles.rewardContainer}>
				<Reward
					reward={item}
				/>
			</View>
		);
	};

	return (
		<View style={styles.root}>
			<Text style={styles.header}>Your Rewards</Text>
			<FlatList
				data={rewardsData}
				showsVerticalScrollIndicator={false}
				numColumns={3}
				keyExtractor={(item, index) => `RewardIndex${index}`}
				renderItem={({ item }) => {
					return rewardRender(item);
				}}
			/>
		</View>
	);
};

export default RewardsScreen;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		padding: 10
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
		marginBottom: 20,
		alignItems: "center",
		justifyContent: "center",
	},
});
