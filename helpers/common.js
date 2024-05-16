const { Dimensions } = require("react-native");

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export const wp = (percentage) => {
  const width = deviceWidth;
  return (percentage * width) / 100;
};

export const hp = (percentage) => {
  const height = deviceHeight;
  return (percentage * height) / 100;
};

export const getColumnCount = () => {
  if (deviceWidth >= 1024) {
    // desktop
    return 4;
  } else if (deviceWidth >= 768) {
    // tablet
    return 3;
  } else {
    // phone
    return 2;
  }
};

export const getImageSize = (width, height) => {
  if (width > height) {
    // landscape
    return 250;
  } else if (width < height) {
    // potrait
    return 300;
  } else {
    // square
    return 200;
  }
};
