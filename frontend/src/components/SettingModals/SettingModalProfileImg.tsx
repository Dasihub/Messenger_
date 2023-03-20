import { FC } from 'react'
import { Button, FileInput, Modal } from '../../ui'
import styles from '../../modules/Main/Setting/styles.module.less'
import { Avatar } from '../../img'
import { ISettingModalProfileImgProps } from './ISettingModalProfileImg'

const SettingModalProfileImg: FC<ISettingModalProfileImgProps> = props => {
	return (
		<Modal hideModal={props.hideModalProfileImg} title='Загрузить фото'>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<div className={styles.box}>
					<img
						className={styles.avatar}
						src={props.img ? props.img : Avatar}
						alt='avatar'
					/>
					<div style={{ width: '100%' }}>
						<FileInput
							value={props.value}
							id='file'
							label='Загрузить фото'
							accept='image/png, image/jpg, image/jpeg'
							isLabel={!!props.img}
							deleteImg={props.deleteImg}
							onChange={props.changeImg}
						/>
					</div>
					<Button
						value='Сохранить'
						disabled={!props.img}
						onClick={props.clickHandleProfileImg}
					/>
				</div>
			</div>
		</Modal>
	)
}

export default SettingModalProfileImg
