import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChooseChapterScreen from "../screens/ChooseChapterScreen/ChooseChapterScreen";
import BibleScreen from "../screens/BibleScreen/BibleScreen";

const Stack = createNativeStackNavigator();

const BibleStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="ChooseChapter"
				component={ChooseChapterScreen}
				initialParams={{ prevScreen: "" }}
			/>
			<Stack.Screen name="Bible" component={BibleScreen} />
		</Stack.Navigator>
	);
};

export default BibleStack;
