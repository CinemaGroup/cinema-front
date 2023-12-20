import type { Metadata } from 'next'

import ManageProducers from '@/components/screens/manage/pages/persons/producers/ManageProducers'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Manage Producers Page',
	...NO_INDEX_PAGE,
}

export default function ManageProducersPage() {
	return <ManageProducers />
}
