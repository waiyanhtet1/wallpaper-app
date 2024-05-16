import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { firebase } from "../config";
import CategoryItem from "./categoryItem";

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

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

  const combineDuplicatesByDate = (arr) => {
    const dateMap = new Map();

    // Group objects by date
    arr.forEach((item) => {
      const date = item.date;
      if (!dateMap.has(date)) {
        dateMap.set(date, []);
      }
      dateMap.get(date).push(item);
    });

    // Combine objects for each date
    const combinedArray = [];
    dateMap.forEach((items, date) => {
      const combinedObject = items.reduce(
        (acc, obj) => {
          return { ...acc, ...obj };
        },
        { date }
      );
      combinedArray.push(combinedObject);
    });

    return combinedArray;
  };

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={3}
        contentContainerStyle={styles.flatlistContainer}
        showsHorizontalScrollIndicator={false}
        data={combineDuplicatesByDate(categories)}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <CategoryItem
            item={item}
            index={index}
            selectCategory={selectedCategory}
            setSelectCategory={setSelectedCategory}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  flatlistContainer: {
    gap: 5,
    // paddingHorizontal: wp(-4),
  },
});

export default Categories;
