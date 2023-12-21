'use client'

import Series from '@/components/templates/series/Series'
import { useNewSeries } from '@/hooks/queries/series/useNewSeries'
import { FC } from 'react'

const NewSeries: FC = () => {
	const { media } = useNewSeries()

	return <Series title="New Series" media={media || []} />
}

export default NewSeries
