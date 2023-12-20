import { errorCatch } from '@/api/api.helpers'
import { UserService } from '@/services/user/user.service'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useAuth } from './useAuth'

export const useProfile = () => {
	const { user } = useAuth()

	const { data, isError, error } = useQuery({
		queryKey: ['get profile'],
		queryFn: () => UserService.getProfile(),
		select: ({ data }) => data,
		enabled: !!user,
	})

	useEffect(() => {
		if (isError) console.log(errorCatch(error))
	}, [isError])

	return { profile: data }
}
