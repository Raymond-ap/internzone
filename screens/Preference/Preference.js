import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const industy = [
  {
    title: "Accounting",
  },
  {
    title: "computing",
  },
  {
    title: "Engineering",
  },
  {
    title: "Finance",
  },
  {
    title: "Marketing",
  },
  {
    title: "Media",
  },
  {
    title: "Legal",
  },
  {
    title: "Media",
  },
  {
    title: "Legal",
  },
  {
    title: "Media",
  },
  {
    title: "Legal",
  },
];

//  bg-blue-200  border border-blue-500
const Preference = () => {
  const [selectedPreferences, setSelectedPreferences] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigation = useNavigation();

  const handleSelect = (item) => {
    let items = [];
    if (selectedPreferences.includes(item)) {
      items = selectedPreferences.filter((i) => i !== item);
    } else {
      items = [...selectedPreferences, item];
    }
    setSelectedPreferences(items);
  };

  const savePreference = async () => {
    if (selectedPreferences.length < 2) {
      alert("Please select at least 2 preferences");
      return;
    }
    let userPreferences = await AsyncStorage.getItem("userPreferences");
    if (userPreferences) {
      userPreferences = JSON.parse(userPreferences);
    } else {
      userPreferences = [];
    }
    let uniquePreferences = [
      ...new Set([...userPreferences, ...selectedPreferences]),
    ];
    await AsyncStorage.setItem(
      "userPreferences",
      JSON.stringify(uniquePreferences)
    );
    navigation.navigate("Home");
  };

  const getPreferences = async () => {
    let userPreferences = await AsyncStorage.getItem("userPreferences");
    console.log(userPreferences);
    if (userPreferences) {
      userPreferences = JSON.parse(userPreferences);
    } else {
      userPreferences = [];
    }
    setSelectedPreferences(userPreferences);
  };

  React.useEffect(() => {
    getPreferences();
  }, []);

  return (
    <SafeAreaView className="bg-white" style={{ flex: 1 }}>
      <View className="px-5" style={{ flex: 1 }}>
        <Text className="py-4 font-bold text-2xl">
          Choose your preferred industries to find internships
        </Text>
        <FlatList
          data={industy}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item.title)}
              activeOpacity={0.8}
              className={`${
                selectedPreferences.includes(item.title)
                  ? "bg-blue-500"
                  : "bg-blue-100"
              } mb-4 px-3 py-4 rounded-md hover:bg-blue-400 flex flex-row justify-between items-center`}
            >
              <Text className="font-semibold tracking-wider capitalize text-base">
                {item?.title}
              </Text>
              <Ionicons name="ios-arrow-forward" size={20} color="black" />
            </TouchableOpacity>
          )}
        />
        <View className="my-5 items-end">
          <TouchableOpacity onPress={() => savePreference()}>
            <Text className="text-base text-gray-600 tracking-wider">
              Finish
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="dark" backgroundColor="#fff" translucent={false} />
    </SafeAreaView>
  );
};

export default Preference;

const styles = StyleSheet.create({});
