import { getAdminUrl } from '@/config/url.config'
import { MediaService } from '@/services/media/media.service'
import { TypeMediaInput } from '@/services/media/types/media.type'
import { getKeys } from '@/utils/helpers/get-keys'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

export const useManageSeriesEdit = (
	queryId: string,
	setValue: UseFormSetValue<TypeMediaInput>
) => {
	const queryClient = useQueryClient()

	const { push } = useRouter()

	const seriesId = queryId

	const {
		isSuccess,
		isError,
		data: series,
	} = useQuery({
		queryKey: ['get manage series', seriesId],
		queryFn: () => MediaService.seriesById(seriesId),
		enabled: !!queryId,
	})

	useEffect(() => {
		if (isSuccess) {
			getKeys(series).forEach(({ key, value }) => {
				setValue(key, value)
			})
		}
	}, [isSuccess])

	useEffect(() => {
		if (isError) {
			toastError('Get series', 'An error occurred while getting series')
		}
	}, [isError])

	const { mutateAsync: updateSeries } = useMutation({
		mutationKey: ['update manage series'],
		mutationFn: (data: TypeMediaInput) =>
			MediaService.updateSeries(seriesId, data),
		onError: (error) => {
			toastError(error, 'Update series')
		},
		onSuccess: async () => {
			toastr.success('Update series', 'Update was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage series', seriesId],
			})
			push(getAdminUrl('/series'))
		},
	})

	const onSubmit: SubmitHandler<TypeMediaInput> = async (data) => {
		await updateSeries(data)
	}

	return { onSubmit }
}
