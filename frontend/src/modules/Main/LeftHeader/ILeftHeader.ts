import { IUser } from '../../../models/IUser'

export interface ILeftHeaderProps {
	recipientJoin: (user: IUser) => void
	isMenu: boolean
	showSetting: () => void
	hideMenu: () => void
	clickBurger: () => void
}
