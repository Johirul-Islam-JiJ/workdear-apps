import { Colors, ColorScheme } from "@/constants/Colors";
import { useColorScheme } from "react-native";

export function useThemeColor(colorName: ColorScheme) {
  const theme = useColorScheme() ?? "light";

  return Colors[theme][colorName];
}
