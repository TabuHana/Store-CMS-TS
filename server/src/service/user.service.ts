import { omit } from 'lodash';
import User, { UserCreationAttributes } from '../models/user.model';
import { filterUserQuery } from '../schema/user.schema';

export async function createUser(input: UserCreationAttributes) {
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

export async function findUser(query: filterUserQuery) {
    return User.findOne({ where: { email: query.body.email, password: query.body.password } });
}
