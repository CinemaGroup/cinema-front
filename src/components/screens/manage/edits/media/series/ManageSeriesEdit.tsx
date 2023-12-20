'use client'

import Button from '@/components/ui/form-elements/button/Button'
import Heading from '@/components/ui/heading/Heading'
import Container from '@/components/ui/template-elements/container/Container'
import { useManageSeriesEdit } from '@/hooks/manage/series/useManageSeriesEdit'
import { TypeMediaInput } from '@/services/media/types/media.type'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import styles from './ManageSeriesEdit.module.scss'
import ManageSeriesFields from './fields/ManageSeriesFields'
import ManageSeriesSelects from './selects/ManageSeriesSelects'

const ManageSeriesEdit: FC<{ queryId: string }> = ({ queryId }) => {
	const { control, setValue, handleSubmit } = useForm<TypeMediaInput>({
		mode: 'onChange',
	})

	const { onSubmit } = useManageSeriesEdit(queryId, setValue)

	return (
		<div className={styles.wrapper}>
			<Container>
				<Heading>Update Series</Heading>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<div className={styles.fill}>
						<ManageSeriesFields
							control={control}
							fieldClassName={styles.field}
							editorClassName={styles.editor}
							uploadClassName={styles.upload}
						/>
						<ManageSeriesSelects
							control={control}
							selectClassName={styles.select}
						/>
					</div>
					<Button className={styles.update}>Update</Button>
				</form>
			</Container>
		</div>
	)
}

export default ManageSeriesEdit
