import {
	StyleSheet,
	ScrollView,
	View,
	Text,
	ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

const BibleScreen = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [response, setResponse] = useState("");
	const [selectedPassage, setSelectedPassage] = useState("Jn 3");

	useEffect(() => {
		if (selectedPassage != "") {
			axios({
				method: "get",
				url: "https://api.esv.org/v3/passage/text/",
				params: {
					q: selectedPassage,
					"include-passage-references": false,
					"include-short-copyright": false,
					"include-verse-numbers": false,
					"include-footnotes": false,
					"include-headings": false,
				},
				headers: {
					Authorization: "Token f636017b5f40767318894388ecec11f031f2efc6",
				},
			})
				.then((res) => {
					console.log("RES: ", JSON.stringify(res?.data, null, 2));
					setIsLoading(false);
					setResponse(res?.data?.passages);
				})
				.catch((error) => {
					console.log(`Error: `, JSON.stringify(error));
					setIsLoading(false);
					setError(error);
				});
		}
	}, [selectedPassage]);

	const getContent = () => {
		if (isLoading) {
			return <ActivityIndicator size="large" />;
		}
		if (error) {
			console.error(error);
		}
		console.log(response);
		//return <Text style={styles.text}>{response.text}</Text>;
	};

	return (
		<View style={styles.root}>
			<View style={styles.card}>
				{isLoading ? (
					<ActivityIndicator size="large" style={{ alignSelf: "center" }} />
				) : (
					<ScrollView style={styles.scroll}>
						<Text style={styles.text}>{response}</Text>
					</ScrollView>
				)}
			</View>
		</View>
	);
};

export default BibleScreen;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	card: {
		width: "95%",
		height: "95%",
		backgroundColor: "rgb(11,14,29)",
		borderRadius: 12,
		padding: 24,
		justifyContent: "center",
		alignItems: "center",
	},
	scroll: {
		flex: 1,
	},
	text: {
		color: "#f5f5f5",
		fontSize: 24,
		fontWeight: "500",
	},
});
