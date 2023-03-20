import { FC } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import AuthPage from './AuthPage/AuthPage'
import StepRegisterPage from './StepRegisterPage/StepRegisterPage'
import MainPage from './MainPage/MainPage'
import { useTypeSelector } from '../hooks/useTypeSelector'
import ActiveAccountLastAuth from './ActiveAccountLastAuth/ActiveAccountLastAuth'
import UploadPhotoPage from './UploadPhotoPage/UploadPhotoPage'

const Router: FC = () => {
	const { auth, active, id_user } = useTypeSelector(state => state.userReducer)

	if (auth) {
		if (!active) {
			return <ActiveAccountLastAuth />
		}

		return (
			<div className='main_container'>
				<Routes>
					<Route path='/login' element={<Navigate replace={true} to='/' />} />
					<Route path='/register' element={<Navigate replace={true} to='/' />} />
					<Route path='/upload-photo' element={<UploadPhotoPage />} />
					<Route path='/' element={<MainPage />} />
				</Routes>
			</div>
		)
	}

	if (active && id_user) {
		return (
			<div className='main_container'>
				<Routes>
					<Route path='/upload-photo' element={<UploadPhotoPage />} />
				</Routes>
			</div>
		)
	}

	return (
		<Routes>
			<Route path='/login' element={<AuthPage />} />
			<Route path='/register' element={<StepRegisterPage />} />
			<Route path='/upload-photo' element={<Navigate replace to='/login' />} />
			<Route path='/' element={<Navigate replace to='/login' />} />
		</Routes>
	)
}

export default Router
