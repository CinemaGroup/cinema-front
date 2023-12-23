import { ReactElement } from 'react'

export interface ISlider {
	slides: ReactElement[] | undefined
	autoplayInterval: number
	wrapperClassName?: string
	listClassName?: string
	itemClassName?: string
}
