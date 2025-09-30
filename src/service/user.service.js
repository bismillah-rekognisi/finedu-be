export default class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    async getAll() {
        return await this.userRepo.findAll();
    }

    async getById(id) {
        return await this.userRepo.findById(id);
    }

    async suspendUser(id) {
        return await this.userRepo.suspend(id);
    }

    async activateUser(id) {
        return await this.userRepo.activate(id);
    }

    async deleteUser(id) {
        return await this.userRepo.delete(id);
    }
}