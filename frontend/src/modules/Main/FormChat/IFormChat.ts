import { ChangeEvent, FormEvent } from 'react'

export interface IFormChatProps {
	change: (e: ChangeEvent<HTMLInputElement>) => void
	stopTyping: () => void
	newMessage: string
	submit: (e: FormEvent) => void
}
