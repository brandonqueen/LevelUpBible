// eslint-disable-next-line no-undef
const imageContext = require.context(
	"./MilestonesIcons",
	false,
	/\.(png|jpg|jpeg|gif)$/
);

const MilestonesIcons = {};

imageContext.keys().forEach((key) => {
	const imageName = key.replace("./", ""); // Remove the "./" prefix
	MilestonesIcons[imageName] = imageContext(key);
});

export default MilestonesIcons;
