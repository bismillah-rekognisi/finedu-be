import { toUserResponse, toUsersListResponse } from "../dto/user-response.dto.js";

export default class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    getAll = async (req, res, next) => {
        try {
            const users = await this.userService.getAll();
            res.status(200).json(toUsersListResponse(users));
        } catch (error) {
            next(error);
        } 
    }

    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await this.userService.getById(parseInt(id));
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(toUserResponse(user));
        } catch (error) {
            next(error);
        }
    }

    suspend = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.userService.suspendUser(id);
            res.status(200).json({ message: "User suspended successfully" });
        } catch (error) {
            next(error);
        }
    }

    activate = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.userService.activateUser(id);
            res.status(200).json({ message: "User activated successfully" });
        } catch (error) {
            next(error);
        }
    }

    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.userService.deleteUser(parseInt(id));
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            next(error);
        }
    }
}