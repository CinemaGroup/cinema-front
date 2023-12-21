'use client'

import { IMedia } from '@/shared/interfaces/media/media.interface'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from '../Movies.module.scss'

const MoviesItem: FC<{ media: IMedia }> = ({ media }) => {
	return (
		<li className={styles.movie}>
			<Link href={`/movies/${media.slug}`}>
				<Image
					quality={100}
					priority
					draggable={false}
					fill
					src={media.poster}
					alt={media.name}
				/>
			</Link>
		</li>
	)
}

export default MoviesItem
