import type { Metadata } from 'next'

import ManageUsers from '@/components/screens/manage/pages/users/ManageUsers'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Manage Users Page',
	...NO_INDEX_PAGE,
}

export default function ManageUsersPage() {
	return <ManageUsers />
}
