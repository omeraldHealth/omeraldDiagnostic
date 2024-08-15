type Neutral =
  | "white"
  | "s50"
  | "s100"
  | "s150"
  | "s200"
  | "s250"
  | "s300"
  | "s350"
  | "s400"
  | "s500"
  | "s600"
  | "s900"
  | "black"
  | "omerald_color_neutralLightest"
  | "omerald_color_neutralLighter"
  | "omerald_color_neutral_20"
  | "omerald_color_neutralMedium"
  | "omerald_color_neutraDarkest"
  | "omerald_color_text__neutralDarker"
  | "omerald_color_bg__infoLightest"
  | "omerald_color_text__infoDark"
  | "omerald_color_neutral__40"
  | "omerald_color_positive_50"
  | "omerald_color_bg__neutralDarker"
  | "omerald_color_text_info";
export const neutral: Record<Neutral, string> = {
  white: "#ffffff",
  s50: "#f1f1f1",
  s100: "#f2f2f2",
  s150: "#F5F5F5",
  s200: "#E5E5E5",
  s250: "#dcdcdc",
  s300: "#dadada",
  s350: "#d5d5d5",
  s400: "#c1c1c1",
  s500: "#a1a4b3",
  s600: "#797979",
  s900: "#1a1a1a",
  black: "#000000",

  omerald_color_neutral__40: "#A8A8A8",
  omerald_color_neutralLightest: "#ffffff",
  omerald_color_neutralLighter: "#F5F5F5",
  omerald_color_neutral_20: "#DADADA",
  omerald_color_neutralMedium: "#797979",
  omerald_color_neutraDarkest: "#1A1A1A",
  omerald_color_text__neutralDarker: "#4D4D4D",
  omerald_color_bg__neutralDarker: "#F3F4F6",
  omerald_color_bg__infoLightest: "#F4F9FF",
  omerald_color_text__infoDark: "#153F7A",
  omerald_color_positive_50: "#109E38",
  omerald_color_text_info: "#757095",
};

type Primary = "brand" | "omerald_color_text__brandMedium";
export const primary: Record<Primary, string> = {
  brand: "#c51c23",
  omerald_color_text__brandMedium: "#E10000",
};

type Secondary = "brand" | "s200";
export const secondary: Record<Secondary, string> = {
  s200: "#DDEBFE",
  brand: "#4c69b5",
};

type Success = "s400" | "omerald_color_positive__50";
export const success: Record<Success, string> = {
  s400: "#109E38",
  omerald_color_positive__50: "#109E38",
};
