import { useSlider } from '@/hooks/custom-hooks/slider/useSlider'
import cn from 'classnames'
import { FC } from 'react'
import Icon from '../icon/Icon'
import styles from './Slider.module.scss'
import { ISlider } from './interface/slider.interface'

const Slider: FC<ISlider> = ({ slides, wrapperClassName, slideClassName }) => {
	if (!slides) return null

	const { translate, slideRef } = useSlider(slides.length)

	return (
		<div className={styles.wrapper}>
			<button className={styles.prev}>
				<Icon name="ChevronLeft" />
			</button>
			<ul
				className={cn(
					styles.slider,
					`transform: translateX(${translate})`,
					wrapperClassName && wrapperClassName
				)}
			>
				{slides.map((slide) => (
					<li
						ref={slideRef}
						className={cn(styles.slide, slideClassName && slideClassName)}
					>
						{slide}
					</li>
				))}
			</ul>
			<button className={styles.next}>
				<Icon name="ChevronRight" />
			</button>
		</div>
	)
}

export default Slider
