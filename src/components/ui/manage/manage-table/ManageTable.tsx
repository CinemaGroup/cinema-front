import { FC } from 'react'
import styles from './ManageTable.module.scss'
import ManageTableHeader from './header/ManageTableHeader'
import { IManageTable } from './interface/manage-table.interface'
import ManageTableItem from './item/ManageTableItem'

const ManageTable: FC<IManageTable> = ({
	items,
	headerItems,
	removeHandler,
	toggleHandler,
}) => {
	return (
		<div className={styles.wrapper}>
			<ManageTableHeader items={headerItems} />
			<div className={styles.items}>
				{items.length > 0 ? (
					items.map((item) => (
						<ManageTableItem
							key={item.id}
							toggleHandler={() => toggleHandler(String(item.id))}
							removeHandler={() => removeHandler(String(item.id))}
							item={item}
						/>
					))
				) : (
					<div className={styles.notFound}>Not Found</div>
				)}
			</div>
		</div>
	)
}

export default ManageTable
