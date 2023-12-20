import type { Metadata } from 'next'

import ManageScenarists from '@/components/screens/manage/pages/persons/scenarists/ManageScenarists'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Manage Scenarists Page',
	...NO_INDEX_PAGE,
}

export default function ManageScenaristsPage() {
	return <ManageScenarists />
}
