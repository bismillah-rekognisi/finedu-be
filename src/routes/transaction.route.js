import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { ensureOwner } from '../middleware/ensureOwner.js';
import { ensureRole } from '../middleware/ensureRole.js';

export default function createTransactionRoute(transactionController) {
    const router = Router();

    router.use(authMiddleware);

    router.post('/', transactionController.create);
    router.get('/', transactionController.getByBusiness);
    router.get('/all', ensureRole('Admin'), transactionController.getAll);
    router.get('/:id', transactionController.getById);
    router.put('/:id', transactionController.update);
    router.delete('/:id', transactionController.delete);

    return router;
}
