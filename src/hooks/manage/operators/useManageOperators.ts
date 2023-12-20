import { ITableItem } from '@/components/ui/manage/manage-table/interface/manage-table.interface'
import { getAdminUrl } from '@/config/url.config'
import { OperatorService } from '@/services/persons/operator/operator.service'
import { convertDate } from '@/utils/converts/convert-date'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next13-progressbar'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

export const useManageOperators = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const queryClient = useQueryClient()

	const { push } = useRouter()

	const queryData = useQuery({
		queryKey: ['get manage operators list', searchTerm],
		queryFn: () =>
			OperatorService.getAll({
				searchTerm: searchTerm,
				perPage: 10,
			}),
		select: ({ data }) =>
			data.persons.map(
				(operator): ITableItem => ({
					id: operator.id,
					editUrl: getAdminUrl(`/operator/edit/${operator.id}`),
					data: [
						operator.name,
						operator.slug,
						operator.photo || '',
						convertDate(operator.createdAt),
					],
					isVisible: operator.isVisible,
				})
			),
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create manage operator'],
		mutationFn: () => OperatorService.create(),
		onError: (error) => {
			toastError(error, 'Create operator')
		},
		onSuccess: ({ data: id }) => {
			toastr.success('Create operator', 'Create was successful')
			push(getAdminUrl(`/operator/edit/${id}`))
		},
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete manage operator'],
		mutationFn: (operatorId: string) => OperatorService.delete(operatorId),
		onError: (error) => {
			toastError(error, 'Delete operator')
		},
		onSuccess: async () => {
			toastr.success('Delete operator', 'Delete was successful')
			await queryClient.invalidateQueries({
				queryKey: ['get manage operators list'],
			})
		},
	})

	const { mutateAsync: toggleVisibilityAsync } = useMutation({
		mutationKey: ['update manage operator visibility'],
		mutationFn: (operatorId: string) =>
			OperatorService.toggleVisibility(operatorId),
		onError: (error) => {
			toastError(error, 'Toggle visibility operator')
		},
		onSuccess: async () => {
			toastr.success(
				'Toggle visibility operator',
				'Toggle visibility was successful'
			)
			await queryClient.invalidateQueries({
				queryKey: ['get manage operators list'],
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
