import { ITableItem } from '@/components/ui/manage/manage-table/interface/manage-table.interface'
import { getAdminUrl } from '@/config/url.config'
import { UserService } from '@/services/user/user.service'
import { convertDate } from '@/utils/converts/convert-date'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next13-progressbar'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

export const useManageUsers = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const queryClient = useQueryClient()

	const { push } = useRouter()

	const queryData = useQuery({
		queryKey: ['get manage users list', searchTerm],
		queryFn: () =>
			UserService.getAll({
				searchTerm: searchTerm,
				perPage: 10,
			}),
		select: ({ data }) =>
			data.users.map(
				(user): ITableItem => ({
					id: user.id,
					editUrl: getAdminUrl(`/user/edit/${user.id}`),
					data: [
						user.login,
						user.email,
						user.isAdmin ? 'Admin' : 'User',
						user.isSubscribed ? 'Subscribed' : 'Not Subscribed',
						convertDate(user.createdAt),
					],
					isVisible: user.isVisible,
				})
			),
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create manage user'],
		mutationFn: () => UserService.create(),
		onError: (error) => {
			toastError(error, 'Create user')
		},
		onSuccess: ({ data: id }) => {
			toastr.success('Create user', 'Create was successful')
			push(getAdminUrl(`/user/edit/${id}`))
		},
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete manage user'],
		mutationFn: (userId: string) => UserService.delete(userId),
		onError: (error) => {
			toastError(error, 'Delete user')
		},
		onSuccess: async () => {
			toastr.success('Delete user', 'Delete was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage users list'],
			})
		},
	})

	const { mutateAsync: toggleVisibilityAsync } = useMutation({
		mutationKey: ['update manage user visibility'],
		mutationFn: (userId: string) => UserService.toggleVisibility(userId),
		onError: (error) => {
			toastError(error, 'Toggle visibility user')
		},
		onSuccess: async () => {
			toastr.success(
				'Toggle visibility user',
				'Toggle visibility was successful'
			)
			await queryClient.invalidateQueries({
				queryKey: ['get manage users list'],
			})
		},
	})

	return useMemo(
		() => ({
			searchTerm,
			...queryData,
			handleSearch,
			createAsync,
			deleteAsync,
			toggleVisibilityAsync,
		}),
		[queryData, searchTerm, createAsync, deleteAsync, toggleVisibilityAsync]
	)
}
