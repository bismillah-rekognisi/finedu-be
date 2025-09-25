import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';

export default function createGoalRoute(goalController) {
    const router = Router();

    router.use(authMiddleware);

    router.post('/', goalController.create);
    router.get('/', goalController.getByUser);
    router.get('/:id', goalController.getById);
    router.put('/:id', goalController.update);
    router.delete('/:id', goalController.delete);

    return router;
}
