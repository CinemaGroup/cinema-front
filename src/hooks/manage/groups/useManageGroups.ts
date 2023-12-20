import { ITableItem } from '@/components/ui/manage/manage-table/interface/manage-table.interface'
import { getAdminUrl } from '@/config/url.config'
import { GroupService } from '@/services/affiliations/group/group.service'
import { convertDate } from '@/utils/converts/convert-date'
import { descriptionToExcerpt } from '@/utils/converts/description-to-excerpt'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next13-progressbar'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

export const useManageGroups = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const queryClient = useQueryClient()

	const { push } = useRouter()

	const queryData = useQuery({
		queryKey: ['get manage groups list', searchTerm],
		queryFn: () =>
			GroupService.getAll({
				searchTerm: searchTerm,
				perPage: 10,
			}),
		select: ({ data }) =>
			data.affiliations.map(
				(group): ITableItem => ({
					id: group.id,
					editUrl: getAdminUrl(`/group/edit/${group.id}`),
					data: [
						group.name,
						group.slug,
						group.icon || '',
						descriptionToExcerpt(group.description || '', 25),
						convertDate(group.createdAt),
					],
					isVisible: group.isVisible,
				})
			),
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create manage group'],
		mutationFn: () => GroupService.create(),
		onError: (error) => {
			toastError(error, 'Create group')
		},
		onSuccess: ({ data: id }) => {
			toastr.success('Create group', 'Create was successful')
			push(getAdminUrl(`/group/edit/${id}`))
		},
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete manage group'],
		mutationFn: (groupId: string) => GroupService.delete(groupId),
		onError: (error) => {
			toastError(error, 'Delete group')
		},
		onSuccess: async () => {
			toastr.success('Delete group', 'Delete was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage groups list'],
			})
			queryData.refetch()
		},
	})

	const { mutateAsync: toggleVisibilityAsync } = useMutation({
		mutationKey: ['update manage group visibility'],
		mutationFn: (groupId: string) => GroupService.toggleVisibility(groupId),
		onError: (error) => {
			toastError(error, 'Toggle visibility group')
		},
		onSuccess: async () => {
			toastr.success(
				'Toggle visibility group',
				'Toggle visibility was successful'
			)
			await queryClient.invalidateQueries({
				queryKey: ['get manage groups list'],
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
