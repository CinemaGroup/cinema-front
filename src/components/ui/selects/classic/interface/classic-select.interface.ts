export interface IClassicSelectItem<K = string>{
	label: string
	key: K
}

export interface IClassicSelect<K = string>{
	data: IClassicSelectItem<K>[]
	onChange: (item: IClassicSelectItem<K>) => void
	value?: IClassicSelectItem<K>
	title?: string
}