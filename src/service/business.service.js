import { AppError } from "../error/appError.js";

export default class BusinessService {
    constructor(businessRepository) {
        this.businessRepository = businessRepository;
    }

    getDateRange(filter) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        switch (filter) {
            case 'today':
                return {
                    startDate: today,
                    endDate: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1)
                };
            case 'last_7_days':
                const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                return {
                    startDate: sevenDaysAgo,
                    endDate: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1)
                };
            case 'this_month':
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
                return {
                    startDate: startOfMonth,
                    endDate: endOfMonth
                };
            case 'this_year':
                const startOfYear = new Date(now.getFullYear(), 0, 1);
                const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
                return {
                    startDate: startOfYear,
                    endDate: endOfYear
                };
            default:
                return {
                    startDate: today,
                    endDate: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1)
                };
        }
    }

    async createBusiness(businessData) {
        return await this.businessRepository.create(businessData);
    }

    async getAllBusinesses({ month, year }) {
        return await this.businessRepository.findAll({ month, year });
    }

    async getBusinessAnalytic({ id, filter }) {
        const exist = await this.businessRepository.findById(id);
        if (!exist) {
            throw new AppError('Business not found', 404);
        }

        const { startDate, endDate } = this.getDateRange(filter);

        const business = await this.businessRepository.analytic({ id, startDate, endDate });
        const transactions = business.transactions || [];

        // hitung income & expense
        let income = 0;
        let expense = 0;
        const expenseDistribution = {};
        if (Array.isArray(transactions)) {
            for (const t of transactions) {
                if (t.type === 'INCOME') {
                    income += t.amount;
                } else if (t.type === 'EXPENSE') {
                    expense += t.amount;
                    
                    // distribusi pengeluaran per kategori
                    const categoryName = t.category?.name || 'Lainnya';
                    if (!expenseDistribution[categoryName]) {
                        expenseDistribution[categoryName] = { total_amount: 0, presentation: 0 };
                    }
                    expenseDistribution[categoryName].total_amount += t.amount;
                }
            }
        }

        // hitung persentase
        if (expense > 0) {
            for (const category in expenseDistribution) {
                expenseDistribution[category].presentation = 
                    Number(((expenseDistribution[category].total_amount / expense) * 100).toFixed(2));
            }
        }
        
        business.income = income;
        business.expense = expense;
        business.profit = income - expense;
        business.expenseDistribution = expenseDistribution;

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
