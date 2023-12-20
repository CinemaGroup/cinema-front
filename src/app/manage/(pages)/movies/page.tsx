import type { Metadata } from 'next'

import ManageMovies from '@/components/screens/manage/pages/media/movies/ManageMovies'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Manage Movies Page',
	...NO_INDEX_PAGE,
}

export default function ManageMoviesPage() {
	return <ManageMovies />
}
