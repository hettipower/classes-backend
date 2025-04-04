import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity('roles')
export class Role {
  
  @PrimaryGeneratedColumn()
  role_id!: number;

  @Column({ type: 'varchar', length: 255, })
  role_name!: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at!: Date;

}