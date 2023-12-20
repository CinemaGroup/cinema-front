import { IOption } from '@/components/ui/selects/react-select/interface/react-select.interface'
import { ActorService } from '@/services/persons/actor/actor.service'
import { useQuery } from '@tanstack/react-query'

export const useActorsSelect = () => {
	const queryData = useQuery({
		queryKey: ['get manage select actors'],
		queryFn: () => ActorService.getAll(),
		select: ({ data }) =>
			data.persons.map(
				(actor): IOption => ({
					label: actor.name,
					value: actor.id,
				})
			) || [],
	})

	return { actors: queryData.data || [] }
}
