export const Colors = {
  light: {
    white: "#FFFFFF",
    text: "#000000",
    light: "#F0EFEF",
    lightGray: "#EEEEEE",
    primaryLighter: "#5BBA6F",
    primaryLight: "#179226",
    primaryMain: "#2B7035",
    primaryDark: "#137547",
    primaryDarker: "#054A29",
    error: "#FA1E00",
    info: "#5BBA6F",
    success: "#137547",
    warning: "#F5FA00",
  },
  dark: {
    white: "#FFFFFF",
    text: "#FFFFFF",
    light: "#F0EFEF",
    lightGray: "#EEEEEE",
    primaryLighter: "#5BBA6F",
    primaryLight: "#179226",
    primaryMain: "#2B7035",
    primaryDark: "#137547",
    primaryDarker: "#054A29",
    error: "#FA1E00",
    info: "#5BBA6F",
    success: "#137547",
    warning: "#F5FA00",
  },
};

export type ColorScheme = keyof typeof Colors.light & keyof typeof Colors.dark;
