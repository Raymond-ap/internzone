import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AnimatedLoader } from "../../components";
import { db } from "../../firebase";

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
  const [scrollHeight, setScrollHeight] = React.useState(0);
  const tabs = ["overview", "company"];
  const docId = route.params.docId;
  const navigation = useNavigation();

  console.log(listing);

  const fetchListing = async () => {
    await db
      .collection("listings")
      .doc(docId)
      .onSnapshot((snapshot) => {
        setListing(snapshot.data());
        setRequirements(snapshot.data().requirements);
        setTask(snapshot.data().task);
        setIsLoading(false);
      })
      .then(() => {})
      .catch((error) => {
        console.log("message", error.message);
      });
  };

  const onRefresh = async () => {
    setIsLoading(true);
    await wait(1000);
    fetchListing();
  };

  React.useEffect(() => {
    fetchListing();
  }, [isLoading]);

  return (
    <SafeAreaView className="bg-white" style={{ flex: 1 }}>
      <View
        className={`flex flex-row items-center justify-between px-3 py-2 z-50 ${
          scrollHeight > 0 ? "border-b border-gray-400 shadow-lg" : ""
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
          <Text className="text-sm text-gray-500 font-medium capitalize tracking-wider">
            {listing?.location}
          </Text>
        </View>
        <View className="my-2">

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
              task={task}
            />
          ) : activeTab === "company" ? (
            <RenderCompany data={listing} />
          ) : null}
        </View>
      </ScrollView>
      {isLoading && <AnimatedLoader />}
      <StatusBar style="dark" backgroundColor="#fff" translucent={false} />
    </SafeAreaView>
  );
};

const RenderOverview = ({ data, requirements, task }) => {
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
