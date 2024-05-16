import { MasonryFlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, View } from "react-native";
import { getColumnCount, wp } from "../helpers/common";
import ImageCard from "./imageCard";

const ImageGrid = ({ posts }) => {
  const columns = getColumnCount();

  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={posts}
        numColumns={columns}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <ImageCard item={item} index={index} columns={columns} />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: wp(100),
  },
  listContainer: {
    paddingHorizontal: wp(4),
  },
});

export default ImageGrid;
