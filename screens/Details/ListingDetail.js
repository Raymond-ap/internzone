import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
  Linking,
  Alert,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AnimatedLoader } from "../../components";
import { db } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToogleBookman } from "../../utils/Bookman";
import { HandleOffline } from "../../utils/Offline";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const ListingDetail = ({ route }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState("overview");
  const [listing, setListing] = React.useState({});
  const [requirements, setRequirements] = React.useState([]);
  const [task, setTask] = React.useState([]);
  const [applicationTip, setApplicationTip] = React.useState([]);
  const [scrollHeight, setScrollHeight] = React.useState(0);
  const [bookmanArray, setBookmanArray] = React.useState([]);
  const tabs = ["overview", "company"];
  const docId = route.params.docId;
  const navigation = useNavigation();

  const getBookman = async () => {
    const bookman = await AsyncStorage.getItem("bookman");
    if (bookman) {
      setBookmanArray(JSON.parse(bookman));
    }
  };

  const fetchListing = async () => {
    try {
      const doc = await db.collection("listings").doc(docId).get();
      setListing(doc.data());
      setRequirements(doc.data().requirements);
      setTask(doc.data().task);
      setApplicationTip(doc.data().applyRequirements);
      getBookman();
      setIsLoading(false);
    } catch (error) {
      HandleOffline(error.message, fetchListing);
    }
  };

  const onRefresh = async () => {
    setIsLoading(true);
    await wait(1000);
    fetchListing();
  };

  const applyJob = async () => {
    const applicationLink = listing.applyLink;
    if (applicationLink) {
      Linking.openURL(applicationLink);
    } else {
      Alert.alert("No Application Link Found");
    }
  };

  React.useEffect(() => {
    fetchListing();
  }, [isLoading]);

  return (
    <SafeAreaView className="bg-white" style={{ flex: 1 }}>
      <View
        className={`flex flex-row items-center justify-between px-3 py-2 z-50 ${
          scrollHeight > 0 ? "border-b border-gray-400 shadow-lg" : "border-none"
        }`}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="ios-arrow-back" size={24} color="black" />
        </TouchableOpacity>
        {!isLoading && (
          <View className="flex flex-row items-center">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                getBookman();
                ToogleBookman(docId);
              }}
            >
              <Ionicons
                name={`${
                  bookmanArray.includes(docId)
                    ? "ios-bookmark"
                    : "ios-bookmark-outline"
                }`}
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <View className="mx-2" />
            <TouchableOpacity activeOpacity={0.8}>
              <Ionicons name="ios-share-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        onScroll={(event) => {
          setScrollHeight(event.nativeEvent.contentOffset.y);
        }}
        className="py-3"
        style={{ flex: 1 }}
      >
        <View className="container items-center justify-center">
          <Image
            source={{ uri: listing.logo }}
            resizeMode="cover"
            className="w-20 h-20 bg-black rounded-md shadow-lg mb-3"
          />
          <Text className="text-xl text-gray-900 font-semibold capitalize tracking-wider">
            {listing?.title}
          </Text>
          <Text className="text-sm text-gray-900 font-semibold capitalize tracking-wider">
            {listing?.company}
          </Text>
          <Text className="text-sm text-gray-500 font-medium capitalize tracking-wider mb-2">
            {listing?.location}
          </Text>
        </View>
        <View className="my-2 px-3 flex-row gap-2 grid-rows-4 grid  items-center">
          <View
            style={{ flex: 1 }}
            className="text-gray-500 bg-gray-100 py-1 w-full items-center justify-center rounded-md"
          >
            <Text className="text-sm">{listing?.jobLevel}</Text>
          </View>
          <View
            style={{ flex: 1 }}
            className="text-gray-500 bg-gray-100 py-1 w-full items-center justify-center rounded-md"
          >
            <Text className="text-sm">{listing?.experience}</Text>
          </View>
        </View>
        <View className="px-3 my-4">
          <View className="bg-gray-100 py-1 px-0.5 rounded-full flex flex-row">
            {tabs.map((tab, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  style={{ flex: 1 }}
                  onPress={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab ? "bg-white " : "bg-gray-100"
                  } py-1 w-full mx-2 rounded-full items-center justify-center`}
                >
                  <Text
                    className={`${
                      activeTab === tab ? "text-gray-900 " : "text-gray-600"
                    } text-base capitalize tracking-wider font-semibold`}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View className="px-3">
          {activeTab === "overview" ? (
            <RenderOverview
              data={listing}
              requirements={requirements}
              applicationTip={applicationTip}
              task={task}
            />
          ) : activeTab === "company" ? (
            <RenderCompany data={listing} />
          ) : null}
        </View>
        <ApplyButton onPress={() => applyJob()} />
      </ScrollView>
      {isLoading && <AnimatedLoader />}
      <StatusBar style="dark" backgroundColor="#fff" translucent={false} />
    </SafeAreaView>
  );
};

const RenderOverview = ({ data, requirements, task, applicationTip }) => {
  const openMail = async () => {
    Alert.alert(
      "Open Mail",
      "Do you want to open mail app?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: () => Linking.openURL(`mailto:${data.applyEmail}`),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View className="bg-white py-3 px-3">
      <View className="mb-4">
        <Label label={"Job Description"} />
        <Text className="text-sm text-gray-600">{data?.summary}</Text>
        <View className="my-2" />
        <Text className="text-sm text-gray-600">{data?.role}</Text>
      </View>
      <View className="mb-4">
        {data.requirements && <Label label={"qualifications"} />}
        {requirements.map((item, index) => {
          return (
            <View key={index} className="flex  flex-row mb-2">
              <Ionicons name="ios-checkmark-sharp" size={15} color="#0096c7" />
              <Text style={{ flex: 1 }} className="ml-3 text-sm text-gray-900">
                {item}
              </Text>
            </View>
          );
        })}
      </View>
      <View className="mb-4">
        {data.task && <Label label={"responsibilities"} />}
        {task.map((item, index) => {
          return (
            <View key={index} className="flex  flex-row mb-2">
              <Ionicons name="ios-checkmark-sharp" size={15} color="#0096c7" />
              <Text style={{ flex: 1 }} className="ml-3 text-sm text-gray-900">
                {item}
              </Text>
            </View>
          );
        })}
      </View>
      <View className="mb-4">
        <Label label={"salary"} />
        <Text className="text-sm text-gray-600">{data?.salary}</Text>
      </View>
      {data.applyEmail && (
        <View className="mb-4">
          <Label label={"how to apply"} />
          <View className="flex items-center flex-row mb-2">
            <Text className="text-sm text-gray-900 capitalize mr-2">
              application email:
            </Text>
            <TouchableOpacity onPress={() => openMail()}>
              <Text className="text-sm text-blue-500">{data?.applyEmail}</Text>
            </TouchableOpacity>
          </View>
          {applicationTip.map((item, index) => {
            return (
              <View key={index} className="flex  flex-row mb-2">
                <Ionicons
                  name="ios-checkmark-sharp"
                  size={15}
                  color="#0096c7"
                />
                <Text
                  style={{ flex: 1 }}
                  className="ml-3 text-sm text-gray-900"
                >
                  {item}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

const RenderCompany = ({ data }) => {
  return (
    <View className="bg-white py-3 px-3">
      <View className="mb-4">
        <Label label={"About the Company"} />
        <Text className="text-sm text-gray-600">
          {data?.companyDescription}
        </Text>
      </View>
      <View className="mb-4">
        <Label label={"what we offer"} />
        {data.offer.map((item, index) => {
          return (
            <View key={index} className="flex  flex-row mb-2">
              <Ionicons name="ios-checkmark-sharp" size={15} color="#0096c7" />
              <Text style={{ flex: 1 }} className="ml-3 text-sm text-gray-900">
                {item}
              </Text>
            </View>
          );
        })}
      </View>
      <View>
        <Label label={"company size"} />
        <Text className="text-sm text-gray-600">
          {`${data?.companySize} employees`}
        </Text>
      </View>
    </View>
  );
};

const ApplyButton = ({ onPress }) => {
  return (
    <View className="mb-10 mx-3">
      <TouchableOpacity onPress={onPress}>
        <View className="bg-gray-900 hover:bg-gray-800 text-center py-3 items-center justify-center w-full px-4 rounded-md">
          <Text className="text-base text-white font-semibold">Apply</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Label = ({ label }) => {
  return (
    <Text className="text-base text-gray-900 font-bold capitalize tracking-wider my-1">
      {label}
    </Text>
  );
};

export default ListingDetail;
