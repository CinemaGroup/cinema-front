import { FC } from 'react'
import styles from './ManageCreateButton.module.scss'

const ManageCreateButton: FC<{ onClick: () => void }> = ({
	onClick,
}) => {
	return (
		<button className={styles.button} onClick={onClick}>
			Create New
		</button>
	)
}

export default ManageCreateButton
