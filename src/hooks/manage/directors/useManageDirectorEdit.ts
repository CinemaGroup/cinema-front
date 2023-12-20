import { getAdminUrl } from '@/config/url.config'
import { DirectorService } from '@/services/persons/director/director.service'
import { TypePersonInput } from '@/services/persons/types/persons.type'
import { getKeys } from '@/utils/helpers/get-keys'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next13-progressbar'
import { useEffect } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

export const useManageDirectorEdit = (
	queryId: string,
	setValue: UseFormSetValue<TypePersonInput>
) => {
	const queryClient = useQueryClient()

	const { push } = useRouter()

	const directorId = queryId

	const {
		isSuccess,
		isError,
		data: director,
	} = useQuery({
		queryKey: ['get manage director', directorId],
		queryFn: () => DirectorService.getById(directorId),
		enabled: !!queryId,
	})

	useEffect(() => {
		if (isSuccess) {
			getKeys(director).forEach(({ key, value }) => {
				setValue(key, value)
			})
		}
	}, [isSuccess])

	useEffect(() => {
		if (isError) {
			toastError('Get director', 'An error occurred while getting director')
		}
	}, [isError])

	const { mutateAsync: updateMovie } = useMutation({
		mutationKey: ['update manage director'],
		mutationFn: (data: TypePersonInput) =>
			DirectorService.update(directorId, data),
		onError: (error) => {
			toastError(error, 'Update director')
		},
		onSuccess: async () => {
			toastr.success('Update director', 'Update was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage director', directorId],
			})
			push(getAdminUrl('/directors'))
		},
	})

	const onSubmit: SubmitHandler<TypePersonInput> = async (data) => {
		await updateMovie(data)
	}

	return { onSubmit }
}
