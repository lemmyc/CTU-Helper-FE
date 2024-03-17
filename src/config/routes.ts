const routePrefix = import.meta.env.PUBLIC_URL || "/tvts"
const routes = {
    home: `${routePrefix}/`,
    login: `${routePrefix}/login`,
    signup: `${routePrefix}/sign-up`,
    chat: `${routePrefix}/chat`,
};
export default routes;