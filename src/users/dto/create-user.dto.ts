import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsString } from "class-validator"



export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string


    @IsEmail()
    email: string


    @IsEnum(['ENGINEER', 'ADMIN', 'INTERN'], { message: 'Valid role required' })
    role: 'ENGINEER' | 'ADMIN' | 'INTERN'
}