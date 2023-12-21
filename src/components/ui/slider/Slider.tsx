'use client'

import { useSlider } from '@/hooks/custom-hooks/slider/useSlider'
import cn from 'classnames'
import { FC } from 'react'
import Icon from '../icon/Icon'
import styles from './Slider.module.scss'
import { ISlider } from './interface/slider.interface'

const Slider: FC<ISlider> = ({
	slides,
	autoplayInterval,
	wrapperClassName,
	listClassName,
	itemClassName,
}) => {
	if (!slides) return null

	const { currentIndex, isBeginning, isEnd, previous, next } = useSlider(
		slides.length,
		autoplayInterval
	)

	return (
		<div className={cn(styles.wrapper, wrapperClassName && wrapperClassName)}>
			{!isBeginning && (
				<button onClick={previous} className={styles.prev}>
					<Icon name="ChevronLeft" />
				</button>
			)}
			<ul
				className={cn(styles.slider, listClassName && listClassName)}
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
			>
				{slides.map((slide) => (
					<li className={cn(styles.slide, itemClassName && itemClassName)}>
						{slide}
					</li>
				))}
			</ul>
			{!isEnd && (
				<button onClick={next} className={styles.next}>
					<Icon name="ChevronRight" />
				</button>
			)}
		</div>
	)
}

export default Slider
