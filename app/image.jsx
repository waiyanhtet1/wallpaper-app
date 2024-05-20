import { AntDesign } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { theme } from "../constants/theme";
import { hp, wp } from "../helpers/common";

const ImageScreen = () => {
  const containerStyle = [StyleSheet.absoluteFill, styles.container];
  const item = useLocalSearchParams();
  const router = useRouter();

  const getSize = () => {
    return {
      width: 350,
      height: 500,
    };
  };

  const fileName = item.image.split("/")[7].split("-")[0] + ".png";
  const imageUrl = item.image + ".png";
  console.log(fileName);
  console.log(imageUrl);

  // const downloadFile = async()

  const handleDownload = async () => {};

  return (
    <BlurView style={containerStyle} tint="dark" intensity={120}>
      <View style={[]}>
        <Image
          style={[styles.image, getSize()]}
          source={{ uri: item.image }}
          transition={100}
        />
      </View>
      <View style={styles.buttons}>
        <Animated.View entering={FadeInDown.springify()}>
          <Pressable style={styles.button} onPress={() => router.back()}>
            <AntDesign name="close" size={24} color="white" />
          </Pressable>
        </Animated.View>
        {/* <Animated.View entering={FadeInDown.springify().delay(100)}>
          <Pressable style={styles.button} onPress={handleDownload}>
            <AntDesign name="download" size={24} color="white" />
          </Pressable>
        </Animated.View> */}
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp(4),
    backgroundColor: " rgba(0, 0, 0, 0.5)",
  },
  image: {
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255,255,255,0.1)",
  },
  buttons: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 50,
  },

  button: {
    width: hp(6),
    height: hp(6),
    backgroundColor: "rgba(255,255,255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.lg,
  },
});

export default ImageScreen;
