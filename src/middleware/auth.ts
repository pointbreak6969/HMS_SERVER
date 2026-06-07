import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const SUPABASAE_JWT_SECRET = process.env.SUPABASAE_JWT_SECRET;

interface AuthRequest extends Request {
    user?: string | JwtPayload;
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction): void {
    const token = req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.slice(7)
        : undefined;

    if (!SUPABASAE_JWT_SECRET) {
        res.status(500).json({ message: "JWT secret is not configured" });
        return;
    }

    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const decoded = jwt.verify(token, SUPABASAE_JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Unauthorized" });
    }
}
