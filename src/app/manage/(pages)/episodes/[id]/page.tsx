import type { Metadata } from 'next'

import NotFoundPage from '@/app/not-found'
import ManageEpisodes from '@/components/screens/manage/pages/media/episodes/ManageEpisodes'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { IPageIdParam } from '@/shared/interfaces/params/params.interface'

export const metadata: Metadata = {
	title: 'Manage Episodes Page',
	...NO_INDEX_PAGE,
}

export default function ManageEpisodesPage({ params }: IPageIdParam) {
	return params.id ? <ManageEpisodes queryId={params.id} /> : <NotFoundPage />
}
