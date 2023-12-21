import { useEffect, useState } from 'react'

export const useSlider = (steps: number, autoplayInterval: number) => {
	const [currentIndex, setCurrentIndex] = useState(0)

	const isBeginning = currentIndex === 0
	const isEnd = currentIndex === steps - 1

	const previous = () => {
		setCurrentIndex((i) => {
			if (i <= 0) return i
			return i - 1
		})
	}

	const next = () => {
		setCurrentIndex((i) => {
			if (i >= steps - 1) return i
			return i + 1
		})
	}

	const goTo = (index: number) => {
		setCurrentIndex(index)
	}

	useEffect(() => {
		let autoplayTimer: NodeJS.Timeout

		autoplayTimer = setInterval(() => {
			isEnd ? setCurrentIndex(0) : next()
		}, autoplayInterval)

		return () => {
			clearInterval(autoplayTimer)
		}
	}, [currentIndex, next, autoplayInterval])

	return {
		currentIndex,
		isBeginning,
		isEnd,
		previous,
		next,
		goTo,
	}
}
