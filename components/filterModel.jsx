import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { theme } from "../constants/theme";
import { hp } from "../helpers/common";
import Categories from "./categores";

const FilterModel = ({
  bottomSheetModalRef,
  selectedCategory,
  setSelectedCategory,
}) => {
  const snapPoints = useMemo(() => ["70%"], []);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={CustomBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>Filter By Date 🗓</Text>
          <View style={styles.yearList}>
            <View style={styles.yearContainer}>
              <Text style={styles.yearDate}>2023</Text>
              <Categories
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </View>
            <View style={styles.yearContainer}>
              <Text style={styles.yearDate}>2024</Text>
            </View>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const CustomBackdrop = ({ animatedIndex, style }) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    let opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      opacity,
    };
  });

  const containerStyle = [
    StyleSheet.absoluteFill,
    style,
    styles.overlay,
    containerAnimatedStyle,
  ];

  return (
    <Animated.View style={containerStyle}>
      {/* blur view */}
      <BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={50} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
    marginVertical: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.1)",
  },
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  contentTitle: {
    fontSize: hp(2.4),
  },
  yearDate: {
    fontSize: hp(2),
    fontWeight: theme.fontWeight.semibold,
    marginTop: 10,
  },
  yearList: {
    gap: 10,
  },
  yearContainer: {
    borderBottomWidth: 1,
    borderColor: theme.colors.neutral(0.2),
  },
});

export default FilterModel;
