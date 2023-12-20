import { ITableItem } from '@/components/ui/manage/manage-table/interface/manage-table.interface'
import { getAdminUrl } from '@/config/url.config'
import { ProducerService } from '@/services/persons/producer/producer.service'
import { convertDate } from '@/utils/converts/convert-date'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next13-progressbar'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

export const useManageProducers = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const queryClient = useQueryClient()

	const { push } = useRouter()

	const queryData = useQuery({
		queryKey: ['get manage producers list', searchTerm],
		queryFn: () =>
			ProducerService.getAll({
				searchTerm: searchTerm,
				perPage: 10,
			}),
		select: ({ data }) =>
			data.persons.map(
				(producer): ITableItem => ({
					id: producer.id,
					editUrl: getAdminUrl(`/producer/edit/${producer.id}`),
					data: [
						producer.name,
						producer.slug,
						producer.photo || '',
						convertDate(producer.createdAt),
					],
					isVisible: producer.isVisible,
				})
			),
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create manage producer'],
		mutationFn: () => ProducerService.create(),
		onError: (error) => {
			toastError(error, 'Create producer')
		},
		onSuccess: ({ data: id }) => {
			toastr.success('Create producer', 'Create was successful')
			push(getAdminUrl(`/producer/edit/${id}`))
		},
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete manage producer'],
		mutationFn: (producerId: string) => ProducerService.delete(producerId),
		onError: (error) => {
			toastError(error, 'Delete producer')
		},
		onSuccess: async () => {
			toastr.success('Delete producer', 'Delete was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage producers list'],
			})
		},
	})

	const { mutateAsync: toggleVisibilityAsync } = useMutation({
		mutationKey: ['update manage producer visibility'],
		mutationFn: (producerId: string) =>
			ProducerService.toggleVisibility(producerId),
		onError: (error) => {
			toastError(error, 'Toggle visibility producer')
		},
		onSuccess: async () => {
			toastr.success(
				'Toggle visibility producer',
				'Toggle visibility was successful'
			)
			await queryClient.invalidateQueries({
				queryKey: ['get manage producers list'],
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
