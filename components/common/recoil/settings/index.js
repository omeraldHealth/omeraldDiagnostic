const { atom, selector } = require('recoil');


export const settingTabState = atom({
  key: 'settingsTabState',
  default: 'Billing',
});
