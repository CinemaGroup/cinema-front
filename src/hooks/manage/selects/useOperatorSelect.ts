import { IOption } from '@/components/ui/selects/react-select/interface/react-select.interface'
import { OperatorService } from '@/services/persons/operator/operator.service'
import { useQuery } from '@tanstack/react-query'

export const useOperatorsSelect = () => {
	const queryData = useQuery({
		queryKey: ['get manage select operators'],
		queryFn: () => OperatorService.getAll(),
		select: ({ data }) =>
			data.persons.map(
				(operator): IOption => ({
					label: operator.name,
					value: operator.id,
				})
			) || [],
	})

	return { operators: queryData.data || [] }
}
