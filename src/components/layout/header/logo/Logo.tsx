import logo from '@/assets/images/global/logo.svg'
import { SITE_NAME } from '@/constants/seo.constants'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

const Logo: FC = () => {
	return (
		<Link href="/">
			<Image
				quality={100}
				priority
				draggable={false}
				src={logo}
				alt={SITE_NAME}
			/>
		</Link>
	)
}

export default Logo
