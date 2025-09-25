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
