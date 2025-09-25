import { AppError } from "../error/appError.js";
import { slugify } from "../utils/slug.js";

export default class RoleService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }

    async createRole(roleData) {
        const name = roleData.name.trim();
        const slug = slugify(name);
        const existingRole = await this.roleRepository.findByName(name);
        if (existingRole) {
            throw new AppError('Role already exists', 400);
        }
        return await this.roleRepository.create({ name, slug });
    }

    async getAllRoles() {
        return await this.roleRepository.findAll();
    }

    async getRoleById(id) {
        const role = await this.roleRepository.findById(id);
        if (!role) {
            throw new AppError('Role not found', 404);
        }
        return role;
    }

    async updateRole(id, roleData) {
        const role = await this.roleRepository.findById(id);
        if (!role) {
            throw new AppError('Role not found', 404);
        }
        let updatedData = {};
        if (roleData.name !== undefined) {
            const name = roleData.name.trim();
            updatedData.name = name;
            updatedData.slug = slugify(name);
        }
        return await this.roleRepository.update(id, updatedData);
    }

    async deleteRole(id) {
        const role = await this.roleRepository.findById(id);
        if (!role) {
            throw new AppError('Role not found', 404);
        }
        return await this.roleRepository.delete(id);
    }
}
