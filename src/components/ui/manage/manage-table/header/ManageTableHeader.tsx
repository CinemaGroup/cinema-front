import cn from 'classnames'
import { FC } from 'react'
import styles from '../ManageTable.module.scss'

const ManageTableHeader: FC<{ items: (string | number)[] }> = ({ items }) => {
	return (
		<div className={cn(styles.item, styles.headerItem)}>
			{items.map((item) => (
				<div className={styles.headerValue} key={item}>
					{item}
				</div>
			))}
			<div className={styles.headerValue}>Actions</div>
		</div>
	)
}

export default ManageTableHeader
