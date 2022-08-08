import { Alert } from "react-native";

export const handleOffline = (message, onPress) => {
  Alert.alert("Sorry, Something went wrong", message, [
    {
      text: "Retry",
      onPress: () => onPress(),
    },
  ]);
};
