import { atom } from "recoil";

export interface BranchDetailInterface {
  branchName: string;
  branchEmail: string;
  branchAddress: string;
  branchContact: string;
  branchManager: string;
}

export const branchState = atom<BranchDetailInterface[]>({
  key: "branchState",
  default: [],
});

export const selectedBranchState = atom<string | null>({
  key: "selectedBranchState",
  default: null,
});

export const selectedDcState = atom<string | null>({
  key: "selectedDcState",
  default: null,
});

export const unselectDcState = atom<boolean | null>({
  key: "unSelectDc",
  default: false,
});
