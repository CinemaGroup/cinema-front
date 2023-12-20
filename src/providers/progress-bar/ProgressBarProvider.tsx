import { Next13ProgressBar } from 'next13-progressbar'
import { FC, PropsWithChildren } from 'react'

const ProgressBarProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Next13ProgressBar
				height="3px"
				color="rgba(93,14,245,.83)"
				options={{ showSpinner: true }}
				startPosition={0.3}
				stopDelayMs={200}
				showOnShallow
			/>
			{children}
		</>
	)
}

export default ProgressBarProvider
