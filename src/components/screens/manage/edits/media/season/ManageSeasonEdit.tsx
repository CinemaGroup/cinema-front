'use client'

import Button from '@/components/ui/form-elements/button/Button'
import Field from '@/components/ui/form-elements/field/Field'
import Heading from '@/components/ui/heading/Heading'
import Container from '@/components/ui/template-elements/container/Container'
import { useManageSeasonEdit } from '@/hooks/manage/seasons/useManageSeasonEdit'
import { TypeSeasonInput } from '@/services/media/season/types/season.type'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styles from './ManageSeasonEdit.module.scss'

const ManageSeasonEdit: FC<{ queryId: string }> = ({ queryId }) => {
	const { control, setValue, handleSubmit } = useForm<TypeSeasonInput>({
		mode: 'onChange',
	})

	const { onSubmit } = useManageSeasonEdit(queryId, setValue)

	return (
		<div className={styles.wrapper}>
			<Container>
				<Heading>Update Season</Heading>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<div className={styles.fill}>
						<Controller
							name="number"
							control={control}
							render={({
								field: { onChange, value },
								fieldState: { error },
							}) => (
								<Field
									className={styles.field}
									onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
									value={value}
									label="Season Number"
									error={error}
								/>
							)}
							rules={{
								required: 'Number required!',
							}}
						/>
					</div>
					<Button className={styles.update}>Update</Button>
				</form>
			</Container>
		</div>
	)
}

export default ManageSeasonEdit
