import { SHOW_MENU, HIDE_MENU } from 'constants/menu';

export const show =() => ({
  type: SHOW_MENU
});

export const hide =() => ({
  type: HIDE_MENU
});
