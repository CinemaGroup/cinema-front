export const API_URL = `${process.env.APP_URL}/api`

export const getActorsUrl = (string: string) => `/actors${string}`
export const getAuthUrl = (string: string) => `/auth${string}`
export const getGoogleAuthUrl = (string: string) => `/auth/google${string}`
export const getCardsUrl = (string: string) => `/cards${string}`
export const getDirectorsUrl = (string: string) => `/directors${string}`
export const getEpisodesUrl = (string: string) => `/episodes${string}`
export const getFilesUrl = (string: string) => `/files${string}`
export const getGenresUrl = (string: string) => `/genres${string}`
export const getGroupsUrl = (string: string) => `/groups${string}`
export const getMediaUrl = (string: string) => `/media${string}`
export const getSeasonsUrl = (string: string) => `/seasons${string}`
export const getOperatorsUrl = (string: string) => `/operators${string}`
export const getProducersUrl = (string: string) => `/producers${string}`
export const getPromocodesUrl = (string: string) => `/promocodes${string}`
export const getScenaristsUrl = (string: string) => `/scenarists${string}`
export const getSubscribesUrl = (string: string) => `/subscribes${string}`
export const getTariffsUrl = (string: string) => `/tariffs${string}`
export const getUsersUrl = (string: string) => `/users${string}`
