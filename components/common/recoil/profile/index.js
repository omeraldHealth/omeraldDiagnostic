const { atom, selector } = require('recoil');

export const profileState = atom({
  key: 'profileState',
  default: {},
});

export const diagnoseConditionState = atom({
  key: 'diagnoseConditionState',
  default: {},
});

export const diagnosticProfileState = atom({
  key: 'diagnosticProfile',
  default: {},
});

export const omeraldUsersState = atom({
  key: 'omeraldUsersState',
  default: {},
});


export const adminUsersState = atom({
  key: 'adminUsersState',
  default: {},
})