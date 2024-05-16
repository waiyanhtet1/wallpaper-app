import { Image, Pressable, StyleSheet, View } from "react-native";
import { theme } from "../constants/theme";
import { getImageSize, wp } from "../helpers/common";

const ImageCard = ({ item, index, columns }) => {
  const getImageHeight = () => {
    let { imageWidth, imageHeight } = item;
    return { height: getImageSize(imageWidth, imageHeight) };
  };

  const isInLastRow = () => {
    return (index + 1) % columns === 0;
  };

  return (
    <View>
      <Pressable
        style={[styles.imageWrapper, !isInLastRow() && styles.spacing]}
      >
        <Image
          style={[styles.image, getImageHeight()]}
          source={{ uri: item.image }}
          transition={100}
        />
      </Pressable>
      {/* <Text>{item.date}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
  },
  imageWrapper: {
    backgroundColor: theme.colors.grayBG,
    borderRadius: theme.radius.sm,
    overflow: "hidden",
    marginBottom: wp(2),
  },
  spacing: {
    marginRight: wp(2),
  },
});

export default ImageCard;
