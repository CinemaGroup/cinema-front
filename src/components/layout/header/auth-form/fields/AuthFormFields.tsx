import Field from '@/components/ui/form-elements/field/Field'
import { useActions } from '@/hooks/queries/user/useActions'
import { IAuth } from '@/store/user/interface/user.interface'
import { validEmail } from '@/utils/validations/email-validation'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import AuthFormButtons from '../buttons/AuthFormButtons'
import styles from './AuthFormFields.module.scss'
import { IAuthForm } from './interface/auth-form.interface'

const AuthFormFields: FC<IAuthForm> = ({ type, setType }) => {
	const { login, register } = useActions()

	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IAuth>({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<IAuth> = (data) => {
		type === 'login' ? login(data) : register(data)
		reset()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			{type === 'register' && (
				<Field
					{...formRegister('login', {
						required: 'Login is required',
						minLength: {
							value: 6,
							message: 'Min length must be at least 5 characters',
						},
					})}
					className={styles.field}
					variant="custom"
					label="Login"
					error={errors.login}
				/>
			)}
			<Field
				{...formRegister('email', {
					required: 'Email is required',
					pattern: {
						value: validEmail,
						message: 'Please enter a valid email',
					},
				})}
				className={styles.field}
				variant="custom"
				label="E-mail"
				error={errors.email}
			/>
			<Field
				{...formRegister('password', {
					required: 'Password is required',
					minLength: {
						value: 6,
						message: 'Min length must be at least 6 characters',
					},
				})}
				className={styles.field}
				variant="custom"
				type="password"
				label="Password"
				error={errors.password}
			/>
			<AuthFormButtons type={type} setType={setType} />
		</form>
	)
}

export default AuthFormFields
