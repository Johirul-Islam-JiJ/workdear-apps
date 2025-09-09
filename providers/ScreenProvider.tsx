import { useAppSelector } from "@/hooks/redux";
import { useGetProfileQuery } from "@/store/features/auth";
import {
  useGetAllCostQuery,
  useGetGeneralDataQuery,
} from "@/store/features/generalData";
import { Stack } from "expo-router";

function ScreenProvider() {
  const { user, token } = useAppSelector((state) => state.user);
  useGetProfileQuery(token, { skip: !token });
  useGetGeneralDataQuery();
  useGetAllCostQuery();

  return !user ? (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signin" />
      <Stack.Screen name="signup" />
    </Stack>
  ) : (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(mainLayout)" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default ScreenProvider;
