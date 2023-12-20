import { FileService } from '@/services/file/file.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAddDirectory = () => {
	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation({
		mutationKey: ['add directory'],
		mutationFn: (folder: string) => FileService.addDirectory(folder),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get file directories'] })
		},
	})

	return { addDirectory: mutateAsync }
}
