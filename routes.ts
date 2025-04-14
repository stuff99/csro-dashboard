/*
 * These routes are public and can be accessed without authentication
 * @type {string[]}
*/
export const publicRoutes=[
    "/",
    "/new-verification",
]

/*
 * These routes are used for authentication
 * @type {string[]}
*/
export const authRoutes=[
    "/register",
    "/login",
     "/error",
     '/reset-password',
     '/new-password',
]

/*
 * These routes are used for API authentication
 * @type {string}
*/
export const apiAuthPrefix="/api/auth"

/*
 * Default route after login
 * @type {string}
*/
export const DEFAULT_LOGIN_USER_REDIRECT = "/user"