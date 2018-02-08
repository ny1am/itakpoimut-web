import routeConfig from '../routeConfig';

const findRoute = (path) => routeConfig.find(route => route.path === path);

export default findRoute;