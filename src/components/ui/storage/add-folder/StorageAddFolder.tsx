'use client'

import { useAddDirectory } from '@/hooks/mutations/file/useAddDirectory'
import cn from 'classnames'
import { FC, useState } from 'react'
import { FieldError } from 'react-hook-form'
import Button from '../../form-elements/button/Button'
import Field from '../../form-elements/field/Field'
import Icon from '../../icon/Icon'
import { IStorageAddFolder } from '../interface/storage.interface'
import styles from './StorageAddFolder.module.scss'

const StorageAddFolder: FC<IStorageAddFolder> = ({ isShow, setIsShow }) => {
	const [folder, setFolder] = useState<string>('')
	const [error, setError] = useState<FieldError | undefined>(undefined)

	const { addDirectory } = useAddDirectory()

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFolder(event.target.value)
		setError(undefined)
	}

	const onSubmit = async () => {
		if (!folder.trim()) {
			setError({
				type: 'required',
				message: 'Название обязательное поле!',
			})
			return
		}

		await addDirectory(folder)
		setFolder('')
		setError(undefined)
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
					<div className={styles.form}>
						<Field
							value={folder}
							onChange={handleInputChange}
							error={error}
							className={styles.field}
							placeholder="Название"
						/>
						<Button className={styles.create} onClick={onSubmit}>
							Создать
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default StorageAddFolder
