import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../constants/theme";
import { hp } from "../helpers/common";

const AnniversaryCountdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const target = new Date(targetDate);

    let years = now.getFullYear() - target.getFullYear();
    let months = now.getMonth() - target.getMonth();
    let days = now.getDate() - target.getDate();
    let hours = now.getHours() - target.getHours();
    let minutes = now.getMinutes() - target.getMinutes();
    let seconds = now.getSeconds() - target.getSeconds();

    if (seconds < 0) {
      seconds += 60;
      minutes -= 1;
    }
    if (minutes < 0) {
      minutes += 60;
      hours -= 1;
    }
    if (hours < 0) {
      hours += 24;
      days -= 1;
    }
    if (days < 0) {
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += lastMonth.getDate();
      months -= 1;
    }
    if (months < 0) {
      months += 12;
      years -= 1;
    }

    return { years, months, days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>❤ We have been for ❤</Text>
      <Text style={styles.duration}>
        {timeLeft.years !== 0 && `${timeLeft.years} years,`} {timeLeft.months}{" "}
        months, {timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes}{" "}
        minutes, {timeLeft.seconds} seconds
      </Text>
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontSize: hp(1.9),
  },
  duration: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeight.bold,
  },
});

export default AnniversaryCountdown;
