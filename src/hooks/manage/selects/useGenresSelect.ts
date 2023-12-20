import { IOption } from '@/components/ui/selects/react-select/interface/react-select.interface'
import { GenreService } from '@/services/affiliations/genre/genre.service'
import { useQuery } from '@tanstack/react-query'

export const useGenresSelect = () => {
	const queryData = useQuery({
		queryKey: ['get all genres'],
		queryFn: () => GenreService.getAll(),
		select: ({ data }) =>
			data.affiliations.map(
				(genre): IOption => ({
					label: genre.name,
					value: genre.id,
				})
			) || [],
	})

	return { genres: queryData.data || [] }
}
