import cn from 'classnames'
import { FC } from 'react'
import Icon from '../../icon/Icon'
import { IStorageSelectFolder } from '../interface/storage.interface'
import styles from './StorageSelectFolder.module.scss'

const StorageSelectFolder: FC<IStorageSelectFolder> = ({
	file,
	isShow,
	directories,
	setDropped,
	setIsShow,
	setSelectedFolder,
	mutateAsync,
}) => {
	return (
		<div
			className={cn(styles.overlay, {
				[styles.show]: isShow,
			})}
		>
			<div className={styles.select}>
				<button
					type="button"
					onClick={() => {
						setIsShow(false)
						setDropped(false)
					}}
					className={styles.close}
				>
					<Icon name="X" />
				</button>
				<div className={styles.fill}>
					<h2 className={styles.heading}>Pick Folder</h2>
					<ul className={styles.folders}>
						{directories?.map((directory, index) => (
							<li key={index} className={styles.folder}>
								<button
									className={styles.button}
									type="button"
									onClick={() => {
										setSelectedFolder(directory)
										setIsShow(false)
										if (file) {
											const formData = new FormData()
											formData.append('file', file)
											mutateAsync(formData)
										}
									}}
								>
									<Icon name="Folder" size={22} />
									{directory}
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default StorageSelectFolder
