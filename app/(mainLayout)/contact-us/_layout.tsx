import ScreenHeader from "@/components/common/ScreenHeader";
import { Stack } from "expo-router";

export default function ContactUsLayout() {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        header: (props) => (
          <ScreenHeader route={props.options.headerTitle as string} />
        ),
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: "Contact Us" }} />
      <Stack.Screen name="chat/index" options={{ headerTitle: "Live Chat" }} />
    </Stack>
  );
}
