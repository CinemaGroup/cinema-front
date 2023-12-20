import { getAdminUrl } from '@/config/url.config'
import { ScenaristService } from '@/services/persons/scenarist/scenarist.service'
import { TypePersonInput } from '@/services/persons/types/persons.type'
import { getKeys } from '@/utils/helpers/get-keys'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next13-progressbar'
import { useEffect } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

export const useManageScenaristEdit = (
	queryId: string,
	setValue: UseFormSetValue<TypePersonInput>
) => {
	const queryClient = useQueryClient()

	const { push } = useRouter()

	const scenaristId = queryId

	const {
		isSuccess,
		isError,
		data: scenarist,
	} = useQuery({
		queryKey: ['get manage scenarist', scenaristId],
		queryFn: () => ScenaristService.getById(scenaristId),
		enabled: !!queryId,
	})

	useEffect(() => {
		if (isSuccess) {
			getKeys(scenarist).forEach(({ key, value }) => {
				setValue(key, value)
			})
		}
	}, [isSuccess])

	useEffect(() => {
		if (isError) {
			toastError('Get scenarist', 'An error occurred while getting scenarist')
		}
	}, [isError])

	const { mutateAsync: updateMovie } = useMutation({
		mutationKey: ['update manage scenarist'],
		mutationFn: (data: TypePersonInput) =>
			ScenaristService.update(scenaristId, data),
		onError: (error) => {
			toastError(error, 'Update scenarist')
		},
		onSuccess: async () => {
			toastr.success('Update scenarist', 'Update was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage scenarist', scenaristId],
			})
			push(getAdminUrl('/scenarists'))
		},
	})

	const onSubmit: SubmitHandler<TypePersonInput> = async (data) => {
		await updateMovie(data)
	}

	return { onSubmit }
}
