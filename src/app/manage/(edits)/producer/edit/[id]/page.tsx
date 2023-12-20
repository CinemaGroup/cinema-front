import NotFoundPage from '@/app/not-found'
import ManageProducerEdit from '@/components/screens/manage/edits/persons/producer/ManageProducerEdit'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { IPageIdParam } from '@/shared/interfaces/params/params.interface'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Manage Producer Edit Page',
	...NO_INDEX_PAGE,
}

export default function ManageProducerEditPage({ params }: IPageIdParam) {
	return params.id ? (
		<ManageProducerEdit queryId={params.id} />
	) : (
		<NotFoundPage />
	)
}
