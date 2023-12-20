import { IOption } from '@/components/ui/selects/react-select/interface/react-select.interface'
import { PromocodeService } from '@/services/promocode/promocode.service'
import { useQuery } from '@tanstack/react-query'

export const usePromocodesSelect = () => {
	const { data } = useQuery({
		queryKey: ['get all promocodes'],
		queryFn: () => PromocodeService.getAll(),
		select: ({ data }) =>
			data.promocodes.map(
				(promocode): IOption => ({
					label: `${promocode.code} | ${promocode.sale}`,
					value: promocode.id,
				})
			),
	})

	return { promocodes: data }
}
