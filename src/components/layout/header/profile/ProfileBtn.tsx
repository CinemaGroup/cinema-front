'use client'

import Icon from '@/components/ui/icon/Icon'
import Modal from '@/components/ui/modal/Modal'
import { useProfile } from '@/hooks/queries/user/useProfile'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import AuthForm from '../auth-form/AuthForm'
import styles from './ProfileBtn.module.scss'

const ProfileBtn: FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { profile } = useProfile()

	return profile ? (
		<Link href="/profile" className={styles.link}>
			<Image
				className={styles.avatar}
				quality={100}
				priority
				fill
				draggable={false}
				src={profile.avatarPath}
				alt={profile.login}
			/>
		</Link>
	) : (
		<>
			<button
				className={styles.open}
				onClick={() => setIsModalOpen(!isModalOpen)}
			>
				<Icon name="User" size={32} />
			</button>
			{isModalOpen && (
				<Modal closeModal={() => setIsModalOpen(false)}>
					<AuthForm />
				</Modal>
			)}
		</>
	)
}

export default ProfileBtn
