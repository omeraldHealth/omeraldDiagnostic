const { atom } = require('recoil');

export const branchState = atom({
  key: 'branchState',
  default: [],
});
