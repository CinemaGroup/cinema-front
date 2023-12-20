import { IMedia } from '@/shared/interfaces/media/media.interface'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from '../HomeSlider.module.scss'

const HomeSliderItem: FC<{ media: IMedia }> = ({ media }) => {
	return (
		<Link
			href={`/${media.isMovie ? 'movie' : 'series'}/${media.slug}`}
			className={styles.link}
		>
			<Image
				priority
				quality={100}
				draggable={false}
				fill
				src={media.bigPoster}
				alt={media.name}
			/>
		</Link>
	)
}

export default HomeSliderItem
