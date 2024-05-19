import { FontAwesome6 } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Timer from "../components/Timer";
import FilterModel from "../components/filterModel";
import ImageGrid from "../components/imageGrid";
import { firebase } from "../config";
import { theme } from "../constants/theme";
import { hp, wp } from "../helpers/common";

let postRef;

const HomeScreen = () => {
  const top = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;

  const [posts, setPosts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("default");

  // for bottomModel
  const bottomSheetModalRef = useRef(null);

  if (selectedCategory === "default") {
    postRef = firebase
      .firestore()
      .collection("postDB")
      .orderBy("date", "desc")
      .limit(10);
  } else {
    postRef = firebase
      .firestore()
      .collection("postDB")
      .orderBy("date", "desc")
      .where("date", "==", selectedCategory);
  }

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
  }, [selectedCategory]);

  // filter Model opener
  const openFilterModel = () => {
    bottomSheetModalRef.current.present();
  };

  const closeFilterModel = () => {
    bottomSheetModalRef.current.close();
  };

  return (
    <View style={[styles.container, { paddingTop }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>My Precious 💖</Text>
        </Pressable>
        <Pressable onPress={openFilterModel}>
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
          <Timer targetDate="2023-09-14T00:00:00" />
          {/* result date */}
          {selectedCategory !== "default" ? (
            <Text style={styles.resultDate}>In "{selectedCategory}"</Text>
          ) : (
            <Text style={styles.resultDate}>❤</Text>
          )}

          {/* image gird */}
          <View>{posts.length > 0 && <ImageGrid posts={posts} />}</View>
          <FilterModel
            bottomSheetModalRef={bottomSheetModalRef}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
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
  resultDate: {
    fontSize: hp(2.3),
    fontWeight: theme.fontWeight.bold,
    paddingHorizontal: wp(4),
    // paddingVertical: wp(4),
    alignSelf: "center",
  },
});

export default HomeScreen;
