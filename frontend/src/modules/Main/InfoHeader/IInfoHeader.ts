import { IUser } from '../../../models/IUser'

export interface IInfoHeaderProps {
	recipient: IUser
	hideChat: () => void
}
