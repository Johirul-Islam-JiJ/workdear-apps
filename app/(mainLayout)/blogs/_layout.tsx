import ScreenHeader from "@/components/common/ScreenHeader";
import { Stack } from "expo-router";

export default function BlogsStackLayout() {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_left",
        header: (props) => (
          <ScreenHeader route={props.options.headerTitle as string} />
        ),
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: "Blogs" }} />
      <Stack.Screen
        name="[slug]/index"
        options={{ headerTitle: "Blog Details" }}
      />
    </Stack>
  );
}
