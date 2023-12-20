'use client'

import Button from '@/components/ui/form-elements/button/Button'
import Field from '@/components/ui/form-elements/field/Field'
import TextEditor from '@/components/ui/form-elements/text-editor/TextEditor'
import Container from '@/components/ui/template-elements/container/Container'
import { useManageGroupEdit } from '@/hooks/manage/groups/useManageGroupEdit'
import { TypeAffiliationInput } from '@/services/affiliations/types/affiliation.type'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styles from '../ManageAffiliation.module.scss'

const ManageGroupEdit: FC<{ queryId: string }> = ({ queryId }) => {
	const { control, setValue, handleSubmit } = useForm<TypeAffiliationInput>({
		mode: 'onChange',
	})

	const { onSubmit } = useManageGroupEdit(queryId, setValue)

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
							name="icon"
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
									label="Icon"
									error={error}
								/>
							)}
						/>
						<Controller
							name="description"
							control={control}
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<TextEditor
									className={styles.editor}
									onChange={onChange}
									error={error}
									value={value}
									label="Description"
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

export default ManageGroupEdit
