import { createUserSchema } from "../dto/user-request.dto.js";
import { toUserResponse } from "../dto/user-response.dto.js";

export default class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    register = async (req, res) => {
        try {
            const { error, value } = createUserSchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ error: error.details.map(d => d.message) });
            }
            const user = await this.authService.register(value);
            res.status(201).json(toUserResponse(user));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "internal server error" });
        }
    }

    verify = async (req, res) => {
        try {
            const { token } = req.query;
            if (!token) {
                return res.status(400).json({ error: "Verification token is required" });
            }
            const user = await this.authService.verify(token);
            res.status(200).json(toUserResponse(user));
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: "internal server error" });
        }
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Email and password are required" });
            }
            const { user, token } = await this.authService.login({email, password});
            res.status(200).json({
                user: toUserResponse(user),
                token
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "internal server error" });
        }
    }
}