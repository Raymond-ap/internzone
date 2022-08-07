import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { db } from "../../firebase";
import { AnimatedLoader } from "../../components";
import { ToogleBookman } from "../../utils/Bookman";

export class SearchScreen extends Component {
  state = {
    search: "",
    data: [],
    masterData: [],
    isLoading: false,
    error: null,
    scrollHeight: 0,
    searching: false,
  };

  handleSearch = async () => {
    this.setState({ searching: true });
    const { search } = this.state;
    const data = await db.collection("listings").onSnapshot((snapshot) => {
      const listings = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      let results = listings.filter((listing) => {
        return listing.title.toLowerCase().includes(search.toLowerCase());
      });
      if (results.length > 0) {
        this.setState({ data: results, searching: false });
      } else {
        this.setState({ data: [], searching: false });
      }
    });
  };

  componentDidMount() {}

  render() {
    console.log(this.state.data);
    return (
      <SafeAreaView className="bg-white" style={{ flex: 1 }}>
        <View
          className={`px-3 py-3 flex flex-row items-center z-50 ${
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
              this.handleSearch();
            }}
            value={this.state.search.trim()}
          />
        </View>

        <View className="px-3 py-3">
          {this.state.data.length > 0 ? (
            <FlatList
              data={this.state.data}
              keyExtractor={(_, index) => index.toString()}
              ItemSeparatorComponent={() => (
                <View className="border-b border-gray-300" />
              )}
              showsVerticalScrollIndicator={false}
              onScroll={(e) => {
                const scrollHeight = e.nativeEvent.contentOffset.y;
                this.setState({ scrollHeight });
              }}
              renderItem={({ item }) => (
                <ResultCard data={item} navigation={this.props.navigation} />
              )}
            />
          ) : this.state.searching ? (
            <AnimatedLoader />
          ) : (
            <View className="text-center">
              <Text className="text-gray-600 text-base">
                No matching results found
              </Text>
            </View>
          )}
        </View>
        <StatusBar style="dark" backgroundColor="#fff" translucent={false} />
        {this.state.searching && <AnimatedLoader />}
      </SafeAreaView>
    );
  }
}

const ResultCard = ({ data, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ListingDetail", { docId: data.id })}
      activeOpacity={0.9}
      className="flex flex-row w-full justify-between my-2 px-1 py-1 hover:bg-gray-100 "
    >
      <View style={{ flex: 1 }} className="flex flex-row items-center">
        <Image
          source={{ uri: data.logo }}
          resizeMode="cover"
          className="w-14 h-14 rounded-full"
        />
        <View style={{ flex: 1 }} className="mx-3">
          <Text className="text-gray-900 text-sm font-bold tracking-wider">
            {data?.title}
          </Text>
          <Text className="text-gray-900 text-xs font-bold tracking-wider">
            {data?.company}
          </Text>
          <View className="flex flex-row items-center justify-between my-1">
            <Text className="text-gray-500 text-xs font-semibold tracking-wider">
              {data?.location}
            </Text>
            {data?.salary && (
              <Text className="text-gray-500 text-xs font-semibold tracking-wider">
                {data?.salary}
              </Text>
            )}
          </View>
        </View>
      </View>
      <View className="">
        <TouchableOpacity
          onPress={() => ToogleBookman(data.id)}
          activeOpacity={0.8}
        >
          <Ionicons name="ios-bookmark-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default SearchScreen;
