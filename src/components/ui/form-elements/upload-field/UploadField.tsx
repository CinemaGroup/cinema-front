import cn from 'classnames'
import Image from 'next/image'
import { FC, useState } from 'react'
import Icon from '../../icon/Icon'
import Modal from '../../modal/Modal'
import Storage from '../../storage/Storage'
import styles from './UploadField.module.scss'
import { IUploadField } from './interface/upload-field.interface'

const UploadField: FC<IUploadField> = ({
	label,
	error,
	value,
	className,
	isNoImage = false,
	variant = 'poster',
	onChange,
}) => {
	const [isOpen, setIsOpen] = useState(false)

	const removeFile = () => {
		onChange(null)
	}

	const selectFile = (fileUrl: string) => {
		onChange(fileUrl)
		setIsOpen(false)
	}

	return (
		<div className={cn(styles.upload, className && className)}>
			<div className={styles.uploadWrapper}>
				{error && <p className={styles.error}>{error.message}</p>}
				<div className={styles.uploadFill}>
					{label && <span className={styles.label}>{label}</span>}
					<button
						type="button"
						className={styles.uploadBtn}
						onClick={() => setIsOpen(!isOpen)}
					>
						Upload
					</button>
					{value && (
						<button
							type="button"
							className={styles.remove}
							onClick={removeFile}
						>
							<Icon name="Trash2" />
						</button>
					)}
				</div>
				{!isNoImage && (
					<div
						className={cn(styles.uploadImage, {
							[styles.poster]: variant === 'poster',
							[styles.bigPoster]: variant === 'bigPoster',
							[styles.photo]: variant === 'photo',
							[styles.active]: value,
						})}
					>
						{value && (
							<Image
								quality={100}
								unoptimized
								priority
								draggable={false}
								src={value}
								fill
								alt=""
							/>
						)}
					</div>
				)}
			</div>
			<Modal
				isOpen={isOpen}
				closeModal={() => setIsOpen(false)}
				className={styles.modal}
			>
				<Storage onFileSelect={selectFile} />
			</Modal>
		</div>
	)
}

export default UploadField
