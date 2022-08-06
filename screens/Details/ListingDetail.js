import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AnimatedLoader } from "../../components";

const ListingDetail = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-white" style={{ flex: 1 }}>
      <View className="flex flex-row items-center justify-between px-3 py-3 z-50">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="ios-arrow-back" size={24} color="black" />
        </TouchableOpacity>
        {!isLoading && (
          <View className="flex flex-row items-center">
            <TouchableOpacity activeOpacity={0.8}>
              <Ionicons name="ios-bookmark-outline" size={20} color="black" />
            </TouchableOpacity>
            <View className="mx-1" />
            <TouchableOpacity activeOpacity={0.8}>
              <Ionicons name="ios-share-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ScrollView className="py-3" style={{ flex: 1 }}>
        <View className="container items-center justify-center">
          <View className="w-20 h-20 bg-black rounded-md shadow-lg mb-3" />
          <Text className="text-xl text-gray-900 font-semibold capitalize tracking-wider">
            Senior Product eveloper
          </Text>
          <Text className="text-sm text-gray-900 font-semibold capitalize tracking-wider">
            Accra institute of technology
          </Text>
          <Text className="text-sm text-gray-500 font-medium capitalize tracking-wider">
            Accra, Ghana
          </Text>
        </View>
        <View>
            
        </View>
      </ScrollView>

      {isLoading && <AnimatedLoader />}
      <StatusBar style="dark" backgroundColor="#fff" translucent={false} />
    </SafeAreaView>
  );
};

export default ListingDetail;
