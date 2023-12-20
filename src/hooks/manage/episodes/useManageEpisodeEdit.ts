import { getAdminUrl } from '@/config/url.config'
import { EpisodeService } from '@/services/media/episode/episode.service'
import { TypeEpisodeInput } from '@/services/media/episode/types/episode.type'
import { getKeys } from '@/utils/helpers/get-keys'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next13-progressbar'
import { useEffect } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

export const useManageEpisodeEdit = (
	queryId: string,
	setValue: UseFormSetValue<TypeEpisodeInput>
) => {
	const queryClient = useQueryClient()

	const { push } = useRouter()

	const episodeId = queryId

	const {
		isSuccess,
		isError,
		data: episode,
	} = useQuery({
		queryKey: ['get manage episode', episodeId],
		queryFn: () => EpisodeService.getById(episodeId),
		enabled: !!queryId,
	})

	useEffect(() => {
		if (isSuccess) {
			getKeys(episode).forEach(({ key, value }) => {
				setValue(key, value)
			})
		}
	}, [isSuccess])

	useEffect(() => {
		if (isError) {
			toastError('Get episode', 'An error occurred while getting episode')
		}
	}, [isError])

	const { mutateAsync: updateEpisode } = useMutation({
		mutationKey: ['update manage episode'],
		mutationFn: (data: TypeEpisodeInput) =>
			EpisodeService.update(episodeId, data),
		onError: (error) => {
			toastError(error, 'Update episode')
		},
		onSuccess: async () => {
			toastr.success('Update episode', 'Update was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage episode', episodeId],
			})
			push(getAdminUrl('/series'))
		},
	})

	const onSubmit: SubmitHandler<TypeEpisodeInput> = async (data) => {
		await updateEpisode(data)
	}

	return { onSubmit }
}
