const { atom } = require("recoil");
import { RecoilState } from "recoil";
import { ProfileDetailsInterface } from "../../../../utils/types";

export const profileState: RecoilState<ProfileDetailsInterface | null> = atom({
  key: "profileState",
  default: null,
});
