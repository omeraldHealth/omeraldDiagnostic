const { atom } = require('recoil');

export const loginState = atom({
  key: 'loggedIn',
  default: false,
});
