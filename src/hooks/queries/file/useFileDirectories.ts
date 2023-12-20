import { FileService } from '@/services/file/file.service'
import { useQuery } from '@tanstack/react-query'

export const useFileDirectories = () => {
	const { data } = useQuery({
		queryKey: ['get file directories'],
		queryFn: () => FileService.getDirectories(),
		select: ({ data }) => data,
	})

	return { directories: data || [] }
}
