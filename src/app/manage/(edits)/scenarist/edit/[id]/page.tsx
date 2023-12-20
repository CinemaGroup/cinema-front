import NotFoundPage from '@/app/not-found'
import ManageScenaristEdit from '@/components/screens/manage/edits/persons/scenarist/ManageScenaristEdit'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { IPageIdParam } from '@/shared/interfaces/params/params.interface'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Manage Scenarist Edit Page',
	...NO_INDEX_PAGE,
}

export default function ManageScenaristEditPage({ params }: IPageIdParam) {
	return params.id ? (
		<ManageScenaristEdit queryId={params.id} />
	) : (
		<NotFoundPage />
	)
}
