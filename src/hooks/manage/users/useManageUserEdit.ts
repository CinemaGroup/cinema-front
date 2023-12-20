import { getAdminUrl } from '@/config/url.config'
import { TypeUserInput } from '@/services/user/types/user.type'
import { UserService } from '@/services/user/user.service'
import { getKeys } from '@/utils/helpers/get-keys'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next13-progressbar'
import { useEffect } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

export const useManageUserEdit = (
	queryId: string,
	setValue: UseFormSetValue<TypeUserInput>
) => {
	const queryClient = useQueryClient()

	const { push } = useRouter()

	const userId = queryId

	const {
		isSuccess,
		isError,
		data: user,
	} = useQuery({
		queryKey: ['get manage user', userId],
		queryFn: () => UserService.getById(userId),
		enabled: !!queryId,
	})

	useEffect(() => {
		if (isSuccess) {
			getKeys(user).forEach(({ key, value }) => {
				setValue(key, value)
			})
		}
	}, [isSuccess])

	useEffect(() => {
		if (isError) {
			toastError('Get user', 'An error occurred while getting user')
		}
	}, [isError])

	const { mutateAsync: updateMovie } = useMutation({
		mutationKey: ['update manage user'],
		mutationFn: (data: TypeUserInput) => UserService.update(userId, data),
		onError: (error) => {
			toastError(error, 'Update user')
		},
		onSuccess: async () => {
			toastr.success('Update user', 'Update was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage user', userId],
			})
			push(getAdminUrl('/users'))
		},
	})

	const onSubmit: SubmitHandler<TypeUserInput> = async (data) => {
		await updateMovie(data)
	}

	return { onSubmit }
}
