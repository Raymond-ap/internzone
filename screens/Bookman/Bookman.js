import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AnimatedLoader, ListingCard } from "../../components";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../../firebase";
import { HandleOffline } from "../../utils/Offline";

class Bookman extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollHeight: 0,
      isLoading: true,
      listing: [],
      bookmanID: [],
    };
  }

  componentDidMount() {
    this.getBookman();
    this.fetchData();
  }

  getBookman = async () => {
    const bookman = await AsyncStorage.getItem("bookman");
    if (bookman) {
      this.setState({ bookmanID: JSON.parse(bookman) });
    }
  };

  fetchData = async () => {
    const docIds = this.state.bookmanID;
    this.setState({isLoading: true})
    try {
      const listings = await db.collection("listings").get();
      const listingsArray = listings.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filteredListings = listingsArray.filter((listing) => {
        return docIds.includes(listing.id);
      });
      this.setState({ listing: filteredListings, isLoading: false });
    } catch (err) {
      HandleOffline(err.message, this.fetchData);
    }
  };

  wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  onRefresh = async () => {
    this.setState({isLoading: true})
    await this.wait(2000);
    this.getBookman();
    this.fetchData();
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }} className="bg-white">
        <Header scrollHeight={this.state.scrollHeight} />
        <View style={{ flex: 1 }} className="px-3 py-3">
          {this.state.listing.length > 0 ? (
            <FlatList
              data={this.state.listing}
              renderItem={({ item }) => (
                <ListingCard item={item} bookmanArray={this.state.bookmanID} />
              )}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              onScroll={(e) => {
                this.setState({ scrollHeight: e.nativeEvent.contentOffset.y });
              }}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isLoading}
                  onRefresh={this.onRefresh}
                />
              }
            />
          ) : (
            <ScrollView
              contentContainerStyle={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isLoading}
                  onRefresh={this.onRefresh}
                />
              }
            >
              <View className="py-5 px-3 items-center">
                <Image
                  source={require("../../assets/empty.png")}
                  resizeMode="contain"
                  className="mb-5 w-64 h-64"
                />
                <Text className="text-gray-600 text-base text-center">
                  No saved jobs found. Save a job to see it here
                </Text>
                <TouchableOpacity onPress={() => this.fetchData()} activeOpacity={0.8} className="my-10 w-32 py-2 rounded-md shadow-sm justify-center items-center bg-blue-600">
              <Text className="text-white text-base">Retry</Text>
            </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
        <StatusBar style="dark" backgroundColor="#fff" translucent={false} />
        {this.state.isLoading && <AnimatedLoader />}
      </SafeAreaView>
    );
  }
}

const Header = ({ scrollHeight }) => {
  return (
    <View
      className={`${
        scrollHeight > 0 && "border-b border-gray-400 shadow-lg"
      } px-3 bg-white py-3 flex flex-row items-center justify-between z-50`}
    >
      <Text className="text-base font-semibold capitalize tracking-wider">
        Your saved jobs
      </Text>
    </View>
  );
};

export default Bookman;
