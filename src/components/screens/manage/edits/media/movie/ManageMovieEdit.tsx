'use client'

import Button from '@/components/ui/form-elements/button/Button'
import Heading from '@/components/ui/heading/Heading'
import Container from '@/components/ui/template-elements/container/Container'
import { useManageMovieEdit } from '@/hooks/manage/movies/useManageMovieEdit'
import { TypeMediaMovieInput } from '@/services/media/types/media.type'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import styles from './ManageMovieEdit.module.scss'
import ManageMovieFields from './fields/ManageMovieFields'
import ManageMovieSelects from './selects/ManageMovieSelects'
import ManageMovieSourceEdit from './source/ManageMovieSourceEdit'

const ManageMovieEdit: FC<{ queryId: string }> = ({ queryId }) => {
	const { control, setValue, handleSubmit } = useForm<TypeMediaMovieInput>({
		mode: 'onChange',
	})

	const { onSubmit } = useManageMovieEdit(queryId, setValue)

	return (
		<div className={styles.wrapper}>
			<Container>
				<Heading>Update Movie</Heading>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<div className={styles.fill}>
						<ManageMovieFields
							control={control}
							mediaFieldClassName={styles.mediaField}
							movieFieldClassName={styles.movieField}
							editorClassName={styles.editor}
							uploadClassName={styles.upload}
						/>
						<ManageMovieSelects
							control={control}
							selectClassName={styles.select}
						/>
						<div className={styles.trailers}>
							<Heading>Trailers</Heading>
							<ManageMovieSourceEdit control={control} variant="trailers" />
						</div>
						<div className={styles.videos}>
							<Heading>Videos</Heading>
							<ManageMovieSourceEdit control={control} variant="videos" />
						</div>
					</div>
					<Button className={styles.update}>Update</Button>
				</form>
			</Container>
		</div>
	)
}

export default ManageMovieEdit
