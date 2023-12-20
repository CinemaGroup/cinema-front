import { ITableItem } from '@/components/ui/manage/manage-table/interface/manage-table.interface'
import { getAdminUrl } from '@/config/url.config'
import { ActorService } from '@/services/persons/actor/actor.service'
import { convertDate } from '@/utils/converts/convert-date'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next13-progressbar'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

export const useManageActors = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const queryClient = useQueryClient()

	const { push } = useRouter()

	const queryData = useQuery({
		queryKey: ['get manage actors list', searchTerm],
		queryFn: () =>
			ActorService.getAll({
				searchTerm: searchTerm,
				perPage: 10,
			}),
		select: ({ data }) =>
			data.persons.map(
				(actor): ITableItem => ({
					id: actor.id,
					editUrl: getAdminUrl(`/actor/edit/${actor.id}`),
					data: [
						actor.name,
						actor.slug,
						actor.photo,
						convertDate(actor.createdAt),
					],
					isVisible: actor.isVisible,
				})
			),
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create manage actor'],
		mutationFn: () => ActorService.create(),
		onError: (error) => {
			toastError(error, 'Create actor')
		},
		onSuccess: ({ data: id }) => {
			toastr.success('Create actor', 'Create was successful')
			push(getAdminUrl(`/actor/edit/${id}`))
		},
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete manage actor'],
		mutationFn: (actorId: string) => ActorService.delete(actorId),
		onError: (error) => {
			toastError(error, 'Delete actor')
		},
		onSuccess: async () => {
			toastr.success('Delete actor', 'Delete was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage actors list'],
			})
		},
	})

	const { mutateAsync: toggleVisibilityAsync } = useMutation({
		mutationKey: ['update manage actor visibility'],
		mutationFn: (actorId: string) => ActorService.toggleVisibility(actorId),
		onError: (error) => {
			toastError(error, 'Toggle visibility actor')
		},
		onSuccess: async () => {
			toastr.success(
				'Toggle visibility actor',
				'Toggle visibility was successful'
			)
			await queryClient.invalidateQueries({
				queryKey: ['get manage actors list'],
			})
		},
	})

	return useMemo(
		() => ({
			searchTerm,
			...queryData,
			handleSearch,
			createAsync,
			deleteAsync,
			toggleVisibilityAsync,
		}),
		[queryData, searchTerm, createAsync, deleteAsync, toggleVisibilityAsync]
	)
}
