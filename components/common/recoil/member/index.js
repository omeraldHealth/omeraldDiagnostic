import { profileState } from '../profile';

const { atom, selector } = require('recoil');

export const memberState = selector({
  key: 'memberState',
  get: ({ get }) => {
    const profile = get(profileState);
    if (profile?.members) {
      const memberIds = profile.members.map(member => member.memberId);
      memberIds.push(profile._id);
      return memberIds;
    }
  },
});

export const memberProfile = atom({
  key: 'profileState',
  default: {},
});

export const memberDetail = atom({
  key: 'memberDetailState',
  default: '',
});
