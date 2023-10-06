import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Reward from "../../components/atoms/Reward/Reward";

const RewardsScreen = () => {
	//global state
	const userProgress = useSelector((state) => state.globalData.userProgress);
	const rewardsData = userProgress.rewards;

	//local state
	const rewardRender = (item) => {
		return (
			<View style={styles.rewardContainer}>
				<Reward
					style={{ alignItems: "center", justifyContent: "center" }}
					reward={item}
				/>
			</View>
		);
	};

	return (
		<View style={styles.root}>
			<Text style={styles.header}>Rewards</Text>
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
	modalContent: {
		flex: 1,
		width: "100%",
		alignItems: "center",
	},
	modalHeader: {
		fontSize: 30,
		textTransform: "uppercase",
		fontWeight: "900",
		textAlign: "center",
		color: "#f5f5f5",
		margin: 24,
	},
	modalRewardImage: {
		height: 130,
		aspectRatio: 1,
		margin: 18,
	},
	modalRewardDescription: {
		color: "#f5f5f5",
		fontWeight: "600",
		fontSize: 18,
		//textAlign: "center",
		padding: 18,
		lineHeight: 26,
	},
	modalRewardEarned: {
		color: "#DFB01C",
		fontWeight: "800",
		fontSize: 19,
		//textAlign: "center",
		alignSelf: "flex-start",
		padding: 18,
	},
	modalButton: {
		margin: 20,
		borderRadius: 12,
		borderStyle: "solid",
		borderWidth: 2,
		borderColor: "#695DDA",
		width: 150,
		alignSelf: "center",
	},
	modalButtonText: {
		color: "#f5f5f5",
		fontSize: 18,
		fontWeight: "800",
		textAlign: "center",
		padding: 16,
	},
});
