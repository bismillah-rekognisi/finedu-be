import { AppError } from "../error/appError.js";

export default class BusinessService {
    constructor(businessRepository) {
        this.businessRepository = businessRepository;
    }

    async createBusiness(businessData) {
        return await this.businessRepository.create(businessData);
    }

    async getAllBusinesses({ month, year }) {
        return await this.businessRepository.findAll({ month, year });
    }

    async getBusinessSummary({ id, month, year }) {
        console.info('[BusinessService] getBusinessSummary');
        const business = await this.businessRepository.summary({ id, month, year });
        if (!business) {
            throw new AppError('Business not found', 404);
        }

        // calculate income & expense
        let income = 0;
        let expense = 0;
        if (business.transactions && Array.isArray(business.transactions)) {
            for (const t of business.transactions) {
                if (t.type === 'INCOME') {
                    income += t.amount;
                } else if (t.type === 'EXPENSE') {
                    expense += t.amount;
                }
            }
        }
        
        business.income = income;
        business.expense = expense;
        business.profit = income - expense;

        return business;
    }
    
    async getBusinessesByUserId(userId) {
        return await this.businessRepository.findByUserId(userId);
    }

    async getBusinessById(id) {
        const business = await this.businessRepository.findById(id);
        if (!business) {
            throw new AppError('Business not found', 404);
        }
        return business;
    }

    async updateBusiness(id, businessData) {
        const business = await this.businessRepository.findById(id);
        if (!business) {
            throw new AppError('Business not found', 404);
        }
        return await this.businessRepository.update(id, businessData);
    }

    async deleteBusiness(id) {
        const business = await this.businessRepository.findById(id);
        if (!business) {
            throw new AppError('Business not found', 404);
        }
        return await this.businessRepository.delete(id);
    }
}
