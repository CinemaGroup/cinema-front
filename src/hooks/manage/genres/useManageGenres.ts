import { ITableItem } from '@/components/ui/manage/manage-table/interface/manage-table.interface'
import { getAdminUrl } from '@/config/url.config'
import { GenreService } from '@/services/affiliations/genre/genre.service'
import { convertDate } from '@/utils/converts/convert-date'
import { descriptionToExcerpt } from '@/utils/converts/description-to-excerpt'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

export const useManageGenres = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const queryClient = useQueryClient()

	const { push } = useRouter()

	const queryData = useQuery({
		queryKey: ['get manage genres list', searchTerm],
		queryFn: () =>
			GenreService.getAll({
				searchTerm: searchTerm,
				perPage: 10,
			}),
		select: ({ data }) =>
			data.affiliations.map(
				(genre): ITableItem => ({
					id: genre.id,
					editUrl: getAdminUrl(`/genre/edit/${genre.id}`),
					data: [
						genre.name,
						genre.slug,
						genre.icon || '',
						descriptionToExcerpt(genre.description || '', 25),
						convertDate(genre.createdAt),
					],
					isVisible: genre.isVisible,
				})
			),
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create manage genre'],
		mutationFn: () => GenreService.create(),
		onError: (error) => {
			toastError(error, 'Create genre')
		},
		onSuccess: ({ data: id }) => {
			toastr.success('Create genre', 'Create was successful')
			push(getAdminUrl(`/genre/edit/${id}`))
		},
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete manage genre'],
		mutationFn: (genreId: string) => GenreService.delete(genreId),
		onError: (error) => {
			toastError(error, 'Delete genre')
		},
		onSuccess: async () => {
			toastr.success('Delete genre', 'Delete was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage genres list'],
			})
		},
	})

	const { mutateAsync: toggleVisibilityAsync } = useMutation({
		mutationKey: ['update manage genre visibility'],
		mutationFn: (genreId: string) => GenreService.toggleVisibility(genreId),
		onError: (error) => {
			toastError(error, 'Toggle visibility genre')
		},
		onSuccess: async () => {
			toastr.success(
				'Toggle visibility genre',
				'Toggle visibility was successful'
			)
			await queryClient.invalidateQueries({
				queryKey: ['get manage genres list'],
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
