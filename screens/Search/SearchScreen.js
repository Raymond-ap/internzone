import { Text, View, SafeAreaView } from "react-native";
import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";

export class SearchScreen extends Component {
  render() {
    return (
      <SafeAreaView className="bg-white" style={{ flex: 1 }}>
        <Text>SearchScreen</Text>
        <StatusBar style="dark" backgroundColor="#fff" translucent={false} />
      </SafeAreaView>
    );
  }
}

export default SearchScreen;
