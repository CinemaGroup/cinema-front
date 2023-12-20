import { ITableItem } from '@/components/ui/manage/manage-table/interface/manage-table.interface'
import { getAdminUrl } from '@/config/url.config'
import { ScenaristService } from '@/services/persons/scenarist/scenarist.service'
import { convertDate } from '@/utils/converts/convert-date'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next13-progressbar'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

export const useManageScenarists = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const queryClient = useQueryClient()

	const { push } = useRouter()

	const queryData = useQuery({
		queryKey: ['get manage scenarists list', searchTerm],
		queryFn: () =>
			ScenaristService.getAll({
				searchTerm: searchTerm,
				perPage: 10,
			}),
		select: ({ data }) =>
			data.persons.map(
				(scenarist): ITableItem => ({
					id: scenarist.id,
					editUrl: getAdminUrl(`/scenarist/edit/${scenarist.id}`),
					data: [
						scenarist.name,
						scenarist.slug,
						scenarist.photo || '',
						convertDate(scenarist.createdAt),
					],
					isVisible: scenarist.isVisible,
				})
			),
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create manage scenarist'],
		mutationFn: () => ScenaristService.create(),
		onError: (error) => {
			toastError(error, 'Create scenarist')
		},
		onSuccess: ({ data: id }) => {
			toastr.success('Create scenarist', 'Create was successful')
			push(getAdminUrl(`/scenarist/edit/${id}`))
		},
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete manage scenarist'],
		mutationFn: (scenaristId: string) => ScenaristService.delete(scenaristId),
		onError: (error) => {
			toastError(error, 'Delete scenarist')
		},
		onSuccess: async () => {
			toastr.success('Delete scenarist', 'Delete was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage scenarists list'],
			})
		},
	})

	const { mutateAsync: toggleVisibilityAsync } = useMutation({
		mutationKey: ['update manage scenarist visibility'],
		mutationFn: (scenaristId: string) =>
			ScenaristService.toggleVisibility(scenaristId),
		onError: (error) => {
			toastError(error, 'Toggle visibility scenarist')
		},
		onSuccess: async () => {
			toastr.success(
				'Toggle visibility scenarist',
				'Toggle visibility was successful'
			)
			await queryClient.invalidateQueries({
				queryKey: ['get manage scenarists list'],
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
