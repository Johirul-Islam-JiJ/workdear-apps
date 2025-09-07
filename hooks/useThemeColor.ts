import { Colors, ColorScheme } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export function useThemeColor(colorName: ColorScheme) {
  const theme = useColorScheme() ?? "light";

  return Colors[theme][colorName];
}
