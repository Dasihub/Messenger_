import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('messages')
export class MessageEntity {
	@PrimaryGeneratedColumn()
	id_message: number

	@Column({ type: 'int2' })
	sender_id: number

	@Column({ type: 'int2' })
	receiver_id: number

	@Column({ type: 'varchar' })
	message: string
}
