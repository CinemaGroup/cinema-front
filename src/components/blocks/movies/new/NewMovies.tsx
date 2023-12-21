'use client'

import Movies from '@/components/templates/movies/Movies'
import { useNewMovies } from '@/hooks/queries/movie/useNewMovies'
import { FC } from 'react'

const NewMovies: FC = () => {
	const { media } = useNewMovies()

	return <Movies title="New Movies" media={media || []} />
}

export default NewMovies
