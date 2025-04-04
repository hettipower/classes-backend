import { Injectable, BadRequestException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity'; // Corrected path to 'entities' folder

import { errorResponse } from '../common/response.util';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findByUsername(dataUsername): Promise<User> {

        const userReturnValue = await this.userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.role", "role")
        .addSelect(["role.role_name"]) // Select specific fields in the Role entity
        .where("user.username = :username", { username: dataUsername })
        .getOne();

        if (!userReturnValue) {
            throw new HttpException(
                errorResponse('Username does not exist', '', 400),
                400,
            );
        }

        return await userReturnValue;
    }

    async getUserByEmail(email): Promise<User> {
        const userReturnValue = await this.userRepository.findOne({ where: email });

        if (!userReturnValue) {
            throw new HttpException(
                errorResponse('Username does not exist', '', 400),
                400,
            );
        }

        return await userReturnValue;
    }

    async getUserByUserId(userId): Promise<User> {
        const userReturnValue = await this.userRepository.findOne({ where: { user_id: userId } });

        if (!userReturnValue) {
            throw new HttpException(
                errorResponse('User Id does not exist', '', 400),
                400,
            );
        }

        return await userReturnValue;

    }

    async updateUserPassword(userId, hashedPassword): Promise<any> {
        const userReturnValue = await this.userRepository.findOne({
            where: { user_id: userId },
        });

        // If the user does not exist, throw an exception
        if (!userReturnValue) {
            throw new HttpException(
                errorResponse('User does not exist', '', 400),
                400
            );
        }

        userReturnValue.password = hashedPassword;

        await this.userRepository.save(userReturnValue);

        return userReturnValue;
    }


}