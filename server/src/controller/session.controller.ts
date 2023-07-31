import { Request, Response } from "express";
import { findUser, validatePassword } from "../service/user.service";
import { createSession } from "../service/session.service";

export async function createUserSessionHandler(res:Response, req: Request) {
    const user = validatePassword(req.body)

    // Validate the user's password
    if (!user) {
        return res.status(401).send('Invalid email or password');
    }

    

    // Create a session
    const session = await createSession(, req.get('user-agent') || '')
}