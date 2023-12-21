import { ReactElement } from 'react'

export interface ISlider {
	slides: ReactElement[]
	autoplayInterval: number
	wrapperClassName?: string
	listClassName?: string
	itemClassName?: string
}
