import type { Metadata } from 'next'

import NotFoundPage from '@/app/not-found'
import ManageSeasons from '@/components/screens/manage/pages/media/seasons/ManageSeasons'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { IPageIdParam } from '@/shared/interfaces/params/params.interface'

export const metadata: Metadata = {
	title: 'Manage Seasons Page',
	...NO_INDEX_PAGE,
}

export default function ManageSeasonsPage({ params }: IPageIdParam) {
	return params.id ? <ManageSeasons queryId={params.id} /> : <NotFoundPage />
}
