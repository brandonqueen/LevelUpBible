import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableHighlight,
	Linking,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
	readBibleAgain,
	resetAllData,
} from "../../features/globalData/globalDataSlice";
import ModalPopup from "../../components/ModalPopup/ModalPopup";

const SettingsScreen = () => {
	//nav
	const navigation = useNavigation();

	//global state setter
	const dispatch = useDispatch();
	const userProgress = useSelector((state) => state.globalData.userProgress);
	const isBibleCompleted = userProgress.rewards[11].completed;

	//local state
	const [modalOpen, setModalOpen] = useState(false);
	const [modalOption, setModalOption] = useState({});

	const modalOptions = [
		{
			option: "readAgain",
			message:
				"This will remove all your current rewards as well as your book/chapter progress. \n\nContinue?",
			color: "#8174fc",
		},
		{
			option: "resetAll",
			message:
				"This option will reset ALL progress, including your total points.\n\n Continue?",
			color: "#fc4c4e",
		},
	];

	const VerifyResetModal = () => {
		return (
			<ModalPopup modalOpen={modalOpen} modalToggle={modalToggle}>
				<ScrollView>
					<Text style={styles.header}>WARNING!{"\n"}⚠️</Text>
					<Text style={[styles.textDescription, { fontSize: 20 }]}>
						{modalOption.message}
					</Text>
					{modalOption.option === "readAgain" ? (
						<TouchableHighlight
							style={[styles.button, { backgroundColor: "#695DDA" }]}
							onPress={handleReadAgain}
							activeOpacity={1}
							underlayColor="#8174fc">
							<Text style={styles.buttonText}>Read Bible Again</Text>
						</TouchableHighlight>
					) : (
						<TouchableHighlight
							style={[styles.button, { backgroundColor: "#db3537" }]}
							onPress={handleResetAll}
							activeOpacity={1}
							underlayColor="#fc4c4e">
							<Text style={styles.buttonText}>Reset All Data</Text>
						</TouchableHighlight>
					)}
					<TouchableHighlight
						style={[styles.button, { backgroundColor: "#f5f5f5" }]}
						onPress={modalToggle}>
						<Text style={[styles.buttonText, { color: "#1c1b1b" }]}>
							Cancel
						</Text>
					</TouchableHighlight>
				</ScrollView>
			</ModalPopup>
		);
	};

	//Press Handlers
	const modalToggle = () => {
		setModalOpen(!modalOpen);
	};

	const handleReadAgainPress = () => {
		setModalOpen(!modalOpen);
		setModalOption(modalOptions[0]);
	};

	const handleReadAgain = () => {
		dispatch(readBibleAgain());
		modalToggle();
	};
	const handleResetAllPress = () => {
		setModalOpen(!modalOpen);
		setModalOption(modalOptions[1]);
	};
	const handleResetAll = () => {
		dispatch(resetAllData());
		modalToggle();
	};

	const handleContactPress = () => {
		Linking.openURL("mailto:levelupbible@gmail.com");
	};

	return (
		<View style={styles.root}>
			<VerifyResetModal />
			<ScrollView
				style={{ width: "100%", flex: 0 }}
				showsVerticalScrollIndicator={false}>
				<Text style={styles.header}>Settings</Text>
				<View
					style={{
						width: "100%",
						alignItems: "flex-start",
						justifyContent: "flex-start",
					}}>
					<View style={styles.optionContainer}>
						<Text style={[styles.optionTitle]}>Read Again</Text>
						<Text style={styles.textDescription}>
							Reset chapter, book and rewards progress but{" "}
							<Text
								style={{
									fontWeight: "800",
									fontSize: 18,
									color: "#7b6efa",
								}}>
								preserve your current overall points
							</Text>
							. This option is ideal for continuing to grow points with multiple
							re-readings of the Bible.{"\n\n"} * Only available if the whole
							Bible has been completed.
						</Text>
						<TouchableHighlight
							style={[
								styles.button,
								{ backgroundColor: "#695DDA" },
								isBibleCompleted ? null : { opacity: 0.5 },
							]}
							onPress={isBibleCompleted ? handleReadAgainPress : null}
							activeOpacity={1}
							underlayColor="#8174fc">
							<Text style={styles.buttonText}>Read Bible Again</Text>
						</TouchableHighlight>
					</View>
					<View style={styles.optionContainer}>
						<Text style={[styles.optionTitle]}>Reset All Data</Text>
						<Text style={styles.textDescription}>
							Reset all data. Same as option above but{" "}
							<Text
								style={{
									fontWeight: "800",
									fontSize: 18,
									color: "#db3537",
								}}>
								this will also reset your current points back to zero.
							</Text>
						</Text>
						<TouchableHighlight
							style={[styles.button, { backgroundColor: "#db3537" }]}
							onPress={handleResetAllPress}
							activeOpacity={1}
							underlayColor="#fc4c4e">
							<Text style={styles.buttonText}>Reset All Data</Text>
						</TouchableHighlight>
					</View>
					<View style={[styles.optionContainer, { marginBottom: 30 }]}>
						<Text style={styles.optionTitle}>Contact</Text>
						<Text style={styles.textDescription}>
							If you would like to get in touch to report an issue, ask a
							question, or just to say hello, please click the button below.
						</Text>
						<TouchableHighlight
							style={styles.button}
							onPress={handleContactPress}
							activeOpacity={1}
							underlayColor="#1c1b1b">
							<Text style={styles.buttonText}>Contact Us</Text>
						</TouchableHighlight>
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
	button: {
		margin: 24,
		borderRadius: 12,
		backgroundColor: "#0f0f0f",
		width: 200,
		alignSelf: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "800",
		textAlign: "center",
		padding: 16,
	},
});
