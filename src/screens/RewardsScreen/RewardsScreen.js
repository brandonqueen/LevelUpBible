import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Reward from "../../components/Reward/Reward";

const RewardsScreen = () => {
	const userProgress = useSelector((state) => state.userProgress);
	const rewardsData = userProgress.rewards;

	const renderItem = (item) => {
		<Reward
			image={item.complete ? item.completeImage : item.incompleteImage}
			title={item.title}
			completed={item.complete}
		/>;
	};

	return (
		<View>
			<Text style={styles.header}>Your Rewards</Text>
			<View style={styles.rewardsContainer}>
				<FlatList
					data={rewardsData}
					keyExtractor={(item, index) => `RewardIndex${index}`}
					renderItem={({ item }) => {
						return renderItem(item);
					}}
				/>
			</View>
		</View>
	);
};

export default RewardsScreen;

const styles = StyleSheet.create({
	header: {
		fontSize: 30,
		fontWeight: "900",
		textAlign: "center",
		color: "#f5f5f5",
		margin: 24,
	},
	rewardsContainer: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		marginBottom: 20,
		alignItems: "center",
		justifyContent: "center",
	},
});
