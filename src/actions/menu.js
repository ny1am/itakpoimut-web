import { SHOW_MENU, HIDE_MENU } from 'consts/menu';

export const show =() => ({
  type: SHOW_MENU
});

export const hide =() => ({
  type: HIDE_MENU
});
