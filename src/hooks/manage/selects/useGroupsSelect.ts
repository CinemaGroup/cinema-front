import { IOption } from '@/components/ui/selects/react-select/interface/react-select.interface'
import { GroupService } from '@/services/affiliations/group/group.service'
import { useQuery } from '@tanstack/react-query'

export const useGroupsSelect = () => {
	const queryData = useQuery({
		queryKey: ['get manage select groups'],
		queryFn: () => GroupService.getAll(),
		select: ({ data }) =>
			data.affiliations.map(
				(group): IOption => ({
					label: group.name,
					value: group.id,
				})
			) || [],
	})

	return { groups: queryData.data || [] }
}
