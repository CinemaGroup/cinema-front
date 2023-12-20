import Home from '@/components/screens/home/Home'
import { Metadata } from 'next'

export const metadata: Metadata = {
	description: 'Prizma Description',
}

export default function HomePage() {
	return <Home />
}
