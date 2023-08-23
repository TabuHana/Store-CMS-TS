import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { verifyJwt } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../service/session.service';
import config from 'config'

const deserializedUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log('Deserialed User Accessed');

    const accessToken =
        get(req, 'cookies.accessToken') || get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

    const refreshToken = get(req, 'cookies.refreshToken') || (get(req, 'headers.x-refresh') as string);

    console.log({ accessToken });
    console.log({ refreshToken });
    console.log('==========================================================================');

    if (!accessToken && !refreshToken) {
        return next();
    }

    const { decoded, expired } = verifyJwt(accessToken);

    console.log(`decoded: ${decoded}`);
    console.log(expired);
    console.log('==========================================================================');

    if (decoded) {
        res.locals.user = decoded;
        return next();
    }

    if (expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken({ refreshToken });

        if (newAccessToken) {
            res.setHeader('x-access-token', newAccessToken);

            res.cookie('accessToken', newAccessToken, {
                maxAge: 900000, // 15 mins
                httpOnly: true,
                domain: config.get('origin'),
                path: '/',
                sameSite: 'strict',
                secure: false, //set to true for production
            });
        }

        const result = verifyJwt(newAccessToken as string);

        res.locals.user = result.decoded;
        return next();
    }

    return next();
};

export default deserializedUser;
