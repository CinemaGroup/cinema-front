import Field from '@/components/ui/form-elements/field/Field'
import TextEditor from '@/components/ui/form-elements/text-editor/TextEditor'
import UploadField from '@/components/ui/form-elements/upload-field/UploadField'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { IManageEpisodeFields } from '../interface/manage-episode.interface'

const ManageEpisodeFields: FC<IManageEpisodeFields> = ({
	control,
	fieldClassName,
	editorClassName,
	uploadClassName,
}) => {
	return (
		<>
			<Controller
				name="number"
				defaultValue={0}
				control={control}
				render={({ field: { value, onChange }, fieldState: { error } }) => (
					<Field
						className={fieldClassName}
						onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
						value={value}
						label="Episode Number"
						error={error}
					/>
				)}
				rules={{
					required: 'Number required!',
				}}
			/>
			<Controller
				name="duration"
				defaultValue={0}
				control={control}
				render={({ field: { value, onChange }, fieldState: { error } }) => (
					<Field
						className={fieldClassName}
						onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
						value={value}
						label="Duration"
						error={error}
					/>
				)}
				rules={{
					required: 'Duration required!',
				}}
			/>
			<Controller
				name="releaseDate"
				defaultValue={''}
				control={control}
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<Field
						className={fieldClassName}
						onChange={onChange}
						value={value}
						label="Release Date (Not Required)"
						error={error}
					/>
				)}
			/>
			<Controller
				name="excerpt"
				control={control}
				defaultValue=""
				render={({ field: { value, onChange }, fieldState: { error } }) => (
					<TextEditor
						className={editorClassName}
						onChange={onChange}
						error={error}
						value={value}
						label="Excerpt"
					/>
				)}
				rules={{
					required: 'Excerpt required!',
				}}
			/>
			<Controller
				name="description"
				control={control}
				defaultValue=""
				render={({ field: { value, onChange }, fieldState: { error } }) => (
					<TextEditor
						className={editorClassName}
						onChange={onChange}
						error={error}
						value={value}
						label="Description"
					/>
				)}
				rules={{
					required: 'Description required!',
				}}
			/>
			<Controller
				name="poster"
				control={control}
				defaultValue=""
				render={({ field: { value, onChange }, fieldState: { error } }) => (
					<UploadField
						className={uploadClassName}
						onChange={onChange}
						value={value}
						error={error}
						label="Poster"
						variant="poster"
					/>
				)}
				rules={{
					required: 'Poster required!',
				}}
			/>
			<Controller
				name="bigPoster"
				control={control}
				defaultValue=""
				render={({ field: { value, onChange }, fieldState: { error } }) => (
					<UploadField
						className={uploadClassName}
						onChange={onChange}
						value={value}
						error={error}
						label="Big Poster"
						variant="bigPoster"
					/>
				)}
				rules={{
					required: 'Big Poster required!',
				}}
			/>
		</>
	)
}

export default ManageEpisodeFields
