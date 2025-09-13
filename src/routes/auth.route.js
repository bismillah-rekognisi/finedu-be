import { Router } from 'express';
import passport from '../config/passport.js';

export default function createAuthRoute(authController) {
    const router = Router();

    router.post('/register', authController.register);
    router.get('/verify', authController.verify);
    router.post('/login', authController.login);
    router.get('/google', passport.authenticate("google", {scope: ["profile", "email"]}));
    router.get('/google/callback', passport.authenticate("google", {session: false, failureRedirect: "/login"}), authController.loginGoogle);

    return router;
}