import { FileService } from '@/services/file/file.service'
import { TypeFileQueryFilters } from '@/shared/types/file/file.type'
import { useQuery } from '@tanstack/react-query'

export const useFiles = (
	queryParams: TypeFileQueryFilters,
	isFilterUpdated: boolean
) => {
	const queryKey = isFilterUpdated ? ['get files', queryParams] : ['get files']

	const { data } = useQuery({
		queryKey,
		queryFn: () => {
			return isFilterUpdated
				? FileService.getAll(queryParams)
				: FileService.getAll()
		},
		select: ({ data }) => data,
	})

	return { files: data }
}
