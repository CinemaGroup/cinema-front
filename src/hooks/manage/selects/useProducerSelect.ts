import { IOption } from '@/components/ui/selects/react-select/interface/react-select.interface'
import { ProducerService } from '@/services/persons/producer/producer.service'
import { useQuery } from '@tanstack/react-query'

export const useProducersSelect = () => {
	const queryData = useQuery({
		queryKey: ['get manage select producers'],
		queryFn: () => ProducerService.getAll(),
		select: ({ data }) =>
			data.persons.map(
				(producer): IOption => ({
					label: producer.name,
					value: producer.id,
				})
			) || [],
	})

	return { producers: queryData.data || [] }
}
