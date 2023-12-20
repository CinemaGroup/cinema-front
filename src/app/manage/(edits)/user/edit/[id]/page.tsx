import type { Metadata } from 'next'

import NotFoundPage from '@/app/not-found'
import ManageUserEdit from '@/components/screens/manage/edits/user/ManageUserEdit'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { IPageIdParam } from '@/shared/interfaces/params/params.interface'

export const metadata: Metadata = {
	title: 'Manage User Edit Page',
	...NO_INDEX_PAGE,
}

export default function ManageUserEditPage({ params }: IPageIdParam) {
	return params.id ? <ManageUserEdit queryId={params.id} /> : <NotFoundPage />
}
