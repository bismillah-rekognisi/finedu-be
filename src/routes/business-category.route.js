import { Router } from 'express';
import { ensureRole } from '../middleware/ensureRole.js';
import { authMiddleware } from '../middleware/auth.js';

export default function createBusinessCategoryRoute(businessCategoryController) {
    const router = Router();

    router.post('/', authMiddleware, ensureRole('Admin'), businessCategoryController.create);
    router.get('/', businessCategoryController.getAll);
    router.get('/:id', businessCategoryController.getById);
    router.put('/:id', authMiddleware, ensureRole('Admin'), businessCategoryController.update);
    router.delete('/:id', authMiddleware, ensureRole('Admin'), businessCategoryController.delete);

    return router;
}
