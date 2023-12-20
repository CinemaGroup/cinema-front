import { getAdminUrl } from '@/config/url.config'
import { ActorService } from '@/services/persons/actor/actor.service'
import { TypePersonInput } from '@/services/persons/types/persons.type'
import { getKeys } from '@/utils/helpers/get-keys'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next13-progressbar'
import { useEffect } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

export const useManageActorEdit = (
	queryId: string,
	setValue: UseFormSetValue<TypePersonInput>
) => {
	const queryClient = useQueryClient()

	const { push } = useRouter()

	const actorId = queryId

	const {
		isSuccess,
		isError,
		data: actor,
	} = useQuery({
		queryKey: ['get manage actor', actorId],
		queryFn: () => ActorService.getById(actorId),
		enabled: !!queryId,
	})

	useEffect(() => {
		if (isSuccess) {
			getKeys(actor).forEach(({ key, value }) => {
				setValue(key, value)
			})
		}
	}, [isSuccess])

	useEffect(() => {
		if (isError) {
			toastError('Get actor', 'An error occurred while getting actor')
		}
	}, [isError])

	const { mutateAsync: updateMovie } = useMutation({
		mutationKey: ['update manage actor'],
		mutationFn: (data: TypePersonInput) => ActorService.update(actorId, data),
		onError: (error) => {
			toastError(error, 'Update actor')
		},
		onSuccess: async () => {
			toastr.success('Update actor', 'Update was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage actor', actorId],
			})
			push(getAdminUrl('/actors'))
		},
	})

	const onSubmit: SubmitHandler<TypePersonInput> = async (data) => {
		await updateMovie(data)
	}

	return { onSubmit }
}
