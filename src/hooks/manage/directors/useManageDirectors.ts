import { ITableItem } from '@/components/ui/manage/manage-table/interface/manage-table.interface'
import { getAdminUrl } from '@/config/url.config'
import { DirectorService } from '@/services/persons/director/director.service'
import { convertDate } from '@/utils/converts/convert-date'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

export const useManageDirectors = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const queryClient = useQueryClient()

	const { push } = useRouter()

	const queryData = useQuery({
		queryKey: ['get manage directors list', searchTerm],
		queryFn: () =>
			DirectorService.getAll({
				searchTerm: searchTerm,
				perPage: 10,
			}),
		select: ({ data }) =>
			data.persons.map(
				(director): ITableItem => ({
					id: director.id,
					editUrl: getAdminUrl(`/director/edit/${director.id}`),
					data: [
						director.name,
						director.slug,
						director.photo || '',
						convertDate(director.createdAt),
					],
					isVisible: director.isVisible,
				})
			),
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create manage director'],
		mutationFn: () => DirectorService.create(),
		onError: (error) => {
			toastError(error, 'Create director')
		},
		onSuccess: ({ data: id }) => {
			toastr.success('Create director', 'Create was successful')
			push(getAdminUrl(`/director/edit/${id}`))
		},
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete manage director'],
		mutationFn: (directorId: string) => DirectorService.delete(directorId),
		onError: (error) => {
			toastError(error, 'Delete director')
		},
		onSuccess: async () => {
			toastr.success('Delete director', 'Delete was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage directors list'],
			})
		},
	})

	const { mutateAsync: toggleVisibilityAsync } = useMutation({
		mutationKey: ['update manage director visibility'],
		mutationFn: (directorId: string) =>
			DirectorService.toggleVisibility(directorId),
		onError: (error) => {
			toastError(error, 'Toggle visibility director')
		},
		onSuccess: async () => {
			toastr.success(
				'Toggle visibility director',
				'Toggle visibility was successful'
			)
			await queryClient.invalidateQueries({
				queryKey: ['get manage directors list'],
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
