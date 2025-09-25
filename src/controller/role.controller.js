import { createRoleSchema, updateRoleSchema } from "../dto/role-request.dto.js";
import { toRoleResponse, toRoleListResponse } from "../dto/role-response.dto.js";

export default class RoleController {
    constructor(roleService) {
        this.roleService = roleService;
    }

    createRole = async (req, res, next) => {
        try {
            const { error, value } = createRoleSchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ error: error.details.map(d => d.message) });
            }
            const role = await this.roleService.createRole(value);
            res.status(201).json(toRoleResponse(role));
        } catch (error) {
            next(error);
        }
    }

    getAllRoles = async (req, res, next) => {
        try {
            const roles = await this.roleService.getAllRoles();
            res.status(200).json(toRoleListResponse(roles));
        } catch (error) {
            next(error);
        }
    }

    getRoleById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const role = await this.roleService.getRoleById(parseInt(id));
            res.status(200).json(toRoleResponse(role));
        } catch (error) {
            next(error);
        }
    }

    updateRole = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { error, value } = updateRoleSchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ error: error.details.map(d => d.message) });
            }
            const role = await this.roleService.updateRole(parseInt(id), value);
            res.status(200).json(toRoleResponse(role));
        } catch (error) {
            next(error);
        }
    }

    deleteRole = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.roleService.deleteRole(parseInt(id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
