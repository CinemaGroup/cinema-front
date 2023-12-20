export interface ITableItem {
	id: number
	editUrl: string
	data: (string | number)[]
	seasonUrl?: string
	episodeUrl?: string
	isVisible: boolean
}

export interface IManageTableItem {
	item: ITableItem
	removeHandler: () => void
	toggleHandler: () => void
}

export interface IManageTable {
	items: ITableItem[]
	headerItems: string[]
	toggleHandler: (id: string) => void
	removeHandler: (id: string) => void
}
