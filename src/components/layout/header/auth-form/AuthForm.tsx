'use client'

import logo from '@/assets/images/global/logo.svg'
import { SITE_NAME } from '@/constants/seo.constants'
import { AuthType } from '@/shared/types/auth/auth.type'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import styles from './AuthForm.module.scss'
import AuthFormFields from './fields/AuthFormFields'
import AuthFormGoogle from './google/AuthFormGoogle'

const AuthForm: FC = () => {
	const [type, setType] = useState<AuthType>('login')

	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.head}>
					<Image
						quality={100}
						priority
						draggable={false}
						src={logo}
						alt={SITE_NAME}
					/>
					<h2 className={styles.heading}>
						{type === 'login' ? 'Welcome Back!' : 'Create Free Account'}
					</h2>
					{type === 'register' && (
						<p className={styles.subscription}>
							It's free. No subscription required
						</p>
					)}
				</div>
				<AuthFormGoogle />
				<div className={styles.or}>
					<span>or</span>
				</div>
				<AuthFormFields type={type} setType={setType} />
				<div className={styles.footer}>
					<p className={styles.privacy}>
						By registering, you agree to Prizma Terms of Use and
						<Link href="/privacy">Privacy Policy</Link>
					</p>
				</div>
			</div>
		</>
	)
}

export default AuthForm
