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

    border: "#e5e7eb",
    placeholder: "#9F9F9F",

    white: "#FFFFFF",
    text: "#000000",
    black: "#000000",

    "gray.100": "#f8f9fa",
    "gray.200": "#e9ecef",
    "gray.300": "#dee2e6",
    "gray.400": "#ced4da",
    "gray.500": "#adb5bd",
    "gray.600": "#868e96",
    "gray.700": "#495057",
    "gray.800": "#343a40",
    "gray.900": "#212529",

    silvar: "#C0C0C0",
    orange: "#ffa600c2",
  },
  dark: {
    background: "#285056",
    card: "#132f33",

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

    border: "#e5e7eb6e",
    placeholder: "#9F9F9F",

    white: "#FFFFFF",
    text: "#ffffff",
    black: "#000000",

    "gray.100": "#e4e6e6",
    "gray.200": "#c8cbcb",
    "gray.300": "#acb1b1",
    "gray.400": "#919697",
    "gray.500": "#757b7c",
    "gray.600": "#5b6060",
    "gray.700": "#404444",
    "gray.800": "#262829",
    "gray.900": "#0c0d0d",

    silvar: "#C0C0C0",
    orange: "#ffa600c2",
  },
};

export type ColorScheme = keyof typeof Colors.light & keyof typeof Colors.dark;
