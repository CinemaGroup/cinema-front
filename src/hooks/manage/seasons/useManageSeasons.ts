import { ITableItem } from '@/components/ui/manage/manage-table/interface/manage-table.interface'
import { getAdminUrl } from '@/config/url.config'
import { SeasonService } from '@/services/media/season/season.service'
import { convertDate } from '@/utils/converts/convert-date'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next13-progressbar'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

export const useManageSeasons = (mediaId: string) => {
	const [searchTerm, setSearchTerm] = useState('')

	const queryClient = useQueryClient()

	const { push } = useRouter()

	const queryData = useQuery({
		queryKey: ['get manage seasons list', searchTerm],
		queryFn: () => SeasonService.getAll(mediaId),
		select: ({ data }) =>
			data.seasons.map(
				(season): ITableItem => ({
					id: season.id,
					editUrl: getAdminUrl(`/season/edit/${season.id}`),
					episodeUrl: getAdminUrl(`/episodes/${season.id}`),
					data: [
						season.number, 
						convertDate(season.createdAt)
					],
					isVisible: season.isVisible,
				})
			),
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create manage season'],
		mutationFn: () => SeasonService.create(mediaId),
		onError: (error) => {
			toastError(error, 'Create season')
		},
		onSuccess: ({ data: id }) => {
			toastr.success('Create season', 'Create was successful')
			push(getAdminUrl(`/season/edit/${id}`))
		},
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete manage season'],
		mutationFn: (seasonId: string) => SeasonService.delete(seasonId),
		onError: (error) => {
			toastError(error, 'Delete season')
		},
		onSuccess: async () => {
			toastr.success('Delete season', 'Delete was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage seasons list'],
			})
		},
	})

	const { mutateAsync: toggleVisibilityAsync } = useMutation({
		mutationKey: ['update manage season visibility'],
		mutationFn: (seasonId: string) => SeasonService.toggleVisibility(seasonId),
		onError: (error) => {
			toastError(error, 'Toggle visibility season')
		},
		onSuccess: async () => {
			toastr.success(
				'Toggle visibility season',
				'Toggle visibility was successful'
			)
			await queryClient.invalidateQueries({
				queryKey: ['get manage seasons list'],
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
