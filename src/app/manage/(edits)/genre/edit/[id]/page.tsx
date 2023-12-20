import type { Metadata } from 'next'

import NotFoundPage from '@/app/not-found'
import ManageGenreEdit from '@/components/screens/manage/edits/affiliations/genre/ManageGenreEdit'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { IPageIdParam } from '@/shared/interfaces/params/params.interface'

export const metadata: Metadata = {
	title: 'Manage Genre Edit Page',
	...NO_INDEX_PAGE,
}

export default function ManageGenreEditPage({ params }: IPageIdParam) {
	return params.id ? <ManageGenreEdit queryId={params.id} /> : <NotFoundPage />
}
