export const toBusinessCategoryResponse = (businessCategory) => {
    return {
        id: businessCategory.id,
        name: businessCategory.name,
        slug: businessCategory.slug,
    };
};

export const toBusinessCategoryListResponse = (businessCategories) => {
    return businessCategories.map(businessCategory => toBusinessCategoryResponse(businessCategory));
};
