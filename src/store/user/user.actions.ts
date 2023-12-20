import { errorCatch } from '@/api/api.helpers'
import { getAuthUrl } from '@/config/api.config'
import { removeFromStorage } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/jwt/auth.service'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toastr } from 'react-redux-toastr'
import { IAuth, IAuthResponse } from './interface/user.interface'

export const register = createAsyncThunk<IAuthResponse, IAuth>(
	getAuthUrl('/register'),
	async (data, thunkApi) => {
		try {
			const response = await AuthService.main('register', data)
			toastr.success('success', 'You have successfully registered')
			return response
		} catch (error) {
			toastr.error('error', 'An error occurred during registration')
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const login = createAsyncThunk<IAuthResponse, IAuth>(
	getAuthUrl('/login'),
	async (data, thunkApi) => {
		try {
			const response = await AuthService.main('login', data)
			toastr.success('success', 'You have successfully logged in')
			return response
		} catch (error) {
			toastr.error('error', 'An error occurred during login')
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk(getAuthUrl('/logout'), async () => {
	removeFromStorage()
})

export const checkAuth = createAsyncThunk<IAuthResponse>(
	getAuthUrl('/check-auth'),
	async (_, thunkApi) => {
		try {
			const response = await AuthService.getNewTokens()
			return response.data
		} catch (error) {
			if (errorCatch(error) === 'jwt expired') {
				thunkApi.dispatch(logout())
			}

			return thunkApi.rejectWithValue(error)
		}
	}
)
