import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { View, StyleSheet } from "react-native";
import HeadNav from "../components/HeadNav/HeadNav";
import NotImplemented from "../screens/NotImplemented/NotImplemented";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BibleStack from "./BibleStack";

const Tab = createBottomTabNavigator();

function BottomTabs() {
	return (
		<View style={styles.container}>
			<Tab.Navigator
				screenOptions={{
					headerShown: false,
					tabBarInactiveTintColor: "#f5f5f5",
					tabBarActiveTintColor: "#695DDA",
					tabBarStyle: {
						backgroundColor: "rgb(22,30,57)",
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
					name="REWARDS"
					component={NotImplemented}
					options={{
						tabBarIcon: ({ color, size }) => (
							<FontAwesome name="star" size={size} color={color} />
						),
					}}
				/>
				<Tab.Screen
					name="FRIENDS"
					component={NotImplemented}
					options={{
						tabBarIcon: ({ color, size }) => (
							<FontAwesome5 name="users" size={size} color={color} />
						),
					}}
				/>
			</Tab.Navigator>
		</View>
	);
}

export default BottomTabs;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
