import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

// @Index(['name', 'type']) // another way to create indexed fields.
@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Index() // this makes search on name to be based on indexes -> much faster
    @Column()
    name: string;

    @Column('json')
    payload: Record<string, any>
}
