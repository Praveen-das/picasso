export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isStaging = process.env.NODE_ENV === 'staging'

export const SERVER_URL = isProduction
    ? process.env.REACT_APP_SERVER_URL
    : process.env.REACT_APP_LOCAL_SERVER_URL