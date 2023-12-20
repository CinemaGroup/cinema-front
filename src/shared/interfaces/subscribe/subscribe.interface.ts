import { EnumSubscribeStatus } from '@/shared/enums/subscribe/subscribe.enum'
import { ITariff } from '../tariff/tariff.interface'

export interface ISubscribe {
	id: number
	status: EnumSubscribeStatus
	tariff: ITariff
	createdAt: string
}
