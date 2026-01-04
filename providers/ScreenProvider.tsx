import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useGetProfileQuery } from "@/store/features/auth";
import {
  useGetAllCostQuery,
  useGetGeneralDataQuery,
} from "@/store/features/generalData";
import { removeToken, setToken, setUser } from "@/store/slices/user";
import {
  PlusJakartaSans_200ExtraLight,
  PlusJakartaSans_300Light,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  useFonts,
} from "@expo-google-fonts/plus-jakarta-sans";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

function ScreenProvider() {
  const [fontLoaded] = useFonts({
    RobotoSerifExtraLight: PlusJakartaSans_200ExtraLight,
    RobotoSerifLight: PlusJakartaSans_300Light,
    RobotoSerifSemiBold: PlusJakartaSans_600SemiBold,
    RobotoSerifRegular: PlusJakartaSans_400Regular,
    RobotoSerifBold: PlusJakartaSans_700Bold,
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
        <Stack.Screen name="loading/index" />
      </Stack.Protected>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="signup/index" />
        <Stack.Screen name="signin/index" />
        <Stack.Screen name="forgotpassword/index" />
      </Stack.Protected>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(mainLayout)" />
        <Stack.Screen name="+not-found" />
      </Stack.Protected>
    </Stack>
  );
}

export default ScreenProvider;
