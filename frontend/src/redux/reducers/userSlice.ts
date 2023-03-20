import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserSlice } from '../models/IUserSlice'
import { IUser } from '../../models/IUser'

const initialState: IUserSlice = {
	id_user: null,
	email: '',
	name: '',
	active: false,
	auth: false,
	profile_img: ''
}

export const userSlice = createSlice({
	initialState,
	name: 'auth',
	reducers: {
		authAccess: (state: IUserSlice, { payload }: PayloadAction<IUser>): IUserSlice => {
			return {
				id_user: payload.id_user,
				name: payload.name,
				email: payload.email,
				active: payload.active,
				profile_img: payload.profile_img,
				auth: true
			}
		},
		pushUserData: (state: IUserSlice, { payload }: PayloadAction<IUser>): IUserSlice => {
			return {
				id_user: payload.id_user,
				name: payload.name,
				email: payload.email,
				active: payload.active,
				profile_img: state.profile_img,
				auth: false
			}
		},
		clearUserData: () => {
			return {
				id_user: null,
				email: '',
				name: '',
				active: false,
				auth: false,
				profile_img: ''
			}
		},
		activeAcc: state => {
			state.active = true
		},
		auth: state => {
			state.auth = true
		},
		authProfileImg: (state, { payload }: PayloadAction<string>) => {
			state.auth = true
			state.profile_img = payload
		},
		changeNameAction: (state, { payload }: PayloadAction<string>) => {
			state.name = payload
		},
		changePhotoImgAction: (state, { payload }: PayloadAction<string>) => {
			state.profile_img = payload
		}
	}
})

export default userSlice.reducer
