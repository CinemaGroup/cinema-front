import { TypeAuth } from '@/shared/types/auth/auth.type'
import { Dispatch, SetStateAction } from 'react'

export interface IAuthForm {
	type: TypeAuth
	setType: Dispatch<SetStateAction<TypeAuth>>
}
