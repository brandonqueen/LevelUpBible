import { StyleSheet, Text, View } from "react-native";
import React from "react";

const BibleScreen = () => {
	return (
		<View style={{flex:1}}>
			<View style={styles.card}>
                <Text>Hello</Text>
            </View>
		</View>
	);
};

export default BibleScreen;

const styles = StyleSheet.create({
	card: {
        flex: 1,
        backgroundColor: "red",
        height: "100%",
        width: "100%"
	},
});
