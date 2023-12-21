import { MediaService } from '@/services/media/media.service'
import { useQuery } from '@tanstack/react-query'

export const useNewMovies = () => {
	const { data } = useQuery({
		queryKey: ['get new movies'],
		queryFn: () =>
			MediaService.getAll({
				perPage: 15,
				sort: 'newest',
				isMovie: 'true',
				isVisible: 'true',
			}),
		select: ({ data }) => data,
	})

	return { media: data?.media, length: data?.length }
}
