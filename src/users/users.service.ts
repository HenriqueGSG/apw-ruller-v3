import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';




@Injectable()
export class UsersService {
    private users = [
        { id: 1, name: 'Usuario1', email: 'usuario1@email.com', role: 'Admin' },
        { id: 2, name: 'Usuario2', email: 'usuario2@email.com', role: 'Intern' },
        { id: 3, name: 'Usuario3', email: 'usuario3@email.com', role: 'Engineer' },
        { id: 4, name: 'Usuario4', email: 'usuario4@email.com', role: 'Engineer' },
        { id: 5, name: 'Usuario5', email: 'usuario5@email.com', role: 'Admin' }
    ];


    findAll(role?: 'ENGINEER' | 'ADMIN' | 'INTERN') {
        if (role) {


            const rolesArray = this.users.filter(user => user.role === role)
            if (rolesArray.length === 0) throw new NotFoundException('User Role not Found')

            return rolesArray

        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        if (!user) throw new NotFoundException('User Not Found')
        return user

    }


    create(user: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user
        }


        this.users.push(newUser)
        return newUser

    }


    update(id: number, updatedUserDto: UpdateUserDto) {

        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updatedUserDto }
            }
            return user
        })

        return this.findOne(id)

    }


    delete(id: number) {
        const removedUser = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id)

        return removedUser
    }



}
