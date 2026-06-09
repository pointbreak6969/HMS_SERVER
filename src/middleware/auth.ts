import { NextFunction, Request, Response } from "express";
import {supabaseClient} from "../constant"
import { APIError } from "../utils/ApiError";
import { User } from "@supabase/supabase-js";

interface AuthRequest extends Request {
    user?: User | null;
}

export async function authenticate(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.slice(7)
        : undefined;

    // if (!SUPABASAE_JWT_SECRET) {
    //     res.status(500).json({ message: "JWT secret is not configured" });
    //     return;
    // }
    const {data: {user}, error} = await supabaseClient.auth.getUser(token)
    if (error || !user) {
        throw new APIError(401, "Invalid token")
    }
    if (!user.email_confirmed_at){
        throw new APIError(403, "Email not verified")
    }
    req.user = user;
    next();

    // try {
    //     const decoded = jwt.verify(token, SUPABASAE_JWT_SECRET);
    //     req.user = decoded;
    //     next();
    // } catch (err) {
    //     res.status(401).json({ message: "Unauthorized" });
    // }
}
