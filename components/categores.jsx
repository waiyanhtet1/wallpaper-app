import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import CategoryItem from "./categoryItem";

const Categories = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={3}
        contentContainerStyle={styles.flatlistContainer}
        showsHorizontalScrollIndicator={false}
        data={categories}
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
