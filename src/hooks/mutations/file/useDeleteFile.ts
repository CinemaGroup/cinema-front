import { FileService } from '@/services/file/file.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteFile = () => {
	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation({
		mutationKey: ['delete file'],
		mutationFn: (filePath: string) => FileService.deleteFile(filePath),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get files'] })
		},
	})

	return { deleteFile: mutateAsync }
}
