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

export const useManageMovies = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const queryClient = useQueryClient()

	const { push } = useRouter()

	const queryData = useQuery({
		queryKey: ['get manage movies list', searchTerm],
		queryFn: () =>
			MediaService.getAll({
				searchTerm: searchTerm,
				perPage: 10,
				isMovie: true,
			}),
		select: ({ data }) =>
			data.media.map(
				(movie): ITableItem => ({
					id: movie.id,
					editUrl: getAdminUrl(`/movie/edit/${movie.id}`),
					data: [
						movie.name,
						descriptionToExcerpt(movie.excerpt || '', 25),
						movie.totalLikes,
						movie.totalViews,
						convertDate(movie.createdAt),
					],
					isVisible: movie.isVisible,
				})
			),
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create manage movie'],
		mutationFn: () => MediaService.createMovie(),
		onError: (error) => {
			toastError(error, 'Create movie')
		},
		onSuccess: ({ data: id }) => {
			toastr.success('Create movie', 'Create was successful')
			push(getAdminUrl(`/movie/edit/${id}`))
		},
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete manage movie'],
		mutationFn: (movieId: string) => MediaService.delete(movieId),
		onError: (error) => {
			toastError(error, 'Delete movie')
		},
		onSuccess: async () => {
			toastr.success('Delete movie', 'Delete was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage movies list'],
			})
		},
	})

	const { mutateAsync: toggleVisibilityAsync } = useMutation({
		mutationKey: ['update manage movie visibility'],
		mutationFn: (movieId: string) => MediaService.toggleVisibility(movieId),
		onError: (error) => {
			toastError(error, 'Toggle visibility movie')
		},
		onSuccess: async () => {
			toastr.success(
				'Toggle visibility movie',
				'Toggle visibility was successful'
			)
			await queryClient.invalidateQueries({
				queryKey: ['get manage movies list'],
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
