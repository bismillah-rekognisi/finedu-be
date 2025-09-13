import { Router } from 'express';

export default function createAuthRoute(authController) {
    const router = Router();

    router.post('/register', authController.register);
    router.get('/verify', authController.verify);
    router.post('/login', authController.login);
    // router.get('/profile', userController.getProfile);

    return router;
}