import { getAdminUrl } from '@/config/url.config'
import { MediaService } from '@/services/media/media.service'
import { TypeMediaMovieInput } from '@/services/media/types/media.type'
import { getKeys } from '@/utils/helpers/get-keys'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next13-progressbar'
import { useEffect } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

export const useManageMovieEdit = (
	queryId: string,
	setValue: UseFormSetValue<TypeMediaMovieInput>
) => {
	const queryClient = useQueryClient()

	const { push } = useRouter()

	const movieId = queryId

	const {
		isSuccess,
		isError,
		data: movie,
	} = useQuery({
		queryKey: ['get manage movie', movieId],
		queryFn: () => MediaService.movieById(movieId),
		enabled: !!queryId,
	})

	useEffect(() => {
		if (isSuccess) {
			getKeys(movie).forEach(({ key, value }) => {
				setValue(key, value)
			})
		}
	}, [isSuccess])

	useEffect(() => {
		if (isError) {
			toastError('Get movie', 'An error occurred while getting movie')
		}
	}, [isError])

	console.log(movie)

	const { mutateAsync: updateMovie } = useMutation({
		mutationKey: ['update manage movie'],
		mutationFn: (data: TypeMediaMovieInput) =>
			MediaService.updateMovie(movieId, data),
		onError: (error) => {
			toastError(error, 'Update movie')
		},
		onSuccess: async () => {
			toastr.success('Update movie', 'Update was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage movie', movieId],
			})
			push(getAdminUrl('/movies'))
		},
	})

	const onSubmit: SubmitHandler<TypeMediaMovieInput> = async (data) => {
		await updateMovie(data)
	}

	return { onSubmit }
}
