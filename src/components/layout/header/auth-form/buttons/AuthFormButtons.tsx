import { FC } from 'react'
import { IAuthForm } from '../fields/interface/auth-form.interface'
import styles from './AuthFormButtons.module.scss'

const AuthFormButtons: FC<IAuthForm> = ({ type, setType }) => {
	return (
		<>
			<button type="button" className={styles.lost}>
				Lost your password?
			</button>
			<button type="submit" className={styles.submit}>
				{type === 'login' ? 'Sign In' : 'Register'}
			</button>
			<button
				type="button"
				className={styles.change}
				onClick={() => setType(type === 'login' ? 'register' : 'login')}
			>
				{type === 'login' ? (
					<>
						Not registered yet? <span>Register</span>
					</>
				) : (
					<>
						Already have an account? <span>Login</span>
					</>
				)}
			</button>
		</>
	)
}

export default AuthFormButtons
