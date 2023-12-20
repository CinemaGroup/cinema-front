import type { ReactElement } from 'react'

export interface ISlider {
	slides: ReactElement[] | undefined
	wrapperClassName?: string
	slideClassName?: string
}
