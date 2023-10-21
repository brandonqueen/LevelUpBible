import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";
import MilestonesScreen from "../screens/MilestonesScreen/MilestonesScreen";
import BibleStack from "./BibleStack";
import HomeScreen from "../screens/HomeScreen";
import colors from "../constants/colors";
import React from "react";
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function BottomTabs() {
	const MyTheme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			background: colors.primary,
		},
	};
	return (
		<NavigationContainer theme={MyTheme}>
			<View style={styles.container}>
				<Tab.Navigator
					initialRouteName="HOME"
					safeAreaInsets={{ bottom: 8 }}
					screenOptions={{
						headerShown: false,
						tabBarInactiveTintColor: colors.text,
						tabBarActiveTintColor: colors.secondary,
						tabBarLabelStyle: { padding: 0 },
						tabBarStyle: {
							backgroundColor: colors.primary,
							borderTopWidth: 0,
						},
					}}>
					<Tab.Screen
						name="HOME"
						component={HomeScreen}
						options={{
							tabBarIcon: ({ color, size }) => (
								<FontAwesome5 name="home" color={color} size={size} />
							),
						}}
					/>
					<Tab.Screen
						name="BIBLE"
						component={BibleStack}
						key="BibleStackKey"
						options={{
							tabBarIcon: ({ color, size }) => (
								<FontAwesome5 name="bible" size={size} color={color} />
							),
						}}
					/>
					<Tab.Screen
						name="MILESTONES"
						component={MilestonesScreen}
						options={{
							tabBarIcon: ({ color, size }) => (
								<MaterialCommunityIcons name="map-marker-path" size={size} color={color} />
							),
						}}
					/>
					<Tab.Screen
						name="SETTINGS"
						component={SettingsScreen}
						options={{
							tabBarIcon: ({ color, size }) => (
								<FontAwesome name="user" size={size} color={color} />
							),
						}}
					/>
				</Tab.Navigator>
			</View>
		</NavigationContainer>
	);
}

export default BottomTabs;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 8,
	},
});
