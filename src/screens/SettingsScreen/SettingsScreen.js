/* eslint-disable react/no-unescaped-entities */
import {
	readBibleAgain,
	resetAllData,
} from "../../features/globalData/globalDataSlice";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Linking,
	Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import React, { useState } from "react";
import VerifyResetModal from "../../components/molecules/VerifyResetModal/VerifyResetModal";
import StyledTextButton from "../../components/atoms/StyledTextButton/StyledTextButton";
import colors from "../../constants/colors";

const SettingsScreen = () => {
	//GLOBAL STATE
	const dispatch = useDispatch();
	const userProgress = useSelector((state) => state.globalData.userProgress);
	const isBibleCompleted = userProgress.milestones[11].completed;

	//LOCAL STATE
	const [modalOpen, setModalOpen] = useState(false);
	const [modalOption, setModalOption] = useState({});
	const [aboutExpanded, setAboutExpanded] = useState(false);

	///OTHER VARIABLES
	//This will be parsed to render options
	const modalOptions = [
		{
			option: "readAgain",
			message:
				"This will remove all your current milestones as well as your book/chapter progress, but will NOT reset your total points. \n\nDo you wish to continue?",
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

	const handleReadMorePress = () => {
		setAboutExpanded(!aboutExpanded);
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
					<View style={styles.sectionContainer}>
						<Text style={styles.sectionTitle}>About</Text>
						<Text style={styles.textDescription}>
							Level-Up Bible helps you track your progress in reading the entire
							Bible. For additional accountability and encouragement there are
							some unique features:{"\n"}
						</Text>
						<View opacity={aboutExpanded ? 1 : 0.2}>
							<Text style={styles.textDescription}>
								<Text style={styles.bolded}>POINTS: </Text> Earn a point for
								every verse you read!{"\n"}
							</Text>
						</View>

						<View>
							{aboutExpanded && (
								<Text style={styles.textDescription}>
									<Text style={styles.bolded}>QUIZZES: </Text>There are quiz
									questions at the end of each chapter. A wrong answer will
									require you to re-read the chapter. Answering all three
									questions correctly will gain you points based on the number
									of verses in that chapter.{"\n\n"}
									<Text style={styles.bolded}>MILESTONES: </Text>There are
									milestones to unlock as you progress through the Bible. See
									the milestones tab for more info!{"\n\n"}
									We also plan for future updates to include more features, like
									networking with friends and a Bible verse memory game.{"\n\n"}
									Thank you for downloading Level-Up Bible!
								</Text>
							)}
						</View>
						<Pressable
							style={styles.readMorePressable}
							onPress={handleReadMorePress}>
							<View style={styles.readMoreView}>
								<Text style={styles.readMoreText}>
									{aboutExpanded ? "Collapse" : "Read More"}
								</Text>
								<FontAwesome5
									name={aboutExpanded ? "chevron-up" : "chevron-down"}
									color={colors.tertiary}
									size={18}
								/>
							</View>
						</Pressable>
					</View>
					<View style={styles.sectionContainer}>
						<Text style={styles.sectionTitle}>Read Again</Text>
						<Text style={styles.textDescription}>
							Reset chapter, book and milestones progress but{" "}
							<Text style={styles.readAgainTextHighlight}>
								preserve your current total points
							</Text>
							. This option is ideal for continuing to grow points with multiple
							re-readings of the Bible.{"\n\n"}(Only available if the whole
							Bible has been completed.)
						</Text>
						<StyledTextButton
							backgroundColor={colors.secondaryLight}
							margin={24}
							backgroundPressedColor={
								isBibleCompleted && colors.secondaryLighter
							}
							opacity={isBibleCompleted ? null : 0.5}
							onPress={isBibleCompleted ? handleReadAgainPress : null}>
							Read Bible Again
						</StyledTextButton>
					</View>
					<View style={styles.sectionContainer}>
						<Text style={[styles.sectionTitle]}>Reset All Data</Text>
						<Text style={styles.textDescription}>
							This is a complete reset. It is similiar to the option above but{" "}
							<Text style={styles.resetAllTextHighlight}>
								this option will also reset your total points back to zero.
							</Text>
						</Text>
						<StyledTextButton
							onPress={handleResetAllPress}
							backgroundColor={colors.quarternary}
							backgroundPressedColor={colors.quarternaryLight}
							margin={24}>
							Reset All Data
						</StyledTextButton>
					</View>
					<View style={styles.contactContainer}>
						<Text style={styles.sectionTitle}>Contact Us</Text>
						<Text style={styles.textDescription}>
							If you would like to get in touch to report an issue, ask a
							question, or just to say hello, please click the button below.
						</Text>
						<StyledTextButton
							onPress={handleContactPress}
							backgroundColor={colors.quinary}
							backgroundPressedColor={colors.quinaryLight}
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
		paddingHorizontal: 10,
	},
	container: {
		width: "100%",
		flex: 0,
	},
	header: {
		fontSize: 30,
		fontWeight: "900",
		textAlign: "center",
		color: colors.text,
		margin: 24,
		lineHeight: 40,
	},
	sectionContainer: {
		paddingVertical: 12,
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	sectionTitle: {
		color: colors.text,
		fontWeight: "800",
		fontSize: 24,
		textAlign: "left",
		paddingBottom: 12,
		paddingLeft: 10,
	},
	textDescription: {
		color: colors.text,
		fontWeight: "400",
		fontSize: 17,
		textAlign: "left",
		paddingHorizontal: 16,
		lineHeight: 21,
		letterSpacing: 0.1,
	},
	bolded: {
		fontWeight: "800",
		color: colors.tertiaryLight,
	},
	readMorePressable: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 16,
	},
	readMoreView: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	readMoreText: {
		color: colors.tertiary,
		fontWeight: "800",
		fontSize: 18,
		textAlign: "left",
		paddingHorizontal: 16,
		lineHeight: 21,
		letterSpacing: 0.1,
	},
	readAgainTextHighlight: {
		fontWeight: "800",
		fontSize: 18,
		color: colors.secondaryLighter,
	},
	resetAllTextHighlight: {
		fontWeight: "800",
		fontSize: 18,
		color: colors.quarternary,
	},
	contactContainer: {
		paddingVertical: 12,
		justifyContent: "flex-start",
		alignItems: "flex-start",
		marginBottom: 30,
	},
});
