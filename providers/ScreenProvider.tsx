import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useGetProfileQuery } from "@/store/features/auth";
import {
  useGetAllCostQuery,
  useGetGeneralDataQuery,
} from "@/store/features/generalData";
import { removeToken, setToken, setUser } from "@/store/slices/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

function ScreenProvider() {
  const [fontLoaded] = useFonts({
    RobotoSerifExtraLight: require("../assets/fonts/RobotoSerif_28pt-ExtraLight.ttf"),
    RobotoSerifLight: require("../assets/fonts/RobotoSerif_28pt-Light.ttf"),
    RobotoSerifSemiBold: require("../assets/fonts/RobotoSerif_28pt-Medium.ttf"),
    RobotoSerifRegular: require("../assets/fonts/RobotoSerif_28pt-Regular.ttf"),
    RobotoSerifBold: require("../assets/fonts/RobotoSerif_28pt-Bold.ttf"),
  });

  const { user, token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const {
    data: profileData,
    isLoading,
    isError,
  } = useGetProfileQuery(token, { skip: !token });
  useGetGeneralDataQuery();
  useGetAllCostQuery();

  useEffect(() => {
    const bootstrapAsync = async () => {
      const tokenFromStorage = await AsyncStorage.getItem("token");
      if (tokenFromStorage) {
        dispatch(setToken(tokenFromStorage));
      }
    };

    bootstrapAsync();
  }, []);

  useEffect(() => {
    if (profileData) {
      dispatch(setUser(profileData.data));
    }
  }, [profileData]);

  useEffect(() => {
    if (isError) {
      dispatch(removeToken());
    }
  }, [isError]);

  useEffect(() => {
    if (fontLoaded && !isLoading) {
      SplashScreen.hide();
    }
  }, [fontLoaded, isLoading]);

  if (!fontLoaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoading}>
        <Stack.Screen name="loading" />
      </Stack.Protected>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="signup" />
        <Stack.Screen name="signin" />
      </Stack.Protected>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(mainLayout)" />
        <Stack.Screen name="+not-found" />
      </Stack.Protected>
    </Stack>
  );
}

export default ScreenProvider;
