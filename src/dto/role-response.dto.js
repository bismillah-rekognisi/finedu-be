export const toRoleResponse = (role) => {
    return {
        id: role.id,
        name: role.name,
        slug: role.slug,
    };
};

export const toRoleListResponse = (roles) => {
    return roles.map(role => toRoleResponse(role));
}; 