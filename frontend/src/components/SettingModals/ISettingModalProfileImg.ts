import { ChangeEvent } from 'react'

export interface ISettingModalProfileImgProps {
	hideModalProfileImg: () => void
	img: string | ArrayBuffer
	value: string
	deleteImg: () => void
	changeImg: (e: ChangeEvent<HTMLInputElement>) => void
	clickHandleProfileImg: () => void
}
