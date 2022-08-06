import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../../firebase";

export class SearchScreen extends Component {
  state = {
    search: "",
    data: [],
    isLoading: false,
    error: null,
    scrollHeight: 0,
  };

  handleSearch = async (search) => {};

  render() {
    return (
      <SafeAreaView className="bg-white" style={{ flex: 1 }}>
        <View
          className={`px-3 py-3 flex flex-row items-center ${
            this.state.scrollHeight > 0
              ? "border-b border-gray-400 shadow-lg"
              : ""
          }`}
        >
          <TouchableOpacity
            className="mr-2"
            onPress={() => this.props.navigation.goBack()}
          >
            <Ionicons name="ios-arrow-back" size={25} color="black" />
          </TouchableOpacity>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Search jobs by keyword..."
            className="w-full bg-gray-200 text-gray-800 text-base rounded-lg px-3 py-2"
            onChangeText={(search) => {
              this.setState({ search });
              this.handleSearch(search);
            }}
            value={this.state.search}
          />
        </View>
        <View className="px-3 py-4"></View>
        <StatusBar style="dark" backgroundColor="#fff" translucent={false} />
      </SafeAreaView>
    );
  }
}

export default SearchScreen;
