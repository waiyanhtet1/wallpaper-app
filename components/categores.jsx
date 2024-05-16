import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { data } from "../constants/data";
import { wp } from "../helpers/common";
import CategoryItem from "./categoryItem";

const Categories = () => {
  const [category, setCategory] = useState("");

  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.flatlistContainer}
      showsHorizontalScrollIndicator={false}
      data={data.categories}
      keyExtractor={(item) => item}
      renderItem={({ item, index }) => (
        <CategoryItem
          title={item}
          index={index}
          category={category}
          setCategory={setCategory}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingHorizontal: wp(4),
    gap: 8,
  },
});

export default Categories;
