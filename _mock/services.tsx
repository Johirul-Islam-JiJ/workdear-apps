import {
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

type Service = {
  Icon: ({ color, size }: { color: string; size: number }) => React.JSX.Element;
};

export const serviceIcons: Service[] = [
  {
    Icon: ({ color, size }: { color: string; size: number }) => (
      <MaterialIcons name="work-history" size={size} color={color} />
    ),
  },
  {
    Icon: ({ color, size }: { color: string; size: number }) => (
      <FontAwesome6 name="check" size={size} color={color} />
    ),
  },
  {
    Icon: ({ color, size }: { color: string; size: number }) => (
      <MaterialCommunityIcons name="cash-lock-open" size={size} color={color} />
    ),
  },
];
