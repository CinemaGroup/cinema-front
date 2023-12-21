import { ITableItem } from '@/components/ui/manage/manage-table/interface/manage-table.interface'
import { getAdminUrl } from '@/config/url.config'
import { EpisodeService } from '@/services/media/episode/episode.service'
import { convertDate } from '@/utils/converts/convert-date'
import { descriptionToExcerpt } from '@/utils/converts/description-to-excerpt'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next13-progressbar'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

export const useManageEpisodes = (seasonId: string) => {
	const [searchTerm, setSearchTerm] = useState('')

	const queryClient = useQueryClient()

	const { push } = useRouter()

	const queryData = useQuery({
		queryKey: ['get manage episodes list', searchTerm],
		queryFn: () => EpisodeService.getAll({ seasonId, perPage: 10 }),
		select: ({ data }) =>
			data.episodes.map(
				(episode): ITableItem => ({
					id: episode.id,
					editUrl: getAdminUrl(`/episode/edit/${episode.id}`),
					data: [
						episode.number,
						descriptionToExcerpt(episode.excerpt, 25),
						episode.likes,
						episode.views,
						convertDate(episode.createdAt),
					],
					isVisible: episode.isVisible,
				})
			),
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create manage episode'],
		mutationFn: () => EpisodeService.create(seasonId),
		onError: (error) => {
			toastError(error, 'Create episode')
		},
		onSuccess: ({ data: id }) => {
			toastr.success('Create episode', 'Create was successful')
			push(getAdminUrl(`/episode/edit/${id}`))
		},
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete manage episode'],
		mutationFn: (episodeId: string) => EpisodeService.delete(episodeId),
		onError: (error) => {
			toastError(error, 'Delete episode')
		},
		onSuccess: async () => {
			toastr.success('Delete episode', 'Delete was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage episodes list'],
			})
		},
	})

	const { mutateAsync: toggleVisibilityAsync } = useMutation({
		mutationKey: ['update manage episode visibility'],
		mutationFn: (episodeId: string) =>
			EpisodeService.toggleVisibility(episodeId),
		onError: (error) => {
			toastError(error, 'Toggle visibility episode')
		},
		onSuccess: async () => {
			toastr.success(
				'Toggle visibility episode',
				'Toggle visibility was successful'
			)
			await queryClient.invalidateQueries({
				queryKey: ['get manage episodes list'],
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
