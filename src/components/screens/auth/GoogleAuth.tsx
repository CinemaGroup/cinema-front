'use client'

import { GoogleAuthService } from '@/services/auth/google/google-auth.service'
import { toastError } from '@/utils/helpers/toast-error'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { FC, useEffect } from 'react'
import { toastr } from 'react-redux-toastr'

const GoogleAuth: FC = () => {
	const searchParams = useSearchParams()

	const queryCode = searchParams.get('code')

	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['send code token'],
		mutationFn: (code: string) => GoogleAuthService.loginGoogle(code),
		async onSuccess() {
			toastr.success('Google Auth success', 'Auth with google success')
			await push('/')
		},
		onError(error) {
			toastError('Google Auth Error', error.message)
		},
	})

	useEffect(() => {
		if (queryCode) mutate(String(queryCode))
	}, [queryCode, mutate])

	return <div>GoogleAuth</div>
}

export default GoogleAuth
