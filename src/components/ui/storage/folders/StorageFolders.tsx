'use client'

import { useDeleteFolder } from '@/hooks/mutations/file/useDeleteFolder'
import { useFilesFilters } from '@/hooks/redux/filters/files/useFilesFilters'
import cn from 'classnames'
import { FC } from 'react'
import Icon from '../../icon/Icon'
import { IStorageFolders } from '../interface/storage.interface'
import styles from './StorageFolders.module.scss'

const StorageFolders: FC<IStorageFolders> = ({ directories }) => {
	const { deleteFolder } = useDeleteFolder()
	const { queryParams, updateQueryParams, removeQueryParam } = useFilesFilters()

	return (
		<ul className={styles.folders}>
			<li className={styles.folder}>
				<button
					className={cn(styles.button, {
						[styles.active]: queryParams.folder === '',
					})}
					onClick={() => removeQueryParam('folder')}
				>
					<Icon name="Folder" size={22} />
					All Files
				</button>
			</li>
			{directories?.map((directory, index) => (
				<li key={index} className={styles.folder}>
					<button
						className={cn(styles.button, {
							[styles.active]: queryParams.folder === directory,
						})}
						onClick={() => updateQueryParams('folder', directory)}
					>
						<Icon name="Folder" size={22} />
						{directory}
					</button>
					<button
						className={styles.remove}
						onClick={() => deleteFolder(directory)}
					>
						<Icon name="Trash2" size={22} />
					</button>
				</li>
			))}
		</ul>
	)
}

export default StorageFolders
