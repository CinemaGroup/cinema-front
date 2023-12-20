import { IOption } from '@/components/ui/selects/react-select/interface/react-select.interface'
import { ScenaristService } from '@/services/persons/scenarist/scenarist.service'
import { useQuery } from '@tanstack/react-query'

export const useScenaristsSelect = () => {
	const queryData = useQuery({
		queryKey: ['get manage select scenarists'],
		queryFn: () => ScenaristService.getAll(),
		select: ({ data }) =>
			data.persons.map(
				(scenarist): IOption => ({
					label: scenarist.name,
					value: scenarist.id,
				})
			) || [],
	})

	return { scenarists: queryData.data || [] }
}
