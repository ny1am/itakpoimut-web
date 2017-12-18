import { roleModerator } from 'utils';

const userLinks = (loggedUser) => {
  const result = [{
    location: '/',
    title: 'Головна',
  }, {
    location: '/companies',
    title: 'Всі компанії',
  }, {
    location: '/about',
    title: 'Про нас',
  }];
  if (roleModerator(loggedUser)) {
    result.push({
      location: '/admin',
      title: 'Адмінка',
    });
  }
  return result;
};

export default userLinks;