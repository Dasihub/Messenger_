import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('chats')
export class ChatEntity {
	@PrimaryGeneratedColumn()
	id_chat: number

	@Column({ type: 'int2' })
	id_user: number

	@Column({ type: 'int2', array: true })
	users_ids: number[]

	@Column({ type: 'int2', default: 0 })
	count_message

	@Column({ type: 'varchar', default: '' })
	latest_message: string
}
