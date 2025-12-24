import { openBrowserAsync } from "expo-web-browser";
import { Pressable } from "react-native";

type Props = {
  href: string;
  children: React.ReactNode;
};

export function ExternalLink({ href, children }: Props) {
  const handlePress = async () => {
    await openBrowserAsync(href);
  };

  return <Pressable onPress={handlePress}>{children}</Pressable>;
}
