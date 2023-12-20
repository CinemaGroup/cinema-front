import NotFoundPage from '@/app/not-found'
import ManageDirectorEdit from '@/components/screens/manage/edits/persons/director/ManageDirectorEdit'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { IPageIdParam } from '@/shared/interfaces/params/params.interface'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Manage Director Edit Page',
	...NO_INDEX_PAGE,
}

export default function ManageDirectorEditPage({ params }: IPageIdParam) {
	return params.id ? (
		<ManageDirectorEdit queryId={params.id} />
	) : (
		<NotFoundPage />
	)
}
