import { FileService } from '@/services/file/file.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteFolder = () => {
	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation({
		mutationKey: ['delete folder'],
		mutationFn: (folder: string) => FileService.deleteDirectory(folder),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get file directories'] })
			queryClient.invalidateQueries({ queryKey: ['get files'] })
		},
	})

	return { deleteFolder: mutateAsync }
}
