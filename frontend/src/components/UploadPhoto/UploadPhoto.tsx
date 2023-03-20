import { FC } from 'react'
import styles from '../../pages/UploadPhotoPage/styles.module.less'
import { Avatar } from '../../img'
import { Button, FileInput } from '../../ui'
import { IUploadPhoto } from './IUploadPhoto'

const UploadPhoto: FC<IUploadPhoto> = props => {
	return (
		<div className={styles.main}>
			<div className={styles.box}>
				<h1 style={{ textAlign: 'center', fontSize: '24px' }}>Загрузить фото</h1>
				<img className={styles.avatar} src={props.img ? props.img : Avatar} alt='avatar' />
				<div style={{ width: '100%' }}>
					<FileInput
						value={props.value}
						id='file'
						label='Загрузить фото'
						accept='image/png, image/jpg, image/jpeg'
						isLabel={!!props.img}
						deleteImg={props.deleteImg}
						onChange={props.change}
					/>
				</div>
				<Button loader={props.loader} value='Далее' onClick={props.handleImg} />
			</div>
		</div>
	)
}

export default UploadPhoto
