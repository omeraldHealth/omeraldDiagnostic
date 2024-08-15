const { atom } = require("recoil");

export const reportState = atom({
  key: "reportState",
  default: false,
});
