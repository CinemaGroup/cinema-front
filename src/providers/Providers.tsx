'use client'

import AuthProvider from '@/providers/auth-provider/AuthProvider'
import { persistor, store } from '@/store/store'
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ProgressBarProvider from './progress-bar/ProgressBarProvider'
import ReduxToast from './redux/ReduxToast'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

export default function Providers({ children }: PropsWithChildren<unknown>) {
	return (
		<QueryClientProvider client={queryClient}>
			<ProgressBarProvider>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<AuthProvider>
							<ReduxToast />
							{children}
						</AuthProvider>
					</PersistGate>
				</Provider>
			</ProgressBarProvider>
		</QueryClientProvider>
	)
}
