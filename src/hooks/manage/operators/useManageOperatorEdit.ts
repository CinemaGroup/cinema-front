import { getAdminUrl } from '@/config/url.config'
import { OperatorService } from '@/services/persons/operator/operator.service'
import { TypePersonInput } from '@/services/persons/types/persons.type'
import { getKeys } from '@/utils/helpers/get-keys'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next13-progressbar'
import { useEffect } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

export const useManageOperatorEdit = (
	queryId: string,
	setValue: UseFormSetValue<TypePersonInput>
) => {
	const queryClient = useQueryClient()

	const { push } = useRouter()

	const operatorId = queryId

	const {
		isSuccess,
		isError,
		data: operator,
	} = useQuery({
		queryKey: ['get manage operator', operatorId],
		queryFn: () => OperatorService.getById(operatorId),
		enabled: !!queryId,
	})

	useEffect(() => {
		if (isSuccess) {
			getKeys(operator).forEach(({ key, value }) => {
				setValue(key, value)
			})
		}
	}, [isSuccess])

	useEffect(() => {
		if (isError) {
			toastError('Get operator', 'An error occurred while getting operator')
		}
	}, [isError])

	const { mutateAsync: updateMovie } = useMutation({
		mutationKey: ['update manage operator'],
		mutationFn: (data: TypePersonInput) =>
			OperatorService.update(operatorId, data),
		onError: (error) => {
			toastError(error, 'Update operator')
		},
		onSuccess: async () => {
			toastr.success('Update operator', 'Update was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage operator', operatorId],
			})
			push(getAdminUrl('/operators'))
		},
	})

	const onSubmit: SubmitHandler<TypePersonInput> = async (data) => {
		await updateMovie(data)
	}

	return { onSubmit }
}
