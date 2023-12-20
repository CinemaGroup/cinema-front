import Button from '@/components/ui/form-elements/button/Button'
import Field from '@/components/ui/form-elements/field/Field'
import UploadField from '@/components/ui/form-elements/upload-field/UploadField'
import Icon from '@/components/ui/icon/Icon'
import cn from 'classnames'
import { FC } from 'react'
import { Controller, useFieldArray } from 'react-hook-form'
import styles from '../ManageEpisodeSourceEdit.module.scss'
import { IManageEpisodeSourceItemsEdit } from '../interface/episode-source.interface'

const ManageEpisodeSourceItemsEdit: FC<IManageEpisodeSourceItemsEdit> = ({
	control,
	variant,
	sourceIndex,
}) => {
	const { fields, remove, append } = useFieldArray({
		control,
		name: `${variant}.${sourceIndex}.items`,
	})

	return (
		<div className={styles.items}>
			{fields.map((field, index) => (
				<div key={index} className={styles.item}>
					<div className={styles.itemFill}>
						<Controller
							name={`${variant}.${sourceIndex}.items.${index}.quality`}
							control={control}
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<Field
									key={field.id}
									className={cn(styles.field, styles.itemField)}
									onChange={onChange}
									value={value}
									label="Quality"
									error={error}
								/>
							)}
							rules={{
								required: 'Quality required!',
							}}
						/>
						<Controller
							name={`${variant}.${sourceIndex}.items.${index}.url`}
							defaultValue=""
							control={control}
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									key={field.id}
									className={cn(styles.upload, styles.itemUpload)}
									onChange={onChange}
									value={value}
									label="Choose video"
									error={error}
									isNoImage
								/>
							)}
							rules={{
								required: 'Video required!',
							}}
						/>
					</div>
					{fields.length !== 1 && (
						<Button
							className={cn(styles.button, styles.removeItem)}
							type="button"
							onClick={() => remove(index)}
						>
							<Icon name="Trash2" />
							Remove Item
						</Button>
					)}
				</div>
			))}
			<Button
				className={cn(styles.button, styles.addItem)}
				type="button"
				onClick={() =>
					append({
						quality: '',
						url: '',
					})
				}
			>
				<Icon name="Plus" />
				Add Item
			</Button>
		</div>
	)
}

export default ManageEpisodeSourceItemsEdit
