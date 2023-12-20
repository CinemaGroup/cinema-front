import '@/assets/styles/globals.scss'

import { getSiteUrl } from '@/config/url.config'
import { SITE_NAME } from '@/constants/seo.constants'
import Providers from '@/providers/Providers'
import { Outfit } from 'next/font/google'
import { PropsWithChildren } from 'react'
import styles from './Layout.module.scss'
import Header from '@/components/layout/header/Header'

const inter = Outfit({
	weight: ['300', '400', '500', '600', '700', '800'],
	style: ['normal'],
	subsets: ['latin'],
	variable: '--font-outfit',
})

export const metadata = {
	icons: {
		icon: '/favicon.svg',
	},
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`,
	},
	metadataBase: new URL(getSiteUrl()),
	openGraph: {
		type: 'website',
		siteName: SITE_NAME,
		emails: ['info@prizma.com'],
	},
}

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<html lang="en">
			<body className={inter.variable}>
				<Providers>
					<div className={styles.layout}>
						<Header />
						<main>{children}</main>
						{/* <Footer /> */}
					</div>
				</Providers>
				<div id="modal"></div>
			</body>
		</html>
	)
}
