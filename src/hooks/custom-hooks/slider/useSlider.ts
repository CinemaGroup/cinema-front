import { useMemo, useRef, useState } from 'react'

export const useSlider = (steps: number) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [translate, setTranslate] = useState(0)
	const slideRef = useRef<HTMLLIElement>(null)

	const slideWidth = useMemo(() => {
		return slideRef.current?.offsetWidth || 0
	}, [slideRef.current])

	const isBeginning = currentIndex === 0
	const isEnd = currentIndex === steps - 1

	const previous = () => {
		setCurrentIndex((i) => (i <= 0 ? i : i - 1))

		setTranslate(translate - slideWidth)
	}

	const next = () => {
		setCurrentIndex((i) => (i >= steps - 1 ? i : i + 1))
		setTranslate(translate + slideWidth)
	}

	const goTo = (index: number) => {
		if (index !== currentIndex) {
			setCurrentIndex(index)
		}
	}

	return {
		translate,
		currentIndex,
		isBeginning,
		isEnd,
		slideRef,
		previous,
		next,
		goTo,
	}
}
