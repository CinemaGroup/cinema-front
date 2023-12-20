export interface ISourceItem {
	quality: string
	url: string
}

export interface ISource {
	language: string
	items: ISourceItem[]
}
