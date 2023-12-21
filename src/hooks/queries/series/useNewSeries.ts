import { MediaService } from '@/services/media/media.service'
import { useQuery } from '@tanstack/react-query'

export const useNewSeries = () => {
	const { data } = useQuery({
		queryKey: ['get new series'],
		queryFn: () =>
			MediaService.getAll({
				perPage: 15,
				sort: 'newest',
				isSeries: 'true',
				isVisible: 'true',
			}),
		select: ({ data }) => data,
	})

	return { media: data?.media, length: data?.length }
}
