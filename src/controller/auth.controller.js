import { createUserSchema } from "../dto/user-request.dto.js";
import { toUserResponse } from "../dto/user-response.dto.js";

export default class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    register = async (req, res, next) => {
        try {
            const { error, value } = createUserSchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ error: error.details.map(d => d.message) });
            }
            const user = await this.authService.register(value);
            res.status(201).json(toUserResponse(user));
        } catch (error) {
            next(error);
        }
    }

    verify = async (req, res, next) => {
        try {
            const { token } = req.query;
            if (!token) {
                return res.status(400).json({ error: "Verification token is required" });
            }
            const user = await this.authService.verify(token);
            res.status(200).json(toUserResponse(user));
        } catch (error) {
            next(error);
        }
    }

    login = async (req, res, next) => {
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
            next(error);
        }
    }

    loginGoogle = async (req, res, next) => {
        try {
            const {id, email} = req.user;
            const token = await this.authService.loginGoogle(id, email);
            res.status(200).json({
                user: {id, email},
                token
            });
        } catch (error) {
            next(error);
        }
    }

    getProfile = async (req, res, next) => {
        try {
            const user = await this.authService.profile(req.user.id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.status(200).json(toUserResponse(user));
        } catch (error) {
            next(error); 
        }
    }
}