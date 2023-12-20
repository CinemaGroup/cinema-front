import type { Metadata } from 'next'

import NotFoundPage from '@/app/not-found'
import ManageSeriesEdit from '@/components/screens/manage/edits/media/series/ManageSeriesEdit'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { IPageIdParam } from '@/shared/interfaces/params/params.interface'

export const metadata: Metadata = {
	title: 'Manage Series Edit Page',
	...NO_INDEX_PAGE,
}

export default function ManageSeriesEditPage({ params }: IPageIdParam) {
	return params.id ? <ManageSeriesEdit queryId={params.id} /> : <NotFoundPage />
}
