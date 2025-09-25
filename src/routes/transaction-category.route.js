import { Router } from 'express';

export default function createTransactionCategoryRoute(transactionCategoryController) {
    const router = Router();

    router.post('/', transactionCategoryController.create);
    router.get('/', transactionCategoryController.getAll);
    router.get('/:id', transactionCategoryController.getById);
    router.put('/:id', transactionCategoryController.update);
    router.delete('/:id', transactionCategoryController.delete);

    return router;
}

