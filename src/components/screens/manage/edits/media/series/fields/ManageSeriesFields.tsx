import Field from '@/components/ui/form-elements/field/Field'
import TextEditor from '@/components/ui/form-elements/text-editor/TextEditor'
import UploadField from '@/components/ui/form-elements/upload-field/UploadField'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { IManageSeriesFields } from '../interface/series-selects.interface'

const ManageSeriesFields: FC<IManageSeriesFields> = ({
	control,
	fieldClassName,
	editorClassName,
	uploadClassName,
}) => {
	return (
		<>
			<Controller
				name="name"
				defaultValue={''}
				control={control}
				render={({ field: { value, onChange }, fieldState: { error } }) => (
					<Field
						className={fieldClassName}
						onChange={onChange}
						value={value}
						label="Name"
						error={error}
					/>
				)}
				rules={{
					required: 'Name required!',
				}}
			/>
			<Controller
				name="year"
				defaultValue={0}
				control={control}
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<Field
						className={fieldClassName}
						onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
						value={value}
						label="Year"
						error={error}
					/>
				)}
				rules={{
					required: 'Year required!',
				}}
			/>
			<Controller
				name="age"
				defaultValue={0}
				control={control}
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<Field
						className={fieldClassName}
						onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
						value={value}
						label="Age"
						error={error}
					/>
				)}
				rules={{
					required: 'Age required!',
				}}
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

export default ManageSeriesFields
