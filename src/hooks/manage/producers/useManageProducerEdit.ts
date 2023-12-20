import { getAdminUrl } from '@/config/url.config'
import { ProducerService } from '@/services/persons/producer/producer.service'
import { TypePersonInput } from '@/services/persons/types/persons.type'
import { getKeys } from '@/utils/helpers/get-keys'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next13-progressbar'
import { useEffect } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

export const useManageProducerEdit = (
	queryId: string,
	setValue: UseFormSetValue<TypePersonInput>
) => {
	const queryClient = useQueryClient()

	const { push } = useRouter()

	const producerId = queryId

	const {
		isSuccess,
		isError,
		data: producer,
	} = useQuery({
		queryKey: ['get manage producer', producerId],
		queryFn: () => ProducerService.getById(producerId),
		enabled: !!queryId,
	})

	useEffect(() => {
		if (isSuccess) {
			getKeys(producer).forEach(({ key, value }) => {
				setValue(key, value)
			})
		}
	}, [isSuccess])

	useEffect(() => {
		if (isError) {
			toastError('Get producer', 'An error occurred while getting producer')
		}
	}, [isError])

	const { mutateAsync: updateMovie } = useMutation({
		mutationKey: ['update manage producer'],
		mutationFn: (data: TypePersonInput) =>
			ProducerService.update(producerId, data),
		onError: (error) => {
			toastError(error, 'Update producer')
		},
		onSuccess: async () => {
			toastr.success('Update producer', 'Update was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage producer', producerId],
			})
			push(getAdminUrl('/producers'))
		},
	})

	const onSubmit: SubmitHandler<TypePersonInput> = async (data) => {
		await updateMovie(data)
	}

	return { onSubmit }
}
