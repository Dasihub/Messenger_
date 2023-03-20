import { IUser } from '../../models/IUser'

export interface IUserSlice extends IUser {
	auth: boolean
}
