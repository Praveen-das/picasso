export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isStaging = process.env.NODE_ENV === 'staging'

// const HOST_DOMAIN = process.env.REACT_APP_ARTWORLD_BACKEND || 'localhost'
// export const BASE_URL = `http://${HOST_DOMAIN}:3001`

export const BASE_URL = isProduction
    ? process.env.REACT_APP_SERVER_URL
    : process.env.REACT_APP_LOCAL_SERVER_URL