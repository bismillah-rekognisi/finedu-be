import express from 'express';
import { authMiddleware } from '../middleware/auth.js';

export default function createTargetRoute(targetController) {
    const router = express.Router();

    router.use(authMiddleware);

    router.post('/', targetController.create);
    router.get('/', targetController.getAll);
    router.get('/:id', targetController.getById);
    router.put('/:id', targetController.update);
    router.delete('/:id', targetController.delete);
    
    return router;
}