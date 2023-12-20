import type { Metadata } from 'next'

import NotFoundPage from '@/app/not-found'
import ManageSeasonEdit from '@/components/screens/manage/edits/media/season/ManageSeasonEdit'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { IPageIdParam } from '@/shared/interfaces/params/params.interface'

export const metadata: Metadata = {
	title: 'Manage Season Edit Page',
	...NO_INDEX_PAGE,
}

export default function ManageSeasonEditPage({ params }: IPageIdParam) {
	return params.id ? <ManageSeasonEdit queryId={params.id} /> : <NotFoundPage />
}
