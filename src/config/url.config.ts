export const getSiteUrl = () => process.env.APP_URL as string

export const ADMIN_PANEL_URL = '/manage'

export const getAdminUrl = (path = '') => `${ADMIN_PANEL_URL}${path}`
export const getAdminHomeUrl = () => `${ADMIN_PANEL_URL}`
