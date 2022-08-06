import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import LottieView from 'lottie-react-native'

const AnimatedLoader = () => {
  return (
    <View style={[styles.container, StyleSheet.absoluteFillObject]}>
      <LottieView
        source={require("../assets/99297-loading-files.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default AnimatedLoader;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
