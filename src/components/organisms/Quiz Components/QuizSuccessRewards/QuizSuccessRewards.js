import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Reward from "../../../atoms/Reward/Reward";
import colors from "../../../../constants/colors";

const QuizSuccessRewards = ({ newRewards }) => {
	const rewardState = useSelector(
		(state) => state.globalData.userProgress.rewards
	);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				{newRewards.length > 1
					? "You also earned new rewards!"
					: "You also earned a new reward!"}
			</Text>
			<View style={styles.rewardsContainer}>
				<FlatList
					scrollEnabled={false}
					data={newRewards}
					horizontal={true}
					keyExtractor={(item, index) => `New reward index: ${index}`}
					renderItem={({ item, index }) => {
						const rewardIndex = rewardState.findIndex(
							(rewardObj) => rewardObj.title === item
						);
						const newRewardToRender = rewardState[rewardIndex];
						return (
							<View style={styles.reward}>
								<Reward reward={newRewardToRender} />
							</View>
						);
					}}
				/>
			</View>
		</View>
	);
};

export default QuizSuccessRewards;

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
	rewardsContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
	reward: {
		marginHorizontal: 16,
	},
});
