export const toTransactionCategoryResponse = (transactionCategory) => {
    return {
        id: transactionCategory.id,
        name: transactionCategory.name,
        slug: transactionCategory.slug,
    };
};

export const toTransactionCategoryListResponse = (transactionCategories) => {
    return transactionCategories.map(transactionCategory => toTransactionCategoryResponse(transactionCategory));
};
