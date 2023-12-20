import type { Metadata } from 'next'

import NotFoundPage from '@/app/not-found'
import ManageEpisodeEdit from '@/components/screens/manage/edits/media/episode/ManageEpisodeEdit'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { IPageIdParam } from '@/shared/interfaces/params/params.interface'

export const metadata: Metadata = {
	title: 'Manage Episode Edit Page',
	...NO_INDEX_PAGE,
}

export default function ManageEpisodeEditPage({ params }: IPageIdParam) {
	return params.id ? (
		<ManageEpisodeEdit queryId={params.id} />
	) : (
		<NotFoundPage />
	)
}
