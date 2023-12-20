import type { Metadata } from 'next'

import NotFoundPage from '@/app/not-found'
import ManageActorEdit from '@/components/screens/manage/edits/persons/actor/ManageActorEdit'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { IPageIdParam } from '@/shared/interfaces/params/params.interface'

export const metadata: Metadata = {
	title: 'Manage Actor Edit Page',
	...NO_INDEX_PAGE,
}

export default function ManageActorEditPage({ params }: IPageIdParam) {
	return params.id ? <ManageActorEdit queryId={params.id} /> : <NotFoundPage />
}
