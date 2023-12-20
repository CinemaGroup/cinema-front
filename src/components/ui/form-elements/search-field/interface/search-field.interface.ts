import { ChangeEvent } from 'react'

export interface ISearchField {
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
	variant?: 'custom' | 'default'
	className?: string
}
