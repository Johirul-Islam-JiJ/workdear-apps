import { ThemedText } from "@/components/libs/ThemedText";
import { ThemedView } from "@/components/libs/ThemedView";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useGetProfileQuery } from "@/store/features/auth";
import {
  useGetAllCostQuery,
  useGetGeneralDataQuery,
} from "@/store/features/generalData";
import { setToken, setUserLoading } from "@/store/slices/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

function ScreenProvider() {
  const {
    user,
    token,
    loading: userLoading,
  } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useGetProfileQuery(token, { skip: !token });
  useGetGeneralDataQuery();
  useGetAllCostQuery();

  useEffect(() => {
    const bootstrapAsync = async () => {
      const tokenFromStorage = await AsyncStorage.getItem("token");
      if (tokenFromStorage) {
        dispatch(setToken(tokenFromStorage));
      } else {
        dispatch(setUserLoading(false));
      }
    };

    bootstrapAsync();
  }, []);

  if (userLoading) {
    return (
      <View style={{ flex: 1 }}>
        <ThemedView color="primaryDarker" style={{ height: 35 }} />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ThemedText type="subtitle">Loading...</ThemedText>
        </View>
      </View>
    );
  }

  if (user) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(mainLayout)" />
        <Stack.Screen name="+not-found" />
      </Stack>
    );
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signin" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}

export default ScreenProvider;
