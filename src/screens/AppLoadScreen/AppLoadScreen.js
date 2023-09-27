import { Image, View } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../../assets/Images/Logo.png";

const AppLoadScreen = () => {
	const navigation = useNavigation();

	useEffect(() => {
		const timeout = setTimeout(() => {
			navigation.navigate("BottomTabs");
		}, 1000);

		return () => clearTimeout(timeout);
	}, [navigation]);

	return (
		<View
			style={{
				flex: 1,
				width: "75%",
				alignSelf: "center",
				justifySelf: "center",
				alignItems: "center",
				justifyContent: "center",
			}}>
			<Image
				source={Logo}
				style={{
					width: "95%",
					objectFit: "contain",
				}}
			/>
		</View>
	);
};

export default AppLoadScreen;
