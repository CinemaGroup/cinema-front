import Button from '@/components/ui/form-elements/button/Button'
import Field from '@/components/ui/form-elements/field/Field'
import Icon from '@/components/ui/icon/Icon'
import cn from 'classnames'
import { FC } from 'react'
import { Controller, useFieldArray } from 'react-hook-form'
import styles from './ManageEpisodeSourceEdit.module.scss'
import { IManageEpisodeSourceEdit } from './interface/episode-source.interface'
import ManageEpisodeSourceItemsEdit from './items/ManageEpisodeSourceItemsEdit'

const ManageEpisodeSourceEdit: FC<IManageEpisodeSourceEdit> = ({
	control,
	variant,
}) => {
	const { fields, remove, append } = useFieldArray({
		control,
		name: variant,
	})

	return (
		<div className={styles.sources}>
			{fields.map((field, index) => (
				<div key={index} className={styles.source}>
					<Controller
						name={`${variant}.${index}.language`}
						control={control}
						render={({ field: { value, onChange }, fieldState: { error } }) => (
							<Field
								key={field.id}
								className={styles.field}
								onChange={onChange}
								value={value}
								label="Language"
								error={error}
							/>
						)}
						rules={{
							required: 'Language required!',
						}}
					/>
					<ManageEpisodeSourceItemsEdit
						key={index}
						control={control}
						sourceIndex={index}
						variant={variant}
					/>
					{fields.length !== 1 && (
						<Button
							className={cn(styles.button, styles.removeSource)}
							type="button"
							onClick={() => remove(index)}
						>
							<Icon name="Trash2" />
							Remove Source
						</Button>
					)}
				</div>
			))}
			<Button
				className={cn(styles.button, styles.addSource)}
				type="button"
				onClick={() =>
					append({
						language: '',
						items: [
							{
								quality: '',
								url: '',
							},
						],
					})
				}
			>
				<Icon name="Plus" />
				Add Source
			</Button>
		</div>
	)
}

export default ManageEpisodeSourceEdit
