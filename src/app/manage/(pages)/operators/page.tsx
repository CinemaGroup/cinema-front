import type { Metadata } from 'next'

import ManageOperators from '@/components/screens/manage/pages/persons/operators/ManageOperators'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Manage Operators Page',
	...NO_INDEX_PAGE,
}

export default function ManageOperatorsPage() {
	return <ManageOperators />
}
