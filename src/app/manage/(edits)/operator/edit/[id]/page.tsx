import NotFoundPage from '@/app/not-found'
import ManageOperatorEdit from '@/components/screens/manage/edits/persons/operator/ManageOperatorEdit'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { IPageIdParam } from '@/shared/interfaces/params/params.interface'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Manage Operator Edit Page',
	...NO_INDEX_PAGE,
}

export default function ManageOperatorEditPage({ params }: IPageIdParam) {
	return params.id ? (
		<ManageOperatorEdit queryId={params.id} />
	) : (
		<NotFoundPage />
	)
}
