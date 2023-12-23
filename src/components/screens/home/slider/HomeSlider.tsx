'use client'

import Slider from '@/components/ui/slider/Slider'
import { useRatedMedia } from '@/hooks/queries/media/useRatedMedia'
import { FC } from 'react'
import styles from './HomeSlider.module.scss'
import HomeSliderItem from './item/HomeSliderItem'

const HomeSlider: FC = () => {
	const { media } = useRatedMedia()

	return (
		<Slider
			slides={media?.map((media) => (
				<HomeSliderItem key={media.id} media={media} />
			))}
			autoplayInterval={5000}
			wrapperClassName={styles.slider}
			itemClassName={styles.slide}
		/>
	)
}

export default HomeSlider
