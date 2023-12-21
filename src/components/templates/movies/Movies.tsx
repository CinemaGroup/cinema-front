import Heading from '@/components/ui/heading/Heading'
import { FC } from 'react'
import { IMovies } from './interface/movies.interface'
import MoviesItem from './item/MoviesItem'
import styles from './Movies.module.scss'

const Movies: FC<IMovies> = ({ title, media }) => {
	return (
		<div className={styles.wrapper}>
			{title && <Heading className={styles.heading}>{title}</Heading>}
			<ul className={styles.movies}>
				{media.map((media) => (
					<MoviesItem key={media.id} media={media} />
				))}
			</ul>
		</div>
	)
}

export default Movies
