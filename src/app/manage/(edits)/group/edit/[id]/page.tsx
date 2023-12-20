import type { Metadata } from 'next'

import NotFoundPage from '@/app/not-found'
import ManageGroupEdit from '@/components/screens/manage/edits/affiliations/group/ManageGroupEdit'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { IPageIdParam } from '@/shared/interfaces/params/params.interface'

export const metadata: Metadata = {
	title: 'Manage Group Edit Page',
	...NO_INDEX_PAGE,
}

export default function ManageGroupEditPage({ params }: IPageIdParam) {
	return params.id ? <ManageGroupEdit queryId={params.id} /> : <NotFoundPage />
}
