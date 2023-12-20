import ReactSelect from '@/components/ui/selects/react-select/ReactSelect'
import { COUNTRIES } from '@/datas/countries.data'
import { useActorsSelect } from '@/hooks/manage/selects/useActorsSelect'
import { useDirectorsSelect } from '@/hooks/manage/selects/useDirectorsSelect'
import { useGenresSelect } from '@/hooks/manage/selects/useGenresSelect'
import { useGroupsSelect } from '@/hooks/manage/selects/useGroupsSelect'
import { useOperatorsSelect } from '@/hooks/manage/selects/useOperatorSelect'
import { useProducersSelect } from '@/hooks/manage/selects/useProducerSelect'
import { useScenaristsSelect } from '@/hooks/manage/selects/useScenaristSelect'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { IManageSeriesSelects } from '../interface/series-selects.interface'

const ManageSeriesSelects: FC<IManageSeriesSelects> = ({
	control,
	selectClassName,
}) => {
	const { genres } = useGenresSelect()
	const { groups } = useGroupsSelect()
	const { actors } = useActorsSelect()
	const { directors } = useDirectorsSelect()
	const { producers } = useProducersSelect()
	const { operators } = useOperatorsSelect()
	const { scenarists } = useScenaristsSelect()

	return (
		<>
			<Controller
				name="countries"
				control={control}
				render={({ field, fieldState: { error } }) => (
					<ReactSelect
						field={field}
						options={COUNTRIES}
						isMulti
						isCreatable
						label="Countries (Not Required)"
						error={error}
						className={selectClassName && selectClassName}
					/>
				)}
			/>
			<Controller
				name="genres"
				control={control}
				render={({ field, fieldState: { error } }) => (
					<ReactSelect
						field={field}
						options={genres}
						isMulti
						label="Genres"
						error={error}
						className={selectClassName && selectClassName}
					/>
				)}
				rules={{
					required: 'Please select at least one genre!',
				}}
			/>
			<Controller
				name="groups"
				control={control}
				render={({ field, fieldState: { error } }) => (
					<ReactSelect
						field={field}
						options={groups}
						isMulti
						label="Groups"
						error={error}
						className={selectClassName && selectClassName}
					/>
				)}
				rules={{
					required: 'Please select at least one group!',
				}}
			/>
			<Controller
				name="actors"
				control={control}
				render={({ field, fieldState: { error } }) => (
					<ReactSelect
						field={field}
						options={actors}
						isMulti
						label="Actors"
						error={error}
						className={selectClassName && selectClassName}
					/>
				)}
				rules={{
					required: 'Please select at least one actor!',
				}}
			/>
			<Controller
				name="directors"
				control={control}
				render={({ field, fieldState: { error } }) => (
					<ReactSelect
						field={field}
						options={directors}
						isMulti
						label="Directors"
						error={error}
						className={selectClassName && selectClassName}
					/>
				)}
				rules={{
					required: 'Please select at least one director!',
				}}
			/>
			<Controller
				name="producers"
				control={control}
				render={({ field, fieldState: { error } }) => (
					<ReactSelect
						field={field}
						options={producers}
						isMulti
						label="Producers"
						error={error}
						className={selectClassName && selectClassName}
					/>
				)}
				rules={{
					required: 'Please select at least one producer!',
				}}
			/>
			<Controller
				name="scenarists"
				control={control}
				render={({ field, fieldState: { error } }) => (
					<ReactSelect
						field={field}
						options={scenarists}
						isMulti
						label="Scenarists"
						error={error}
						className={selectClassName && selectClassName}
					/>
				)}
				rules={{
					required: 'Please select at least one scenarist!',
				}}
			/>
			<Controller
				name="operators"
				control={control}
				render={({ field, fieldState: { error } }) => (
					<ReactSelect
						field={field}
						options={operators}
						isMulti
						label="Operators"
						error={error}
						className={selectClassName && selectClassName}
					/>
				)}
				rules={{
					required: 'Please select at least one operator!',
				}}
			/>
		</>
	)
}

export default ManageSeriesSelects
