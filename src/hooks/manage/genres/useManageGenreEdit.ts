import { getAdminUrl } from '@/config/url.config'
import { GenreService } from '@/services/affiliations/genre/genre.service'
import { TypeAffiliationInput } from '@/services/affiliations/types/affiliation.type'
import { getKeys } from '@/utils/helpers/get-keys'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

export const useManageGenreEdit = (
	queryId: string,
	setValue: UseFormSetValue<TypeAffiliationInput>
) => {
	const queryClient = useQueryClient()

	const { push } = useRouter()

	const genreId = queryId

	const {
		isSuccess,
		isError,
		data: genre,
	} = useQuery({
		queryKey: ['get manage genre', genreId],
		queryFn: () => GenreService.getById(genreId),
		enabled: !!queryId,
	})

	useEffect(() => {
		if (isSuccess) {
			getKeys(genre).forEach(({ key, value }) => {
				setValue(key, value)
			})
		}
	}, [isSuccess])

	useEffect(() => {
		if (isError) {
			toastError('Get genre', 'An error occurred while getting genre')
		}
	}, [isError])

	const { mutateAsync: updateMovie } = useMutation({
		mutationKey: ['update manage genre'],
		mutationFn: (data: TypeAffiliationInput) =>
			GenreService.update(genreId, data),
		onError: (error) => {
			toastError(error, 'Update genre')
		},
		onSuccess: async () => {
			toastr.success('Update genre', 'Update was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage genre', genreId],
			})
			push(getAdminUrl('/genres'))
		},
	})

	const onSubmit: SubmitHandler<TypeAffiliationInput> = async (data) => {
		await updateMovie(data)
	}

	return { onSubmit }
}
