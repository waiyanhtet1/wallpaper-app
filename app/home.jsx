import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Categories from "../components/categores";
import ImageGrid from "../components/imageGrid";
import { firebase } from "../config";
import { theme } from "../constants/theme";
import { hp, wp } from "../helpers/common";

const HomeScreen = () => {
  const top = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;

  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const postRef = firebase
    .firestore()
    .collection("postDB")
    .orderBy("date", "desc")
    .limit(6);
  const [isLoading, setisLoading] = useState(false);

  const getPosts = () => {
    setisLoading(true);
    postRef.onSnapshot((querySnapshot) => {
      const postData = [];
      querySnapshot.forEach((doc) => {
        const { date, image } = doc.data();
        postData.push({
          id: doc.id,
          date,
          image,
        });
      });
      setPosts(postData);
      setisLoading(false);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <View style={[styles.container, { paddingTop }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>My Precious 💖</Text>
        </Pressable>
        <Pressable>
          <FontAwesome6
            name="bars-staggered"
            size={26}
            color={theme.colors.neutral(0.9)}
          />
        </Pressable>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView contentContainerStyle={{ gap: 15 }}>
          {/* search bar */}
          <View style={styles.searchBar}>
            <View style={styles.searchIcon}>
              <Feather name="search" size={24} color="black" />
            </View>
            <TextInput
              placeholder="Search..."
              style={styles.searchInput}
              value={search}
              onChangeText={(value) => setSearch(value)}
            />
            {search && (
              <Pressable style={styles.closeIcon}>
                <AntDesign
                  name="close"
                  size={24}
                  color={theme.colors.neutral(0.6)}
                />
              </Pressable>
            )}
          </View>

          {/* categories */}
          <View style={styles.categories}>
            <Categories />
          </View>

          {/* image gird */}
          <View>{posts.length > 0 && <ImageGrid posts={posts} />}</View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: hp(2.5),
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.neutral(0.9),
  },
  searchBar: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.white,
    padding: 6,
    borderRadius: theme.radius.lg,
    paddingLeft: 10,
  },
  searchIcon: {
    padding: 8,
  },

  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.sm,
  },
});

export default HomeScreen;
