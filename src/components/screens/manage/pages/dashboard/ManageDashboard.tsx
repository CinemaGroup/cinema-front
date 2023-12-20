import ManageNavigation from '@/components/ui/manage/manage-navigation/ManageNavigation'
import Container from '@/components/ui/template-elements/container/Container'
import { FC } from 'react'
import styles from '../ManagePages.module.scss'

const ManageDashboard: FC = () => {
	return (
		<div className={styles.wrapper}>
			<Container>
				<div className={styles.fill}>
					<ManageNavigation />
				</div>
			</Container>
		</div>
	)
}

export default ManageDashboard
