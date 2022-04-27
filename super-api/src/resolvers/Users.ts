import { Arg, Authorized, Ctx, ID, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import { User } from "../models/User";
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';

@Resolver(User)
export class UsersResolver {
    private userRepo = getRepository(User);

    @Query(() => [User])
    async getUsers(): Promise<User[]> {
        return await this.userRepo.find();
    }

    @Authorized()
    @Query(() => User)
    async getProfile(@Ctx() context: { user: User }): Promise<User | null> {
        const user = context.user;
        return await this.userRepo.findOne(user.id);
    }

    @Mutation(() => User)
    async signup(@Arg('email') email: string, @Arg('password') password: string): Promise<User> {
        const newUser = this.userRepo.create({
            email,
            password: await argon2.hash(password)
        });
        await newUser.save();
        return newUser;
    }

    @Mutation(() => String, { nullable: true })
    async signin(@Arg('email') email: string, @Arg('password') password: string): Promise<string> {
        const user = await this.userRepo.findOne({ email });

        if (user) {
            if (await argon2.verify(user.password, password)) {
                const token = jwt.sign({ userId: user.id }, 'supersecret');
                return token;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}