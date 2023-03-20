import React, { memo } from 'react'
import styles from './styles.module.less'
import { Arrow } from '../../../ui'
import { IInfoHeaderProps } from './IInfoHeader'
import { Avatar } from '../../../img'

const InfoHeader: React.FC<IInfoHeaderProps> = ({ hideChat, recipient }) => {
	return (
		<div className={styles.container}>
			{recipient.id_user && (
				<div className={styles.userinfo}>
					<button onClick={hideChat} className={styles.back}>
						<Arrow />
					</button>
					<img
						src={
							recipient.profile_img
								? `http://localhost:5000/profile/${recipient.profile_img}`
								: Avatar
						}
						className={styles.userinfo__photo}
						alt='avatar'
					/>
					<div>
						<div className={styles.username}>{recipient.name}</div>
						<div className={styles.time}>Онлайн</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default memo(InfoHeader)
