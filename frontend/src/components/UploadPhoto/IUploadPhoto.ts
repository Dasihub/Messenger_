import { ChangeEvent } from 'react'

export interface IUploadPhoto {
	value: string
	img: string | ArrayBuffer
	deleteImg: () => void
	change: (e: ChangeEvent<HTMLInputElement>) => void
	loader: boolean
	handleImg: () => void
}
