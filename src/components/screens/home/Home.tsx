import Container from '@/components/ui/template-elements/container/Container'
import Section from '@/components/ui/template-elements/section/Section'
import { FC } from 'react'
import HomeSlider from './slider/HomeSlider'

const Home: FC = () => {
	return (
		<Section>
			<Container>
				<HomeSlider />
			</Container>
		</Section>
	)
}

export default Home
