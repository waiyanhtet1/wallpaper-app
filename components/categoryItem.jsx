import { Pressable, StyleSheet, Text } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { theme } from "../constants/theme";
import { hp } from "../helpers/common";

const CategoryItem = ({ item, index, selectCategory, setSelectCategory }) => {
  const color =
    selectCategory === item.date
      ? theme.colors.white
      : theme.colors.neutral(0.8);
  const backgroundColor =
    selectCategory === item.date
      ? theme.colors.neutral(0.8)
      : theme.colors.white;

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 50)
        .duration(50)
        .springify()}
    >
      <Pressable
        onPress={() => setSelectCategory(item.date)}
        style={[styles.category, { backgroundColor }]}
      >
        <Text style={(styles.text, { color })}>{item.date}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  category: {
    padding: 10,
    paddingHorizontal: 10,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.neutral(0.1),
    marginLeft: 8,
  },
  text: {
    fontSize: hp(1),
  },
});
export default CategoryItem;
