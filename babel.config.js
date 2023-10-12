// eslint-disable-next-line no-undef
module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: ["react-native-paper/babel", "react-native-reanimated/plugin"],
	};
};
