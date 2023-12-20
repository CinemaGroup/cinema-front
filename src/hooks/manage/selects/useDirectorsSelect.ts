import { IOption } from '@/components/ui/selects/react-select/interface/react-select.interface'
import { DirectorService } from '@/services/persons/director/director.service'
import { useQuery } from '@tanstack/react-query'

export const useDirectorsSelect = () => {
	const queryData = useQuery({
		queryKey: ['get manage select directors'],
		queryFn: () => DirectorService.getAll(),
		select: ({ data }) =>
			data.persons.map(
				(director): IOption => ({
					label: director.name,
					value: director.id,
				})
			) || [],
	})

	return { directors: queryData.data || [] }
}
