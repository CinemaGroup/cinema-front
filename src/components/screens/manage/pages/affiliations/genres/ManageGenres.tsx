'use client'

import Heading from '@/components/ui/heading/Heading'
import ManageHeader from '@/components/ui/manage/manage-header/ManageHeader'
import ManageNavigation from '@/components/ui/manage/manage-navigation/ManageNavigation'
import ManageTable from '@/components/ui/manage/manage-table/ManageTable'
import Container from '@/components/ui/template-elements/container/Container'
import { useManageGenres } from '@/hooks/manage/genres/useManageGenres'
import { FC } from 'react'
import styles from '../../ManagePages.module.scss'

const ManageGenres: FC = () => {
	const {
		searchTerm,
		data,
		handleSearch,
		createAsync,
		deleteAsync,
		toggleVisibilityAsync,
	} = useManageGenres()

	return (
		<div className={styles.wrapper}>
			<Container>
				<div className={styles.fill}>
					<ManageNavigation />
					<Heading>Genres</Heading>
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
							'Slug',
							'Icon',
							'Description',
							'Created Date',
						]}
						items={data || []}
					/>
				</div>
			</Container>
		</div>
	)
}

export default ManageGenres
