import { omit } from 'lodash';
import User, { UserCreationAttributes } from '../models/user.model';
import bcrypt from 'bcrypt';
import Customer from '../models/customer.model';
import Item from '../models/item.model';

export async function createUser(input: UserCreationAttributes) {
    try {
        const user = await User.create(input);
        return omit(user.toJSON(), 'password');
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getUser(query: string) {
    const user = await User.findOne({
        where: {
            user_id: query,
        },
        include: [{
            association: 'customers', 
            include: ['orders']
        }]
    });

    if (!user) {
        return false;
    }

    return omit(user.toJSON(), 'password');
}

export async function updateUserPassword(query: string, update: any) {
    const user = await User.findOne({
        where: {
            user_id: query,
        },
    });

    if (!user) {
        return false;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(update.password, salt);

    try {
        await user.update({ password: hash });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function validatePassword({ email, password }: { email: string; password: string }) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return false;
    }

    const isValid = await User.comparePassword(password, user);

    if (!isValid) {
        return false;
    }

    return omit(user.toJSON(), 'password');
}
