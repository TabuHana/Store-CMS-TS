import { omit } from 'lodash';
import User, { UserInput, UserAttributes } from '../models/user.model';
import { passwordCompare } from '../utils/passwordCompare';

export async function createUser(input: UserInput) {
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

    const isValid = passwordCompare(user.password, password);

    if (!isValid) {
        return false;
    }

    return omit(user.toJSON(), 'password');
}

export async function findUser(query: any) {
    return User.findOne(query);
}
