import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
// import LottieView from 'lottie-react-native'

const AnimatedLoader = () => {
  return (
    <View style={[styles.container, StyleSheet.absoluteFillObject]}>
        <ActivityIndicator size={"large"} color={"#fff"} />
        {/* <LottieView source={require('../assets/images/99257-loading-gif-animation.json')} autoPlay loop /> */}
    </View>
  );
};

export default AnimatedLoader;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000061",
  },
});
