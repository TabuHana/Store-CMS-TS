import { omit } from 'lodash';
import User from '../models/user.model';

export async function createUser(input: any) {
    try {
        const user = await User.create(input);
        return omit(user.toJSON(), 'password');
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function validatePassword({ email, password }: { email: string; password: string }) {
    const user = await User.findOne({ attributes: [email] });

    if (!user) {
        return false;
    }

    const isValid = User.comparePassword(password, user);

    if (!isValid) {
        return false;
    }

    return omit(user.toJSON(), 'password');
}

export async function findUser(query: any) {
    return User.findOne(query);
}
