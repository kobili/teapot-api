import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity({name: "app_user"})
export class AppUser extends BaseEntity {
    @PrimaryColumn({name: "user_id", type: 'text'})
    userId: string;

    @Column({name: "first_name", type: 'text'})
    firstName: string;
    
    @Column({name: "last_name", type: 'text'})
    lastName: string;

    @Column({name: "email", type: 'text'})
    email: string;
}