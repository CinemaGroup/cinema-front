import Heading from '@/components/ui/heading/Heading'
import { FC } from 'react'
import styles from './Medias.module.scss'
import { IMedias } from './interface/media.interface'
import MediasItem from './item/MediasItem'

const Media: FC<IMedias> = ({ title, media }) => {
	return (
		<div className={styles.wrapper}>
			{title && <Heading className={styles.heading}>{title}</Heading>}
			<ul className={styles.medias}>
				{media.map((media) => (
					<MediasItem key={media.id} media={media} />
				))}
			</ul>
		</div>
	)
}

export default Media
