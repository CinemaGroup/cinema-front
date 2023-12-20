'use client'

import Button from '@/components/ui/form-elements/button/Button'
import Field from '@/components/ui/form-elements/field/Field'
import UploadField from '@/components/ui/form-elements/upload-field/UploadField'
import ReactSelect from '@/components/ui/selects/react-select/ReactSelect'
import Container from '@/components/ui/template-elements/container/Container'
import { usePromocodesSelect } from '@/hooks/manage/selects/usePromocodesSelect'
import { useManageUserEdit } from '@/hooks/manage/users/useManageUserEdit'
import { TypeUserInput } from '@/services/user/types/user.type'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styles from './ManageUserEdit.module.scss'

const ManageUserEdit: FC<{ queryId: string }> = ({ queryId }) => {
	const { promocodes } = usePromocodesSelect()

	const { control, setValue, handleSubmit } = useForm<TypeUserInput>({
		mode: 'onChange',
	})

	const { onSubmit } = useManageUserEdit(queryId, setValue)

	return (
		<div className={styles.wrapper}>
			<Container>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<div className={styles.fill}>
						<Controller
							name="login"
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
									label="Login"
									error={error}
								/>
							)}
							rules={{
								required: 'Login required!',
							}}
						/>
						<Controller
							name="email"
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
									label="E-mail"
									error={error}
								/>
							)}
							rules={{
								required: 'E-mail required!',
							}}
						/>
						<Controller
							name="newPassword"
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
									label="New Password (Not required)"
									error={error}
								/>
							)}
						/>
						<Controller
							name={`promocodes`}
							control={control}
							render={({ field, fieldState: { error } }) => (
								<ReactSelect
									field={field}
									options={promocodes || []}
									label="Promocodes (Not required)"
									error={error}
									className={styles.select}
								/>
							)}
						/>
						<Controller
							name="avatarPath"
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
									label="Avatar (Not required)"
									variant="photo"
								/>
							)}
						/>
						<Controller
							control={control}
							name="isAdmin"
							render={({ field: { onChange, value } }) => (
								<Button
									type="button"
									onClick={() => {
										onChange(!value)
									}}
									className={styles.toggle}
								>
									{value ? 'Make it user' : 'Make it admin'}
								</Button>
							)}
						/>
						<Controller
							control={control}
							name="isSubscribed"
							render={({ field: { onChange, value } }) => (
								<Button
									type="button"
									onClick={() => {
										onChange(!value)
									}}
									className={styles.toggle}
								>
									{value ? 'Make it not subscribed' : 'Make it subscribed'}
								</Button>
							)}
						/>
					</div>
					<Button className={styles.submit}>Update</Button>
				</form>
			</Container>
		</div>
	)
}

export default ManageUserEdit
