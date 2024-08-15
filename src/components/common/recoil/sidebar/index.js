const { atom } = require("recoil");

export const sideBarAtom = atom({
  key: "sidebar",
  default: false,
});
