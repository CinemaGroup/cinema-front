'use client'

import Heading from '@/components/ui/heading/Heading'
import ManageHeader from '@/components/ui/manage/manage-header/ManageHeader'
import ManageNavigation from '@/components/ui/manage/manage-navigation/ManageNavigation'
import ManageTable from '@/components/ui/manage/manage-table/ManageTable'
import Container from '@/components/ui/template-elements/container/Container'
import { useManageProducers } from '@/hooks/manage/producers/useManageProducers'
import { FC } from 'react'
import styles from '../../ManagePages.module.scss'

const ManageProducers: FC = () => {
	const {
		searchTerm,
		data,
		handleSearch,
		createAsync,
		deleteAsync,
		toggleVisibilityAsync,
	} = useManageProducers()

	return (
		<div className={styles.wrapper}>
			<Container>
				<div className={styles.fill}>
					<ManageNavigation />
					<Heading>Producers</Heading>
					<ManageHeader
						searchTerm={searchTerm}
						handleSearch={handleSearch}
						onClick={createAsync}
					/>
					<ManageTable
						toggleHandler={toggleVisibilityAsync}
						removeHandler={deleteAsync}
						headerItems={['Name', 'Slug', 'Photo', 'Created Date']}
						items={data || []}
					/>
				</div>
			</Container>
		</div>
	)
}

export default ManageProducers
