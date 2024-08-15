const { atom } = require("recoil");

export const dashTabs = atom({
  key: "dashboardTab",
  default: "Dashboard",
});
