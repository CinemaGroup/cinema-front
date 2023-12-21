import NewMedia from '@/components/blocks/media/new/NewMedia'
import NewMovies from '@/components/blocks/movies/new/NewMovies'
import NewSeries from '@/components/blocks/series/new/NewSeries'
import Container from '@/components/ui/template-elements/container/Container'
import Section from '@/components/ui/template-elements/section/Section'
import { FC } from 'react'
import HomeSlider from './slider/HomeSlider'
import styles from './Home.module.scss'

const Home: FC = () => {
	return (
		<Section>
			<Container>
				<HomeSlider />
				<div className={styles.wrapper}>
					<NewMedia />
					<NewMovies />
					<NewSeries />
				</div>
			</Container>
		</Section>
	)
}

export default Home
