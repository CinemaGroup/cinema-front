import { FileService } from '@/services/file/file.service'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useState } from 'react'

export const useDragAndDrop = (
	setFile: Dispatch<SetStateAction<File | undefined>>
) => {
	const [dragOver, setDragOver] = useState(false)
	const [fileDropError, setFileDropError] = useState('')
	const [selectedFile, setSelectedFile] = useState<File>()
	const [selectedFolder, setSelectedFolder] = useState<string>('images')
	const [dropped, setDropped] = useState(false)
	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation({
		mutationKey: ['upload file'],
		mutationFn: (data: FormData) => FileService.upload(data, selectedFolder),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get files'] })
			queryClient.invalidateQueries({ queryKey: ['get file directories'] })
			setDropped(false)
			setSelectedFile(undefined)
			setSelectedFolder('images')
		},
		onError: (error) => {
			toastError(error, 'Upload file')
		},
	})

	const onDragOver = (e: React.SyntheticEvent) => {
		e.preventDefault()
		setDragOver(true)
	}

	const onDragLeave = () => setDragOver(false)

	const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()

		setDragOver(false)
		setDropped(true)

		const selectedFile = e?.dataTransfer?.files[0]

		if (selectedFile.type.split('/')[0] !== 'image') {
			return setFileDropError('Please provide an image file to upload!')
		}

		setFile(selectedFile)
	}

	return {
		dropped,
		dragOver,
		selectedFolder,
		selectedFile,
		fileDropError,
		setDropped,
		setDragOver,
		onDragOver,
		onDragLeave,
		onDrop,
		setSelectedFolder,
		mutateAsync,
		setFileDropError,
	}
}
