import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { ensureRole } from '../middleware/ensureRole.js';

export default function createBlogRoute(blogController) {
    const router = Router();

    router.use(authMiddleware);

    router.post('/', ensureRole('Admin'), blogController.create);
    router.get('/', blogController.findMany);
    router.get('/:id', blogController.findById);
    router.put('/:id', ensureRole('Admin'), blogController.update);
    router.delete('/:id', ensureRole('Admin'), blogController.delete);

    return router;
} 