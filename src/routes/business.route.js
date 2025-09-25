import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { ensureRole } from '../middleware/ensureRole.js';
import { ensureOwner } from '../middleware/ensureOwner.js';

export default function createBusinessRoute(businessController) {
    const router = Router();

    router.use(authMiddleware);

    router.post('/', businessController.create);
    router.get('/', businessController.getByUser);
    router.get('/all', ensureRole('Admin'), businessController.getAll);
    router.get('/:id', ensureOwner('business'), businessController.getById);
    router.put('/:id', ensureOwner('business'), businessController.update);
    router.delete('/:id', ensureOwner('business'), businessController.delete);

    return router;
}
