'use client'

import Icon from '@/components/ui/icon/Icon'
import { IMedia } from '@/shared/interfaces/media/media.interface'
import { convertMinutes } from '@/utils/converts/convert-minutes'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import styles from '../HomeSlider.module.scss'

const HomeSliderItem: FC<{ media: IMedia }> = ({ media }) => {
	const { push } = useRouter()

	return (
		<div
			className={styles.link}
			onClick={() =>
				push(`/${media.isMovie ? 'movie' : 'series'}/${media.slug}`)
			}
		>
			<Image
				priority
				quality={100}
				draggable={false}
				fill
				src={media.bigPoster}
				alt={media.name}
			/>
			<div className={styles.fill}>
				<div className={styles.box}>
					<h2 className={styles.name}>{media.name}</h2>
					<div
						className={styles.excerpt}
						dangerouslySetInnerHTML={{ __html: media.excerpt }}
					/>
					<div className={styles.info}>
						{media.averageRating && (
							<span
								className={cn(styles.rating, {
									[styles.green]: media.averageRating >= 7,
									[styles.yellow]:
										media.averageRating < 7 && media.averageRating >= 4,
									[styles.red]: media.averageRating < 4,
								})}
							>
								{media.averageRating}
							</span>
						)}
						<span className={styles.year}>{media.year}</span>
						<Link
							className={styles.genre}
							href={`/genres/${media.genres[0].slug}`}
						>
							{media.genres[0].name}
						</Link>
						{media.isMovie ? (
							<span className={styles.duration}>
								{convertMinutes(media.movie.duration)}
							</span>
						) : (
							<span className={styles.seasons}>
								{`${media.seasons.length} ${
									media.seasons.length > 1 ? ' Seasons' : ' Season'
								}`}
							</span>
						)}
						<span className={styles.age}>{media.age}+</span>
					</div>
					<div className={styles.buttons}>
						<Link
							href={`/${media.isMovie ? 'movie' : 'series'}/${media.slug}`}
							className={styles.play}
						>
							Play Now
							<Icon name="PlayCircle" />
						</Link>
						{/* <WatchLater text="Watch Later" movieId={movie._id} /> */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default HomeSliderItem
