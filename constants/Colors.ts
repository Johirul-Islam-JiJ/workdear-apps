export const Colors = {
  light: {
    background: "#e5e7ec",
    card: "#ffffff",

    primarylighter: "#17cce6",
    primarylight: "#27bbd0",
    primarymain: "#2cabbe",
    primarydark: "#2ea3b4",
    primarydarker: "#2a727d",

    error: "#fe4332",
    warning: "#ff9f02",
    success: "#02ad4f",
    infolight: "#c2edfe",
    info: "#0074fe",

    borderColor: "#808080",
    placeHolder: "#9F9F9F",

    white: "#FFFFFF",
    text: "#000000",
    black: "#000000",
  },
  dark: {
    background: "#e5e7ec",
    card: "#ffffff",

    primarylighter: "#17cce6",
    primarylight: "#27bbd0",
    primarymain: "#2cabbe",
    primarydark: "#2ea3b4",
    primarydarker: "#2a727d",

    error: "#fe4332",
    warning: "#ff9f02",
    success: "#02ad4f",
    infolight: "#c2edfe",
    info: "#0074fe",

    borderColor: "#808080",
    placeHolder: "#9F9F9F",

    white: "#FFFFFF",
    text: "#000000",
    black: "#000000",
  },
};

export type ColorScheme = keyof typeof Colors.light & keyof typeof Colors.dark;
