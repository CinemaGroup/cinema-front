import NotFound from '@/app/not-found'
import { ADMIN_PANEL_URL } from '@/config/url.config'
import { REFRESH_TOKEN } from '@/constants/auth.constants'
import { useActions } from '@/hooks/queries/user/useActions'
import { useAuth } from '@/hooks/queries/user/useAuth'
import { getAccessToken } from '@/services/auth/auth.helper'
import Cookies from 'js-cookie'
import { usePathname, useRouter } from 'next/navigation'
import { FC, PropsWithChildren, useEffect } from 'react'
import { protectedRoutes } from './protected-routes.data'

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const { user } = useAuth()
	const { checkAuth, logout } = useActions()
	const pathname = usePathname()
	const { replace } = useRouter()

	useEffect(() => {
		const accessToken = getAccessToken()
		if (accessToken) checkAuth()
	}, [])

	useEffect(() => {
		const refreshToken = Cookies.get(REFRESH_TOKEN)
		if (!refreshToken && user) logout()
	}, [pathname])

	const isProtectedRoute = protectedRoutes.some((route) =>
		pathname?.startsWith(route)
	)
	const isAdminRoute = pathname?.startsWith(ADMIN_PANEL_URL)

	if (!isProtectedRoute && !isAdminRoute) return <>{children}</>

	if (user && (user.isAdmin || (isProtectedRoute && !isAdminRoute)))
		return <>{children}</>

	if (user && isAdminRoute) return <NotFound />

	if (!user && pathname !== '/auth') replace('/auth')

	return <NotFound />
}

export default AuthProvider
