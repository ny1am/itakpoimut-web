import { singleText as loyaltySingleText } from 'shared/js/loyalties';
import { text as violationText } from 'shared/js/violations';

import { text as categoryText } from 'shared/js/categories';

export const removeFalsy = (obj) => {
  let newObj = {};
  Object.keys(obj).forEach((prop) => {
    if (obj[prop]) { newObj[prop] = obj[prop]; }
  });
  return newObj;
};

export const encodeQueryData = (data) => {
  return Object.keys(data).map((key) => {
    return [key, data[key]].map(encodeURIComponent).join("=");
  }).join("&");
};

export const avatar = (picture_url, size)  => {
  const modifier = size?'-'+size:'';
  return picture_url || `/assets/img/no-user-image${modifier}.png`;
};

export const roleModerator = (user) => {
  return user && user.roles.indexOf('moderator') !== -1;
};

export const loyaltySingleByName = (name) => {
  return loyaltySingleText(name);
};

export const violationByName = (name) => {
  return violationText(name);
};

export const categoryByName = (name) => {
  return categoryText(name);
};

const leadingZero = (number) => {
  if (number < 10) {
    return '0' + number.toString();
  } else {
    return number.toString();
  }
};

//formats date DD/MM/YYYY
export const formatDate = (dateString) => {
  const d = new Date(dateString);
  const dformat = [
    leadingZero(d.getDate()),
    leadingZero(d.getMonth()+1),
    d.getFullYear()
  ].join('.');
  return dformat;
};

export const http = (url) => {
  //todo revise this hotfix
  if (url.indexOf('http') === 0) {
    return url;
  } else {
    return 'http://'+url;
  }
};
