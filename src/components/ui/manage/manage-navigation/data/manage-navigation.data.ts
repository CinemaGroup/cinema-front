import { getAdminHomeUrl, getAdminUrl } from '@/config/url.config'
import { IManageNavItem } from '../interface/manage-navigation.interface'

export const manageNavItems: IManageNavItem[] = [
	{
		title: 'Dashboard',
		link: getAdminHomeUrl(),
	},
	{
		title: 'Users',
		link: getAdminUrl('/users'),
	},
	{
		title: 'Groups',
		link: getAdminUrl('/groups'),
	},
	{
		title: 'Genres',
		link: getAdminUrl('/genres'),
	},
	{
		title: 'Actors',
		link: getAdminUrl('/actors'),
	},
	{
		title: 'Directors',
		link: getAdminUrl('/directors'),
	},
	{
		title: 'Producers',
		link: getAdminUrl('/producers'),
	},
	{
		title: 'Scenarists',
		link: getAdminUrl('/scenarists'),
	},
	{
		title: 'Operators',
		link: getAdminUrl('/operators'),
	},
	{
		title: 'Movies',
		link: getAdminUrl('/movies'),
	},
	{
		title: 'Series',
		link: getAdminUrl('/series'),
	},
]
