import { sendEmail } from "../utils/mail.js";
import { generateLinkVerification, decrypt } from "../utils/verification.js";
import { signJwt } from "../utils/jwt.js";
import bcrypt from "bcryptjs";

export default class AuthService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    async register(userData) {
        const existingUser = await this.userRepo.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        userData.password = await bcrypt.hash(userData.password, 10);
        const newUser = await this.userRepo.create(userData);

        // verify email
        const baseUrl = process.env.BASE_URL;
        if (!baseUrl) {
            throw new Error("BASE_URL is not defined in environment variables");
        }
        const verificationLink = generateLinkVerification({
            baseUrl,
            userId: newUser.id,
            email: newUser.email
        });

        try {
            await sendEmail({
                to: userData.email,
                subject: "Verify Your Email",
                text: `Please verify your email by clicking the following link: ${verificationLink}`,
                html: `<p>Please verify your email by clicking the following link: <a href="${verificationLink}">${verificationLink}</a></p>`
            });
        } catch (err) {
            await this.userRepo.delete(newUser.id);
            throw new Error("Failed to send verification email");
        }

        return newUser;
    }
    
    async verify(token) {
        let payload;
        try {
            payload = decrypt(token);
        } catch (err) {
            throw new Error("Invalid or expired verification token");
        }

        if (!payload || !payload.userId || !payload.email) {
            throw new Error("Invalid verification token payload");
        }

        const { userId, email } = payload;
        const user = await this.userRepo.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        if (user.email !== email) {
            throw new Error("Email mismatch");
        }
        if (user.isVerified) {
            throw new Error("User already verified");
        }

        const updatedUser = await this.userRepo.verify(userId);
        return updatedUser;
    }

    async login({ email, password }) {
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        if (user.emailVerifiedAt === null) {
            throw new Error('Email not verified');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        
        const token = signJwt({ userId: user.id, email: user.email });
        return { user, token };
    }
}