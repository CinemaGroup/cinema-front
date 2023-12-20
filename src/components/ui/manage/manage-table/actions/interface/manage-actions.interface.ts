export interface IManageActions {
	isVisible: boolean
	editUrl: string
	seasonUrl?: string,
	episodeUrl?: string
	toggleHandler: () => void
	removeHandler: () => void
}