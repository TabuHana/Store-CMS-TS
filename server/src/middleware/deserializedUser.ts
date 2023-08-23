import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { verifyJwt } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../service/session.service';

const deserializedUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken =
        get(req, 'cookies.accessToken') || get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

    const refreshToken = get(req, 'cookies.refreshToken') || (get(req, 'headers.x-refresh') as string);

    if (!accessToken && !refreshToken) {
        return next();
    }

    if (!accessToken && refreshToken) {
        const { expired } = verifyJwt(refreshToken);

        if (!expired) {
            const newAccessToken = await reIssueAccessToken({ refreshToken });

            if (newAccessToken) {
                console.log('new access token sent?');
                res.setHeader('x-access-token', newAccessToken);

                res.cookie('accessToken', newAccessToken, {
                    maxAge: 900000, // 15 mins
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: false, //set to true for production
                });
            }

            const result = verifyJwt(newAccessToken as string);

            res.locals.user = result.decoded;
            return next();
        }
    }

    const { decoded, expired } = verifyJwt(accessToken);

    if (!expired) {
        res.locals.user = decoded;
        return next();
    }

    return next();
};

export default deserializedUser;
