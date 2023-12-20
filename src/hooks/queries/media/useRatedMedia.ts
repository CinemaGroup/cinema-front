import { MediaService } from '@/services/media/media.service'
import { useQuery } from '@tanstack/react-query'

export const useRatedMedia = () => {
	const { data } = useQuery({
		queryKey: ['get rated media'],
		queryFn: () => MediaService.getAll({ perPage: 10, sort: 'by-rating' }),
		select: ({ data }) => data,
	})

	return { media: data?.media, length: data?.length }
}
