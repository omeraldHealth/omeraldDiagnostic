const { atom } = require('recoil');

export const userState = atom({
  key: 'user',
  default: {},
});

export const phoneNumberState = atom({
  key: 'contact',
  default: {},
});
