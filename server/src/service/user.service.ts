import { omit } from 'lodash';
import User, { UserCreationAttributes } from '../models/user.model';
import Order from '../models/order.model';

export async function createUser(input: UserCreationAttributes) {
    try {
        const user = await User.create(input);
        return omit(user.toJSON(), 'password');
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function findUser(query: string) {
    const user = await User.findOne({
        where: {
            user_id: query,
        },
        include: [{ model: Order }],
    });

    if (!user) {
        return false;
    }

    return omit(user.toJSON(), 'password');
}

export async function validatePassword({ email, password }: { email: string; password: string }) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return false;
    }

    const isValid = User.comparePassword(password, user);

    if (!isValid) {
        return false;
    } else {
        return omit(user.toJSON(), 'password');
    }
}
