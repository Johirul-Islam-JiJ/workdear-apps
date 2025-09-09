import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation as useNativeNavigation } from "expo-router";

// Define your route names and their parameters
export type RootStackParamList = {
  "/": undefined;
  "(mainLayout)": undefined;
  "(mainLayout)/(tabs)": undefined;
  "(mainLayout)/(tabs)/index": undefined;
  "(mainLayout)/(tabs)/jobs": undefined;
  "(mainLayout)/(tabs)/more": undefined;
  "(mainLayout)/(tabs)/myWork": undefined;
  "(mainLayout)/(tabs)/postJob": undefined;
  signin: undefined;
  signup: undefined;
};

// Create the typed navigation hook
export const useNavigation = () => {
  return useNativeNavigation<NativeStackNavigationProp<RootStackParamList>>();
};
