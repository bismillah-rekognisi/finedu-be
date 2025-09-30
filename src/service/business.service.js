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
