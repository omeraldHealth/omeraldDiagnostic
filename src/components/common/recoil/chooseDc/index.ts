import { atom } from 'recoil';

export const createDC = atom<boolean>({
  key: 'createDCState',
  default: false,
});
