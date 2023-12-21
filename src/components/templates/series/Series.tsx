import Heading from '@/components/ui/heading/Heading'
import { FC } from 'react'
import styles from './Series.module.scss'
import { ISeries } from './interface/movies.interface'
import SeriesItem from './item/SeriesItem'

const Series: FC<ISeries> = ({ title, media }) => {
	return (
		<div className={styles.wrapper}>
			{title && <Heading className={styles.heading}>{title}</Heading>}
			<ul className={styles.series}>
				{media.map((media) => (
					<SeriesItem key={media.id} media={media} />
				))}
			</ul>
		</div>
	)
}

export default Series
