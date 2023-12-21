'use client'

import Media from '@/components/templates/medias/Medias'
import { useNewMedia } from '@/hooks/queries/media/useNewMedia'
import { FC } from 'react'

const NewMedia: FC = () => {
	const { media } = useNewMedia()

	return <Media title="New Media" media={media || []} />
}

export default NewMedia
