const { atom } = require('recoil');

export const testDetailsState = atom({
  key: 'testDetailsState',
  default: {},
});

export const editTestState = atom({
  key: 'editTest',
  default: false,
});

export const editTestIdState = atom({
  key: 'editTestId',
  default: 'false',
});
