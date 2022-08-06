import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  Suggestion,
  ListingCard,
  RenderListings,
  AnimatedLoader,
} from "../../components";
import { db } from "../../firebase";

const DataList = [{}, {}, {}, {}, {}, {}, {}, {}];

const HomeScreen = () => {
  const [scrollHeight, setScrollHeight] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [listing, setListing] = React.useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    await db
      .collection("listings")
      .onSnapshot((snapshot) => {
        const listings = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListing(listings);
        setIsLoading(false);
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <Header scrollHeight={scrollHeight} />
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          const scrollHeight = e.nativeEvent.contentOffset.y;
          setScrollHeight(scrollHeight);
        }}
      >
        <View className="py-5">
          <Suggestion data={listing} />
        </View>
        <RenderListings data={listing} />
      </ScrollView>
      <StatusBar style="dark" backgroundColor="#fff" translucent={false} />
      {isLoading && <AnimatedLoader />}
    </SafeAreaView>
  );
};

const Header = ({ scrollHeight }) => {
  return (
    <View
      
      className={`${
        scrollHeight > 0 && "border-b border-gray-400 shadow-lg"
      } px-3 bg-white py-2 flex flex-row items-center justify-between z-50`}
    >
      <Text className="text-xl font-bold capitalize tracking-wider">
        Internzone
      </Text>
      <View className="flex items-center flex-row">
        <TouchableOpacity
          activeOpacity={0.9}
          className="bg-gray-200 hover:bg-white p-1 rounded-full"
        >
          <Ionicons name="ios-search" size={20} color="black" />
        </TouchableOpacity>
        <View className="mx-1" />
        <TouchableOpacity
          activeOpacity={0.9}
          className="bg-gray-200 hover:bg-white p-1 rounded-full"
        >
          <Ionicons name="ios-notifications" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
