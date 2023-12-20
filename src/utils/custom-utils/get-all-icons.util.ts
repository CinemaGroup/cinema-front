import { IOption } from '@/components/ui/selects/react-select/interface/react-select.interface'
import * as icons from 'lucide-react'

export const getAllIcons = (): IOption[] => {
	return Object.entries(icons).map(([label, value]) => ({
		label,
		value: String(value),
	}))
}
