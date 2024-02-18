const { atom, selector } = require('recoil');

export const editorState = atom({
  key: 'editorState',
  default: false,
});

export const settingTabState = atom({
  key: 'settingsTabState',
  default: 'user',
});
