import { instance } from '@/api/api.interceptors'
import { getFilesUrl } from '@/config/api.config'
import { IFile } from '@/shared/interfaces/file/file.interface'
import { TypeFileQueryFilters } from '@/shared/types/file/file.type'

export const FileService = {
	async getAll(queryDto = {} as TypeFileQueryFilters) {
		return instance.get<IFile[]>(getFilesUrl(''), {
			params: queryDto,
		})
	},

	async getDirectories() {
		return instance.get<string[]>(getFilesUrl('/directories'))
	},

	async upload(file: FormData, folder?: string) {
		return instance.post<{ url: string; name: string }[]>(
			getFilesUrl(''),
			file,
			{
				params: { folder },
				headers: { 'Content-Type': 'multipart/form-data' },
			}
		)
	},

	async addDirectory(folder: string) {
		return instance.post<string>(getFilesUrl(`/add-directory`), {
			folder,
		})
	},

	async deleteDirectory(folder: string) {
		return instance.delete<string>(
			getFilesUrl(`/directory/${encodeURIComponent(folder)}`)
		)
	},

	async deleteFile(path: string) {
		return instance.delete<string>(
			getFilesUrl(`/file/${encodeURIComponent(path)}`)
		)
	},
}
