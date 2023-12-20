import type { Metadata } from 'next'

import ManageSeries from '@/components/screens/manage/pages/media/series/ManageSeries'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Manage Series Page',
	...NO_INDEX_PAGE,
}

export default function ManageSeriesPage() {
	return <ManageSeries />
}
