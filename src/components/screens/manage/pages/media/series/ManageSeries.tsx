'use client'

import Heading from '@/components/ui/heading/Heading'
import ManageHeader from '@/components/ui/manage/manage-header/ManageHeader'
import ManageNavigation from '@/components/ui/manage/manage-navigation/ManageNavigation'
import ManageTable from '@/components/ui/manage/manage-table/ManageTable'
import Container from '@/components/ui/template-elements/container/Container'
import { useManageSeries } from '@/hooks/manage/series/useManageSeries'
import { FC } from 'react'
import styles from '../../ManagePages.module.scss'

const ManageSeries: FC = () => {
	const {
		searchTerm,
		data,
		handleSearch,
		createAsync,
		deleteAsync,
		toggleVisibilityAsync,
	} = useManageSeries()

	return (
		<div className={styles.wrapper}>
			<Container>
				<div className={styles.fill}>
					<ManageNavigation />
					<Heading>Series</Heading>
					<ManageHeader
						searchTerm={searchTerm}
						handleSearch={handleSearch}
						onClick={createAsync}
					/>
					<ManageTable
						toggleHandler={toggleVisibilityAsync}
						removeHandler={deleteAsync}
						headerItems={[
							'Name',
							'Excerpt',
							'Total Likes',
							'Total Views',
							'Created Date',
						]}
						items={data || []}
					/>
				</div>
			</Container>
		</div>
	)
}

export default ManageSeries
