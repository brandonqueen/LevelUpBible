const imageContext = require.context(
	"./RewardsIcons",
	false,
	/\.(png|jpg|jpeg|gif)$/
);

const RewardsIcons = {};

imageContext.keys().forEach((key) => {
	const imageName = key.replace("./", ""); // Remove the "./" prefix
	RewardsIcons[imageName] = imageContext(key);
});

export default RewardsIcons;
