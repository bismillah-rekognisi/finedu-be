import { Router } from 'express';

export default function createRoleRoute(roleController) {
    const router = Router();

    router.post('/', roleController.createRole);
    router.get('/', roleController.getAllRoles);
    router.get('/:id', roleController.getRoleById);
    router.put('/:id', roleController.updateRole);
    router.delete('/:id', roleController.deleteRole);

    return router;
}
