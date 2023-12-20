'use client'

import Button from '@/components/ui/form-elements/button/Button'
import Heading from '@/components/ui/heading/Heading'
import Container from '@/components/ui/template-elements/container/Container'
import { useManageEpisodeEdit } from '@/hooks/manage/episodes/useManageEpisodeEdit'
import { TypeEpisodeInput } from '@/services/media/episode/types/episode.type'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import styles from './ManageEpisodeEdit.module.scss'
import ManageEpisodeFields from './fields/ManageEpisodeFields'
import ManageEpisodeSourceEdit from './source/ManageEpisodeSourceEdit'

const ManageEpisodeEdit: FC<{ queryId: string }> = ({ queryId }) => {
	const { control, setValue, handleSubmit } = useForm<TypeEpisodeInput>({
		mode: 'onChange',
	})

	const { onSubmit } = useManageEpisodeEdit(queryId, setValue)

	return (
		<div className={styles.wrapper}>
			<Container>
				<Heading>Update Episode</Heading>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<div className={styles.fill}>
						<ManageEpisodeFields
							control={control}
							fieldClassName={styles.field}
							uploadClassName={styles.upload}
							editorClassName={styles.editor}
						/>
						<div className={styles.trailers}>
							<Heading>Trailers</Heading>
							<ManageEpisodeSourceEdit control={control} variant="trailers" />
						</div>
						<div className={styles.videos}>
							<Heading>Videos</Heading>
							<ManageEpisodeSourceEdit control={control} variant="videos" />
						</div>
					</div>
					<Button className={styles.update}>Update</Button>
				</form>
			</Container>
		</div>
	)
}

export default ManageEpisodeEdit
