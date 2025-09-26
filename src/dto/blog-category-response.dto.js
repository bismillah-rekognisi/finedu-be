export const toBlogCategoryResponse = (blogCategory) => {
    return {
        id: blogCategory.id,
        name: blogCategory.name,
        createdAt: blogCategory.createdAt,
        updatedAt: blogCategory.updatedAt,
    };
};

export const toBlogCategoryListResponse = (blogCategories) => {
    return blogCategories.map(blogCategory => toBlogCategoryResponse(blogCategory));
}; 