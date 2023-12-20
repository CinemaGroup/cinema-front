import type { Metadata } from 'next'

import ManageDashboard from '@/components/screens/manage/pages/dashboard/ManageDashboard'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Manage Dashboard',
	...NO_INDEX_PAGE,
}

export default function ManageDashboardPage() {
	return <ManageDashboard />
}
