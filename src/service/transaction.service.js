import { AppError } from "../error/appError.js";

export default class TransactionService {
    constructor(transactionRepository, businessService) {
        this.transactionRepository = transactionRepository;
        this.businessService = businessService;
    }

    async createTransaction(data) {
        return await this.transactionRepository.create(data);
    }

    async getTransactionById(id) {
        return await this.transactionRepository.getById(id);
    }

    async getAllTransactions() {
        return await this.transactionRepository.getAll();
    }

    async getTransactionsByBusiness(businessId, userId, startDate, endDate, categoryId) {
        console.debug("[TransactionService] getTransactionsByBusiness", {businessId, userId, startDate, endDate, categoryId});

        const business = await this.businessService.getBusinessById(businessId);
        if (!business || business.userId !== userId) {
            throw new AppError("Access denied: You are not the owner of this business.", 403);
        }
        return await this.transactionRepository.getByBusiness(businessId, startDate, endDate, categoryId);
    }

    async updateTransaction(id, data) {
        return await this.transactionRepository.update(id, data);
    }

    async deleteTransaction(id) {
        return await this.transactionRepository.delete(id);
    }
}
