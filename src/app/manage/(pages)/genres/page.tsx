import type { Metadata } from 'next'

import ManageGenres from '@/components/screens/manage/pages/affiliations/genres/ManageGenres'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Manage Genres Page',
	...NO_INDEX_PAGE,
}

export default function ManageGenresPage() {
	return <ManageGenres />
}
