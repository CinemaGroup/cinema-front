import Icon from '@/components/ui/icon/Icon'
import cn from 'classnames'
import Link from 'next/link'
import { FC } from 'react'
import styles from './ManageTableActions.module.scss'
import { IManageActions } from './interface/manage-actions.interface'

const ManageTableActions: FC<IManageActions> = ({
	isVisible,
	editUrl,
	seasonUrl,
	episodeUrl,
	removeHandler,
	toggleHandler,
}) => {
	return (
		<div className={styles.actions}>
			<button onClick={toggleHandler}>
				<div
					className={cn(styles.toggle, {
						[styles.visible]: isVisible,
					})}
				>
					<span className={styles.switch} />
				</div>
			</button>
			{seasonUrl && (
				<Link className={styles.button} href={seasonUrl}>
					<Icon name="Clapperboard" size={20} />
				</Link>
			)}
			{episodeUrl && (
				<Link className={styles.button} href={episodeUrl}>
					<Icon name="FileVideo" size={20} />
				</Link>
			)}
			<Link className={styles.button} href={editUrl}>
				<Icon name="Pencil" size={20} />
			</Link>
			<button className={styles.button} onClick={removeHandler}>
				<Icon name="X" size={22} />
			</button>
		</div>
	)
}

export default ManageTableActions
