'use client'

import { useDeleteFile } from '@/hooks/mutations/file/useDeleteFile'
import { useFiles } from '@/hooks/queries/file/useFiles'
import { useFilesFilters } from '@/hooks/redux/filters/files/useFilesFilters'
import Image from 'next/image'
import { FC } from 'react'
import Icon from '../../icon/Icon'
import styles from './StorageFiles.module.scss'
import { IStorageFiles } from '../interface/storage.interface'

const StorageFiles: FC<IStorageFiles> = ({
	onFileSelect,
	onDragLeave,
	onDragOver,
	onDrop,
}) => {
	const { isFilterUpdated, queryParams } = useFilesFilters()
	const { deleteFile } = useDeleteFile()
	const { files } = useFiles(queryParams, isFilterUpdated)

	return (
		<div
			className={styles.wrapper}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
			onDrop={(e) => {
				onDrop(e)
			}}
		>
			<ul className={styles.files}>
				{files?.map((file, index) => (
					<li key={index} className={styles.file}>
						<button
							className={styles.button}
							onClick={() => onFileSelect(file.url)}
						>
							<div className={styles.preview}>
								<Image
									priority
									draggable={false}
									fill
									src={file.url}
									alt={file.name}
								/>
							</div>
							<span className={styles.name}>{file.name}</span>
						</button>
						<button
							className={styles.remove}
							onClick={() => deleteFile(file.url)}
						>
							<Icon name="Trash2" />
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default StorageFiles
