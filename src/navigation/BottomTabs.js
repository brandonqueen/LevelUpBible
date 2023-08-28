import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import { View, StyleSheet } from "react-native";
import HeadNav from "../components/HeadNav/HeadNav";
import NotImplemented from "../screens/NotImplemented/NotImplemented";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

function BottomTabs() {
	return (
		<View style={styles.container}>
			<HeadNav />
			<Tab.Navigator
				screenOptions={{
					headerShown: false,
				}}>
				<Tab.Screen
					name="FRIENDS"
					component={NotImplemented}
					options={{
						tabBarIcon: ({ color, size }) => (
							<FontAwesome5 name="users" size={size} color={color} />
						),
					}}
				/>
				<Tab.Screen
					name="HOME"
					component={HomeScreen}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="home" color={color} size={size} />
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
