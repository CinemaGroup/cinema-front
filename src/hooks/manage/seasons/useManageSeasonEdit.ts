import { getAdminUrl } from '@/config/url.config'
import { SeasonService } from '@/services/media/season/season.service'
import { TypeSeasonInput } from '@/services/media/season/types/season.type'
import { getKeys } from '@/utils/helpers/get-keys'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next13-progressbar'
import { useEffect } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

export const useManageSeasonEdit = (
	queryId: string,
	setValue: UseFormSetValue<TypeSeasonInput>
) => {
	const queryClient = useQueryClient()

	const { push } = useRouter()

	const seasonId = queryId

	const {
		isSuccess,
		isError,
		data: season,
	} = useQuery({
		queryKey: ['get manage season', seasonId],
		queryFn: () => SeasonService.getById(seasonId),
		enabled: !!queryId,
	})

	useEffect(() => {
		if (isSuccess) {
			getKeys(season).forEach(({ key, value }) => {
				setValue(key, value)
			})
		}
	}, [isSuccess])

	useEffect(() => {
		if (isError) {
			toastError('Get season', 'An error occurred while getting season')
		}
	}, [isError])

	const { mutateAsync: updateSeason } = useMutation({
		mutationKey: ['update manage season'],
		mutationFn: (data: TypeSeasonInput) => SeasonService.update(seasonId, data),
		onError: (error) => {
			toastError(error, 'Update season')
		},
		onSuccess: async () => {
			toastr.success('Update season', 'Update was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage season', seasonId],
			})
			push(getAdminUrl('/series'))
		},
	})

	const onSubmit: SubmitHandler<TypeSeasonInput> = async (data) => {
		await updateSeason(data)
	}

	return { onSubmit }
}
