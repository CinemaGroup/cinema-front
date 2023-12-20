import type { Metadata } from 'next'

import NotFoundPage from '@/app/not-found'
import ManageMovieEdit from '@/components/screens/manage/edits/media/movie/ManageMovieEdit'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { IPageIdParam } from '@/shared/interfaces/params/params.interface'

export const metadata: Metadata = {
	title: 'Manage Movie Edit Page',
	...NO_INDEX_PAGE,
}

export default function ManageMovieEditPage({ params }: IPageIdParam) {
	return params.id ? <ManageMovieEdit queryId={params.id} /> : <NotFoundPage />
}
