export const toBlogResponse = (blog) => {
    if (!blog) {
        return null;
    }
    return {
        id: blog.id,
        title: blog.title,
        content: blog.content,
        thumbnail: blog.thumbnail,
        categoryId: blog.categoryId,
        category: blog.category,
        status: blog.status,
        publishedAt: blog.publishedAt,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
    };
};

export const toBlogListResponse = (blogs) => {
    if (!blogs) {
        return [];
    }
    return blogs.map(toBlogResponse);
}; 