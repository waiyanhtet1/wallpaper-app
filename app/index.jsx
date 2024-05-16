import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { theme } from "../constants/theme";
import { hp, wp } from "../helpers/common";

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("../assets/images/welcome.png")}
        style={styles.bgImage}
        resizeMode="cover"
      />

      {/* Linear Gradient */}
      <Animated.View entering={FadeInDown.duration(1000)} style={{ flex: 1 }}>
        <LinearGradient
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.5)",
            "white",
            "white",
          ]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        />

        {/* content */}
        <View style={styles.contentContainer}>
          <Animated.Text
            entering={FadeInDown.delay(400).springify()}
            style={styles.title}
          >
            💗💗💗
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(500).springify()}
            style={styles.quote}
          >
            To My Beloved 💗Chit Tone💗
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(600).springify()}>
            <Pressable
              style={styles.button}
              onPress={() => router.push("home")}
            >
              <Text style={styles.buttonText}>Start Explore</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    width: wp(100),
    height: hp(100),
    position: "absolute",
  },
  gradient: {
    width: wp(100),
    height: hp(65),
    position: "absolute",
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 20,
  },

  title: {
    fontSize: hp(6),
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.neutral(0.7),
  },

  quote: {
    fontSize: hp(2.3),
    letterSpacing: 0.6,
    marginBottom: 10,
    fontWeight: theme.fontWeight.medium,
  },

  button: {
    backgroundColor: theme.colors.neutral(0.9),
    padding: 15,
    paddingHorizontal: 90,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    marginBottom: 50,
  },

  buttonText: {
    color: theme.colors.white,
    fontSize: hp(2.2),
    letterSpacing: 1,
    fontWeight: theme.fontWeight.bold,
  },
});

export default WelcomeScreen;
