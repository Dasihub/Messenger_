import { useNavigate } from 'react-router-dom'
import Compressor from 'compressorjs'
import { FC, useState, ChangeEvent } from 'react'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { userSlice } from '../../redux/reducers/userSlice'
import { useTypeDispatch } from '../../hooks/useTypeDispatch'
import UploadPhotoService from '../../services/UploadPhotoService'
import { UploadPhoto } from '../../components'

const UploadPhotoPage: FC = () => {
	const navigate = useNavigate()
	const { auth, authProfileImg } = userSlice.actions
	const { id_user } = useTypeSelector(state => state.userReducer)
	const dispatch = useTypeDispatch()
	const [img, setImg] = useState<string | ArrayBuffer>('')
	const [value, setValue] = useState<string>('')
	const [fileImg, setFileImg] = useState<File>()
	const [loader, setLoader] = useState<boolean>(false)

	const change = (e: ChangeEvent<HTMLInputElement>) => {
		const file = (e.target.files as FileList)[0]
		setValue(e.target.value)
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => setImg(reader.result || '')

		new Compressor(file, {
			quality: 0.8,
			height: 128,
			width: 128,
			strict: true,
			checkOrientation: false,
			convertTypes: ['image/png', 'image/jpeg', 'image/jpg'],
			success(file_: File) {
				const compressFile = new File([file_], file_.name)
				setFileImg(compressFile)
			}
		})
	}

	const handleImg = async () => {
		try {
			if (value.length) {
				const formData: FormData = new FormData()
				formData.append('img', fileImg || '')
				formData.append('id_user', String(id_user))

				setLoader(true)
				const data = await UploadPhotoService.uploadPhoto(formData)
				dispatch(authProfileImg(data))
				return navigate('/')
			}
			dispatch(auth())
			navigate('/')
		} catch (e) {
			setLoader(false)
		}
	}

	const deleteImg = () => {
		setImg('')
		setValue('')
	}

	return (
		<UploadPhoto
			img={img}
			value={value}
			loader={loader}
			change={change}
			deleteImg={deleteImg}
			handleImg={handleImg}
		/>
	)
}

export default UploadPhotoPage
