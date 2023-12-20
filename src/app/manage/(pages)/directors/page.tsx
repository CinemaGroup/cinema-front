import type { Metadata } from 'next'

import ManageDirectors from '@/components/screens/manage/pages/persons/directors/ManageDirectors'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Manage Directors Page',
	...NO_INDEX_PAGE,
}

export default function ManageDirectorsPage() {
	return <ManageDirectors />
}
