import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AnimatedLoader } from "../../components";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Bookman = () => {
  const [scrollHeight, setscrollHeight] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [listing, setListing] = React.useState([]);
  const [bookmanID, setBookmanID] = React.useState([]);

  const getBookman = async () => {};

  React.useEffect(() => {
    getBookman();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <Header scrollHeight={scrollHeight} />
      <StatusBar style="dark" backgroundColor="#fff" translucent={false} />
    </SafeAreaView>
  );
};

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
