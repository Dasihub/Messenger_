import { FC, memo } from 'react'
import styles from './styles.module.less'
import { IListUsersProps } from './IListUsers'
import { Avatar } from '../../../img'

const ListUsers: FC<IListUsersProps> = ({}) => {
	return (
		<div className={styles.container}>
			{/*{partnerList.map(item => (*/}
			{/*	<div*/}
			{/*		key={item.id_partner}*/}
			{/*		className={item.id_room == idRoom ? styles.user_active : styles.user}*/}
			{/*		onClick={joinRoom.bind(null, item)}*/}
			{/*	>*/}
			{/*		<img*/}
			{/*			src={*/}
			{/*				item.profile_img?.length*/}
			{/*					? `http://localhost:5000/profile/${item.profile_img}`*/}
			{/*					: Avatar*/}
			{/*			}*/}
			{/*			alt=''*/}
			{/*		/>*/}
			{/*		<div style={{ flex: 3 }}>*/}
			{/*			<div className={styles.username}>{item.name}</div>*/}
			{/*			<div className={styles.message}>{item.last_message}</div>*/}
			{/*		</div>*/}
			{/*		<div className={styles.right_block}>*/}
			{/*			/!*<div className={styles.time}>19:30</div>*!/*/}
			{/*			{!!item.count_message && (*/}
			{/*				<div className={styles.count_message}>*/}
			{/*					{item.count_message > 99 ? '99+' : item.count_message}*/}
			{/*				</div>*/}
			{/*			)}*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*))}*/}
		</div>
	)
}

export default memo(ListUsers)
