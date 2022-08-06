import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Suggestion, ListingCard, RenderListings } from "../../components";

const DataList = [{}, {}, {}, {}, {}, {}, {}, {}];

const HomeScreen = () => {
  const [scrollHeight, setScrollHeight] = React.useState(0);

  const JobDataFirelds = async () => {
    const listing = {
      title: "Front End / Mobile Developer",
      company: "Nudge Coach",
      location: "Accra, Ghana",
      salary: "₵500 - ₵1000",
      industry: "computing",
      jobType: "Full Time",
      jobLevel: "Mid Level",
      applyLink: "https://www.google.com",
      applyEmail: "example@jobs.com",
      experience: "1-2 years",
      education: "Bachelor's Degree",
      expirationDate: "2020-01-01",
      tags: ["Web Development", "Mobile Development"],
      logo: "",
      companySize: "1-10",
      companyDescription:
        "At Nudge Coach our team is on a mission to perfect the way online learning and coaching programs are delivered.That means we help people and businesses with expertise to share - coaches, facilitators, advisors, influencers, and more - launch a customized coaching app for their clients in less time without coding or breaking the bank.",
      role: "As a member of the dev team, under the direction of the CTO/ Dev Team Manager, you will take primary responsibility for the development of the mobile and web versions of Nudge for clients and Nudge for coaches apps. A small part of your time will be spent executing and further automating our white label build process with the rest of the development team.",
      requirements: [
        "5+ years of experience in software development, primarily on frontend",
        "Enforces a high standard of quality and craft with an eye for UX and engineering detail",
        "In depth knowledge of of Typescript/Javascript",
        "Experience with React and React Native",
        "Good knowledge and understanding of modern web technologies, specifically GraphQL and REST",
        "Experience with build tools like Webpack, Babel, and CircleCI",
        "Preference for practicality over dogmatism",
        "Penchant for solving complex requirements with elegant and simple solutions",
      ],
      task: [
        "Create a mobile and web version of Nudge for clients and Nudge for coaches apps",
        "Lead and contribute to the design and development of a new suite of product capabilities at Patreon",
        "Advocate for best patterns and practices in the area system design, performance, and testing",
        "Work with the product team to create a new suite of product capabilities at Patreon",
        "Advocate for engineering systems and solutions that will accelerate product development in the long-run",
        "Build a strong product-minded, engineering culture by mentoring and guiding engineers",
        "Write clear and concise technical documentation on system design and implementation",
      ],
      summary:
        "You will join an experienced team supporting and enhancing UBS global finance and consolidation system. You will work closely with global IT teams and key business stakeholders to define new features and solutions. Major upgrade projects and high demand for various new features make for an agile, fast-paced and interesting work environment.",
      applyRequirements: [
        "a brief introduction to yourself",
        "a link to your portfolio",
        "a link to your LinkedIn profile",
        "a link to your GitHub (or other public repository) or some code samples",
        "your resume",
      ],
      offer: [
        "A competitive salary and benefits package",
        "A great opportunity to grow and develop your skills",
        "A great opportunity to work with a team of talented people",
        "A great opportunity to work with a team of talented people",
      ]
    };

    // await db.collection("listings").add(listing);
  };

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
          <Suggestion />
        </View>
        <RenderListings />
      </ScrollView>
      <StatusBar style="dark" backgroundColor="#fff" translucent={false} />
    </SafeAreaView>
  );
};

const Header = ({ scrollHeight }) => {
  return (
    <View
    style={{
      elevation: 5,
    }}
      className={`${scrollHeight > 0 && "shadow-lg"} shadow-sm px-3 bg-white py-2 flex flex-row items-center justify-between `}
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
