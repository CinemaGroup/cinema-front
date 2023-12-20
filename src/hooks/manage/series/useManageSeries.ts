import { ITableItem } from '@/components/ui/manage/manage-table/interface/manage-table.interface'
import { getAdminUrl } from '@/config/url.config'
import { MediaService } from '@/services/media/media.service'
import { convertDate } from '@/utils/converts/convert-date'
import { descriptionToExcerpt } from '@/utils/converts/description-to-excerpt'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next13-progressbar'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

export const useManageSeries = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const queryClient = useQueryClient()

	const { push } = useRouter()

	const queryData = useQuery({
		queryKey: ['get manage series list', searchTerm],
		queryFn: () =>
			MediaService.getAll({
				searchTerm: searchTerm,
				perPage: 10,
				isSeries: true,
			}),
		select: ({ data }) =>
			data.media.map(
				(series): ITableItem => ({
					id: series.id,
					editUrl: getAdminUrl(`/series/edit/${series.id}`),
					seasonUrl: getAdminUrl(`/seasons/${series.id}`),
					data: [
						series.name,
						descriptionToExcerpt(series.excerpt || '', 25),
						series.totalLikes,
						series.totalViews,
						convertDate(series.createdAt),
					],
					isVisible: series.isVisible,
				})
			),
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create manage series'],
		mutationFn: () => MediaService.createSeries(),
		onError: (error) => {
			toastError(error, 'Create series')
		},
		onSuccess: ({ data: id }) => {
			toastr.success('Create series', 'Create was successful')
			push(getAdminUrl(`/series/edit/${id}`))
		},
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete manage series'],
		mutationFn: (seriesId: string) => MediaService.delete(seriesId),
		onError: (error) => {
			toastError(error, 'Delete series')
		},
		onSuccess: async () => {
			toastr.success('Delete series', 'Delete was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage series list'],
			})
		},
	})

	const { mutateAsync: toggleVisibilityAsync } = useMutation({
		mutationKey: ['update manage series visibility'],
		mutationFn: (seriesId: string) => MediaService.toggleVisibility(seriesId),
		onError: (error) => {
			toastError(error, 'Toggle visibility series')
		},
		onSuccess: async () => {
			toastr.success(
				'Toggle visibility series',
				'Toggle visibility was successful'
			)
			await queryClient.invalidateQueries({
				queryKey: ['get manage series list'],
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
