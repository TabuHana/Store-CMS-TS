import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { verifyJwt } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../service/session.service';

const deserializedUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

    const refreshToken = get(req, 'cookies.refreshToken');

    if (refreshToken) {

        console.log('================ deserialized user ================')

        if (!accessToken) {
            console.log('access token doesnt exist');
            const newAccessToken = await reIssueAccessToken({ refreshToken });

            if (newAccessToken) {
                res.setHeader('x-access-token', newAccessToken);
            }

            const result = verifyJwt(newAccessToken as string);

            res.locals.user = result.decoded;
            return next();
        }

        console.log('access token exist')

        const { decoded, expired } = verifyJwt(accessToken);

        if (decoded) {
            res.locals.user = decoded;
            return next();
        }

        if (expired) {
            console.log('access token expired')
            const newAccessToken = await reIssueAccessToken({ refreshToken });

            if (newAccessToken) {
                res.setHeader('x-access-token', newAccessToken);
            }

            const result = verifyJwt(newAccessToken as string);

            res.locals.user = result.decoded;
            return next();
        }
    }

    return next();
};

export default deserializedUser;
