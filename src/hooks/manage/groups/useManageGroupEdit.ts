import { getAdminUrl } from '@/config/url.config'
import { GroupService } from '@/services/affiliations/group/group.service'
import { TypeAffiliationInput } from '@/services/affiliations/types/affiliation.type'
import { getKeys } from '@/utils/helpers/get-keys'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next13-progressbar'
import { useEffect } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

export const useManageGroupEdit = (
	queryId: string,
	setValue: UseFormSetValue<TypeAffiliationInput>
) => {
	const queryClient = useQueryClient()

	const { push } = useRouter()

	const groupId = queryId

	const {
		isSuccess,
		isError,
		data: group,
	} = useQuery({
		queryKey: ['get manage group', groupId],
		queryFn: () => GroupService.getById(groupId),
		enabled: !!queryId,
	})

	useEffect(() => {
		if (isSuccess) {
			getKeys(group).forEach(({ key, value }) => {
				setValue(key, value)
			})
		}
	}, [isSuccess])

	useEffect(() => {
		if (isError) {
			toastError('Get group', 'An error occurred while getting group')
		}
	}, [isError])

	const { mutateAsync: updateMovie } = useMutation({
		mutationKey: ['update manage group'],
		mutationFn: (data: TypeAffiliationInput) =>
			GroupService.update(groupId, data),
		onError: (error) => {
			toastError(error, 'Update group')
		},
		onSuccess: async () => {
			toastr.success('Update group', 'Update was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage group', groupId],
			})
			push(getAdminUrl('/groups'))
		},
	})

	const onSubmit: SubmitHandler<TypeAffiliationInput> = async (data) => {
		await updateMovie(data)
	}

	return { onSubmit }
}
