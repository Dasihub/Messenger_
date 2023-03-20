import { IMessage } from '../../pages/MainPage/IMainPage'
import { Socket } from 'socket.io-client'

export interface IChatProps {
	roomLoader: boolean
	messages: IMessage[]
	socket: Socket
	handleMessage: (message: string) => void
}
