export const toBusinessResponse = (business) => {
    return {
        id: business.id,
        userId: business.userId,
        name: business.name,
        category: business.category,
        address: business.address,
        description: business.description,
        createdAt: business.createdAt,
        updatedAt: business.updatedAt,
    };
};

export const toBusinessListResponse = (businesses) => {
    return businesses.map(business => toBusinessResponse(business));
};

export const toBusinessSummary = (business) => {
    return {
        id: business.id,
        name: business.name,
        transactions: {
            expense: business.transactions
                ? business.transactions.filter(t => t.type === 'EXPENSE')
                : [],
            income: business.transactions
                ? business.transactions.filter(t => t.type === 'INCOME')
                : []
        },
        daily_summary: business.dailySummary,
        total_income: business.income,
        total_expense: business.expense,
        profit: business.profit,
    };
};