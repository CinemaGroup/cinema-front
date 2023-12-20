'use client'

import Button from '@/components/ui/form-elements/button/Button'
import Field from '@/components/ui/form-elements/field/Field'
import UploadField from '@/components/ui/form-elements/upload-field/UploadField'
import Container from '@/components/ui/template-elements/container/Container'
import { useManageActorEdit } from '@/hooks/manage/actors/useManageActorEdit'
import { TypePersonInput } from '@/services/persons/types/persons.type'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styles from '../ManagePersons.module.scss'

const ManageActorEdit: FC<{ queryId: string }> = ({ queryId }) => {
	const { control, setValue, handleSubmit } = useForm<TypePersonInput>({
		mode: 'onChange',
	})

	const { onSubmit } = useManageActorEdit(queryId, setValue)

	return (
		<div className={styles.wrapper}>
			<Container>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<div className={styles.fill}>
						<Controller
							name="name"
							defaultValue={''}
							control={control}
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<Field
									className={styles.field}
									onChange={onChange}
									value={value}
									label="Name"
									error={error}
								/>
							)}
							rules={{
								required: 'Name required!',
							}}
						/>
						<Controller
							name="photo"
							control={control}
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									className={styles.file}
									onChange={onChange}
									value={value}
									error={error}
									label="Photo (Not required)"
									variant="photo"
								/>
							)}
						/>
					</div>
					<Button className={styles.submit}>Update</Button>
				</form>
			</Container>
		</div>
	)
}

export default ManageActorEdit
