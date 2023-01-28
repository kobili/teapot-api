import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity({name: "app_user"})
export class AppUser extends BaseEntity {
    @PrimaryColumn({name: "user_id"})
    userId: string;

    @Column({name: "first_name"})
    firstName: string;
    
    @Column({name: "last_name"})
    lastName: string;

    @Column({name: "email"})
    email: string;
}