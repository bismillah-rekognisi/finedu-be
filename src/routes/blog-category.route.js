import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { ensureRole } from '../middleware/ensureRole.js';

export default function createBlogCategoryRoute(blogCategoryController) {
    const router = Router();

    router.post('/', authMiddleware, ensureRole('Admin'), blogCategoryController.create);
    router.get('/', blogCategoryController.findMany);
    router.get('/:id', blogCategoryController.findById);
    router.put('/:id', authMiddleware, ensureRole('Admin'), blogCategoryController.update);
    router.delete('/:id', authMiddleware, ensureRole('Admin'), blogCategoryController.delete);

    return router;
} 