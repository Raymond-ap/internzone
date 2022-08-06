import { View, Text, FlatList, Dimensions } from "react-native";
import React from "react";
import SuggestCard from "./SuggestCard";

const DataList = [{}, {}, {}, {}, {}, {}, {}, {}];

const Suggestion = () => {
  return (
    <View>
      <Text className="capitalize font-semibold text-base tracking-wider text-gray-800 px-3 mb-2">
        Suggestion
      </Text>
      <View
        style={{
          width: Dimensions.get("window").width,
        }}
      >
        <FlatList
          data={DataList}
          horizontal
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <SuggestCard />}
        />
      </View>
    </View>
  );
};

export default Suggestion;
