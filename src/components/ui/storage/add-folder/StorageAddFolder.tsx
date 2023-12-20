'use client'

import { useAddDirectory } from '@/hooks/mutations/file/useAddDirectory'
import cn from 'classnames'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '../../form-elements/button/Button'
import Field from '../../form-elements/field/Field'
import Icon from '../../icon/Icon'
import { IStorageAddFolder } from '../interface/storage.interface'
import styles from './StorageAddFolder.module.scss'
import { TypeAddDirectoryInput } from './type/add-folder.type'

const StorageAddFolder: FC<IStorageAddFolder> = ({ isShow, setIsShow }) => {
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<TypeAddDirectoryInput>({
		mode: 'onChange',
	})

	const { addDirectory } = useAddDirectory()

	const onSubmit: SubmitHandler<TypeAddDirectoryInput> = async (data) => {
		await addDirectory(data.folder)
		reset()

		setIsShow(false)
	}

	return (
		<div
			className={cn(styles.overlay, {
				[styles.show]: isShow,
			})}
		>
			<div className={styles.directory}>
				<button
					type="button"
					onClick={() => setIsShow(false)}
					className={styles.close}
				>
					<Icon name="X" />
				</button>
				<div className={styles.fill}>
					<h2 className={styles.heading}>Добавить папку</h2>
					<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
						<Field
							{...register('folder', {
								required: 'Название обязательное поле!',
							})}
							error={errors.folder}
							className={styles.field}
							placeholder="Название"
						/>
						<Button className={styles.create}>Создать</Button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default StorageAddFolder
