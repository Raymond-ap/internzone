import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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
        {this.state.data.length > 0 && (
          <View className="px-3 py-2 flex flex-row items-center justify-between">
            <Text className="text-gray-800 font-semibold text-sm capitalize">{`10 Results found`}</Text>
            <TouchableOpacity activeOpacity={0.8}>
              <Text className="text-blue-500 font-semibold text-sm capitalize">
                clear all
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View className="px-3 py-3"></View>
        <StatusBar style="dark" backgroundColor="#fff" translucent={false} />
      </SafeAreaView>
    );
  }
}

const ResultCard = ({ data }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className="flex flex-row w-full justify-between my-1 px-1 py-1 hover:bg-gray-100 "
    >
      <View style={{ flex: 1 }} className="flex flex-row items-center">
        <View className="w-14 h-14 rounded-full bg-blue-500" />
        <View style={{ flex: 1 }} className="mx-3">
          <Text className="text-gray-900 text-sm font-bold tracking-wider">
            Senior Software Engineer at Google
          </Text>
          <Text className="text-gray-900 text-sm font-bold tracking-wider">
            Google Inc.
          </Text>
          <View className="flex flex-row items-center justify-between my-1">
            <Text className="text-gray-500 text-xs font-semibold tracking-wider">
              Accra - Ghana
            </Text>
            <Text className="text-gray-500 text-xs font-semibold tracking-wider">
              $50,000 - $60,000
            </Text>
          </View>
        </View>
      </View>
      <View className="">
        <TouchableOpacity activeOpacity={0.8}>
          <Ionicons name="ios-bookmark-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default SearchScreen;
