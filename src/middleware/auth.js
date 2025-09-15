import { verifyJwt } from "../utils/jwt.js";

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const payload = verifyJwt(token);
        if (!payload || !payload.userId) {
            return res.status(401).json({ error: "Invalid token" });
        }
        req.user = {
            id: payload.userId,
            email: payload.email
        };
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}
