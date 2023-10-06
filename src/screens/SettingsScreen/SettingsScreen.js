import {
	readBibleAgain,
	resetAllData,
} from "../../features/globalData/globalDataSlice";
import { StyleSheet, Text, View, ScrollView, Linking } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import VerifyResetModal from "../../components/molecules/VerifyResetModal/VerifyResetModal";
import StyledTextButton from "../../components/atoms/StyledTextButton/StyledTextButton";

const SettingsScreen = () => {
	//nav
	const navigation = useNavigation();

	//global state updater
	const dispatch = useDispatch();

	//get current global state
	const userProgress = useSelector((state) => state.globalData.userProgress);
	const isBibleCompleted = userProgress.rewards[11].completed;

	//local state
	const [modalOpen, setModalOpen] = useState(false);
	const [modalOption, setModalOption] = useState({});

	//This will be parsed to render options
	const modalOptions = [
		{
			option: "readAgain",
			message:
				"This will remove all your current rewards as well as your book/chapter progress. \n\nDo you wish to continue?",
		},
		{
			option: "resetAll",
			message:
				"This option will reset ALL progress, including your total points.\n\nDo you wish to continue?",
		},
	];

	//Press Handlers
	const modalToggle = () => {
		setModalOpen(!modalOpen);
	};

	const handleReadAgainPress = () => {
		setModalOpen(!modalOpen);
		setModalOption(modalOptions[0]);
	};

	const handleReadAgainConfirm = () => {
		dispatch(readBibleAgain());
		modalToggle();
	};
	const handleResetAllPress = () => {
		setModalOpen(!modalOpen);
		setModalOption(modalOptions[1]);
	};
	const handleResetAllConfirm = () => {
		dispatch(resetAllData());
		modalToggle();
	};

	const handleContactPress = () => {
		Linking.openURL("mailto:levelupbible@gmail.com");
	};

	return (
		<View style={styles.root}>
			<VerifyResetModal
				modalOpen={modalOpen}
				modalToggle={modalToggle}
				modalOption={modalOption}
				handleReadAgain={handleReadAgainConfirm}
				handleResetAll={handleResetAllConfirm}
			/>
			<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
				<Text style={styles.header}>Settings</Text>
				<View>
					<View style={styles.optionContainer}>
						<Text style={[styles.optionTitle]}>Read Again</Text>
						<Text style={styles.textDescription}>
							Reset chapter, book and rewards progress but{" "}
							<Text style={styles.readAgainTextHighlight}>
								preserve your current overall points
							</Text>
							. This option is ideal for continuing to grow points with multiple
							re-readings of the Bible.{"\n\n"}( Only available if the whole
							Bible has been completed. )
						</Text>
						<StyledTextButton
							backgroundColor={"#695DDA"}
							margin={24}
							backgroundPressedColor={isBibleCompleted && "#8174fc"}
							opacity={isBibleCompleted ? null : 0.5}
							onPress={isBibleCompleted ? handleReadAgainPress : null}>
							Read Bible Again
						</StyledTextButton>
					</View>
					<View style={styles.optionContainer}>
						<Text style={[styles.optionTitle]}>Reset All Data</Text>
						<Text style={styles.textDescription}>
							Reset all data. Same as option above but{" "}
							<Text style={styles.resetAllTextHighlight}>
								this will also reset your current points back to zero.
							</Text>
						</Text>
						<StyledTextButton
							onPress={handleResetAllPress}
							backgroundColor={"#db3537"}
							backgroundPressedColor={"#fc4c4e"}
							margin={24}>
							Reset All Data
						</StyledTextButton>
					</View>
					<View style={styles.contactContainer}>
						<Text style={styles.optionTitle}>Contact</Text>
						<Text style={styles.textDescription}>
							If you would like to get in touch to report an issue, ask a
							question, or just to say hello, please click the button below.
						</Text>
						<StyledTextButton
							onPress={handleContactPress}
							backgroundColor={"#0f0f0f"}
							backgroundPressedColor={"#1c1b1b"}
							margin={24}>
							Contact Us
						</StyledTextButton>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default SettingsScreen;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
	container: {
		width: "100%",
		flex: 0,
	},
	header: {
		fontSize: 30,
		fontWeight: "900",
		textAlign: "center",
		color: "#f5f5f5",
		margin: 24,
		lineHeight: 40,
	},
	optionContainer: {
		paddingVertical: 12,
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	optionTitle: {
		color: "#f5f5f5",
		fontWeight: "800",
		fontSize: 24,
		textAlign: "left",
		paddingBottom: 12,
		paddingLeft: 10,
	},
	textDescription: {
		color: "#f5f5f5",
		fontWeight: "400",
		fontSize: 16,
		textAlign: "left",
		paddingHorizontal: 16,
	},
	readAgainTextHighlight: {
		fontWeight: "800",
		fontSize: 18,
		color: "#7b6efa",
	},
	resetAllTextHighlight: {
		fontWeight: "800",
		fontSize: 18,
		color: "#db3537",
	},
	contactContainer: {
		paddingVertical: 12,
		justifyContent: "flex-start",
		alignItems: "flex-start",
		marginBottom: 30,
	},
});
