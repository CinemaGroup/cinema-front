import type { Metadata } from 'next'

import ManageActors from '@/components/screens/manage/pages/persons/actors/ManageActors'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Manage Actors Page',
	...NO_INDEX_PAGE,
}

export default function ManageActorsPage() {
	return <ManageActors />
}
