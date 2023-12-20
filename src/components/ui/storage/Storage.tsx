'use client'

import { useDragAndDrop } from '@/hooks/custom-hooks/events/drag-and-drop'
import { useFileDirectories } from '@/hooks/queries/file/useFileDirectories'
import { FC, useState } from 'react'
import Button from '../form-elements/button/Button'
import styles from './Storage.module.scss'
import StorageAddFolder from './add-folder/StorageAddFolder'
import StorageFiles from './files/StorageFiles'
import StorageFolders from './folders/StorageFolders'
import { IStorage } from './interface/storage.interface'
import StorageSelectFolder from './select-folder/StorageSelectFolder'

const Storage: FC<IStorage> = ({ onFileSelect }) => {
	const [isShow, setIsShow] = useState(false)
	const [file, setFile] = useState<File>()
	const { directories } = useFileDirectories()
	const {
		dropped,
		setDropped,
		onDragOver,
		onDragLeave,
		onDrop,
		setSelectedFolder,
		mutateAsync,
	} = useDragAndDrop(setFile)

	return (
		<div className={styles.storage}>
			<div className={styles.bar}>
				<StorageFolders directories={directories} />
				<Button className={styles.addFolder} onClick={() => setIsShow(true)}>
					Add Folder
				</Button>
			</div>
			<StorageFiles
				onFileSelect={onFileSelect}
				onDragLeave={onDragLeave}
				onDragOver={onDragOver}
				onDrop={onDrop}
			/>
			<StorageAddFolder isShow={isShow} setIsShow={setIsShow} />
			<StorageSelectFolder
				file={file}
				isShow={dropped}
				directories={directories}
				setIsShow={setIsShow}
				setSelectedFolder={setSelectedFolder}
				mutateAsync={mutateAsync}
				setDropped={setDropped}
			/>
		</div>
	)
}

export default Storage
