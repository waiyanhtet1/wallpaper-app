import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import React, { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { firebase } from "../config";
import { theme } from "../constants/theme";
import { hp } from "../helpers/common";
import { combineDuplicatesByDate } from "../helpers/dateHandler";
import Categories from "./categores";

const FilterModel = ({
  bottomSheetModalRef,
  selectedCategory,
  setSelectedCategory,
}) => {
  const snapPoints = useMemo(() => ["70%"], []);
  const [categories, setCategories] = useState([]);

  const color =
    selectedCategory === "default"
      ? theme.colors.white
      : theme.colors.neutral(0.8);
  const backgroundColor =
    selectedCategory === "default"
      ? theme.colors.neutral(0.8)
      : theme.colors.white;

  const categoryRef = firebase
    .firestore()
    .collection("postDB")
    .orderBy("date", "desc");

  const getCategory = () => {
    categoryRef.onSnapshot((querySnapshot) => {
      const categoryData = [];

      querySnapshot.forEach((doc) => {
        const { date } = doc.data();
        categoryData.push({
          id: doc.id,
          date,
        });
      });
      setCategories(categoryData);
    });
  };

  useEffect(() => {
    getCategory();
  }, []);

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
          {/* default date */}
          <Pressable
            style={[styles.defaultDate, { backgroundColor }]}
            onPress={() => setSelectedCategory("default")}
          >
            <Text style={{ color }}>All</Text>
          </Pressable>
          <View style={styles.yearList}>
            <View style={styles.yearContainer}>
              <Text style={styles.yearDate}>2023</Text>
              <Categories
                categories={combineDuplicatesByDate(categories)}
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
  },
  contentTitle: {
    fontSize: hp(2.4),
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  yearDate: {
    fontSize: hp(2),
    fontWeight: theme.fontWeight.semibold,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  yearList: {
    gap: 10,
  },
  yearContainer: {
    // borderBottomWidth: 1,
    borderColor: theme.colors.neutral(0.2),
  },
  defaultDate: {
    padding: 10,
    paddingHorizontal: 10,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.neutral(0.1),
    marginLeft: 8,
    backgroundColor: theme.colors.neutral(0.8),
    width: 100,
    marginBottom: 10,
  },
  defaultDateText: {
    color: "white",
  },
});

export default FilterModel;
