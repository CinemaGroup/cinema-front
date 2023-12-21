import { MediaService } from '@/services/media/media.service'
import { useQuery } from '@tanstack/react-query'

export const useNewMedia = () => {
	const { data } = useQuery({
		queryKey: ['get new media'],
		queryFn: () =>
			MediaService.getAll({
				perPage: 15,
				sort: 'newest',
				isVisible: 'true',
			}),
		select: ({ data }) => data,
	})

	return { media: data?.media, length: data?.length }
}
