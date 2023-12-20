import { ChangeEvent } from 'react'

export interface IManageHeader {
	onClick?: () => void
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}
