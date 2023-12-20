import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { Dispatch, SetStateAction, SyntheticEvent } from 'react'

export interface IStorage {
	onFileSelect: (fileUrl: string) => void
}

export interface IStorageFolders {
	directories: string[]
}

export interface IStorageFiles {
	onFileSelect: (fileUrl: string) => void
	onDragOver: (e: SyntheticEvent<Element, Event>) => void
	onDragLeave: () => void
	onDrop: (e: React.DragEvent<HTMLDivElement>) => void
}

export interface IStorageAddFolder {
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
}

export interface IStorageSelectFolder {
	file: File | undefined
	isShow: boolean
	directories: string[] | undefined
	setIsShow: Dispatch<SetStateAction<boolean>>
	setSelectedFolder: Dispatch<SetStateAction<string>>
	setDropped: Dispatch<SetStateAction<boolean>>
	mutateAsync: UseMutateAsyncFunction<
		AxiosResponse<{ url: string; name: string }[], any>,
		Error,
		FormData,
		unknown
	>
}
